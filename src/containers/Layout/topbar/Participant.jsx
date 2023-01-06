import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import TopbarProfile from "./TopbarProfile";
import { connect } from "react-redux";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap";
import { logout } from "../../App/auth";
import Cart from "../../Participant/components/Cart";
import CartOrigin from "../../Participant/components/CartOrigin";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import { SWITCH_THEME, themeContext } from "@/context/themeContext";

// const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;
const LINKS = [
  { to: "/participant/home", text: "home" },
  { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  { to: "/participant/my-points", text: "my_points" },
  { to: "/participant/my-goals", text: "my_goals" },
  { to: "/participant/faqs", text: "faqs" },
];

const ORIGIN_LINKS = [
  { to: "/participant/home", text: "home" },
  { to: "/participant/my-points", text: "my_rewards" },
  { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  { to: "/participant/my-account", text: "my_account" },
  { to: "/participant/faqs", text: "faqs" },
];

const languageOptions = [
  { value: "en-US", label: "English" },
  { value: "es", label: "Español" },
];

const themeOptions = [
  { value: "new", label: "New" },
  { value: "original", label: "Original" },
];

const ParticipantTopbar = ({ template, themeName }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState();
  // const {
  //   // state: { themeName },
  //   actions: { switchTheme },
  // } = useContext(themeContext);
  const [currentTheme, setCurrentTheme] = useState();

  useEffect(() => {
    let lang = localStorage.getItem("i18nextLng") || "en-US";
    let option = languageOptions.filter((item) => item.value == lang)[0];
    console.log("option: participant topbar", lang);
    setLanguage(option);
  }, []);

  useEffect(() => {
    let [option] = themeOptions.filter((item) => item.value === themeName);
    setCurrentTheme(option);
  }, [themeName]);

  const onSelectLanguage = (selectedOption) => {
    // alert(JSON.stringify(selectedOption))
    i18n.changeLanguage(selectedOption.value);
    setLanguage(selectedOption);
  };

  const onSelectTheme = (selectedOption) => {
    // switchTheme({
    //   type: SWITCH_THEME,
    //   payload: selectedOption.value,
    // });
    setCurrentTheme(selectedOption);
  };

  const LanguageBar = () => {
    return (
      <Select
        options={languageOptions}
        value={language}
        onChange={onSelectLanguage}
      />
    );
  };

  const ThemeBar = () => {
    return (
      <Select
        options={themeOptions}
        value={currentTheme}
        onChange={onSelectTheme}
      />
    );
  };

  if (!template) return t("loading");
  // console.log(template)
  const NewNavbar = () => {
    const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;
    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
      setOpen((prev) => !prev);
    };
    return (
      <>
        <div className="topbar">
          <Container className="topbar__wrapper">
            <Navbar color="" expand="md" fixed="" light>
              <NavbarBrand href="/">
                <img src={Brand} />
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <div className="d-flex align-items-center " style={{ gap: 10 }}>
                <Collapse navbar>
                  <Nav className="horizontal" navbar>
                    {LINKS.map((item, index) => {
                      return (
                        <NavLink key={index} to={item.to} className="link">
                          {t(item.text)}
                        </NavLink>
                      );
                    })}
                  </Nav>
                </Collapse>
                <div className="topbar__right">
                  <TopbarProfile />
                </div>
                <LanguageBar />
                {/* <ThemeBar /> */}
              </div>
            </Navbar>
          </Container>
        </div>

        <Cart />
        {/* <div
        className="container d-flex justify-content-end"
        style={{ marginBottom: "-36px" }}
        >
        </div> */}
      </>
    );
  };

  const OriginalNavbar = () => {
    const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/logo/big_logo.png`;
    return (
      <>
        <Navbar
          color=""
          expand="md"
          fixed=""
          container="fluid"
          light
          className="origin"
        >
          <NavbarBrand href="/">
            <img alt={"brand"} src={Brand} />
          </NavbarBrand>
          <div className="d-flex align-items-center " style={{ gap: 10 }}>
            <nav className="teritery-menu">
              <ul className="horizontal">
                {ORIGIN_LINKS.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.to} className="link">
                        {t(item.text)}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <a className="cursor-pointer" onClick={() => logout()}>
                    {t("sign_out")}
                  </a>
                </li>
              </ul>
            </nav>
            <LanguageBar />
            {/* <ThemeBar /> */}
          </div>
        </Navbar>

        <CartOrigin />
      </>
    );
  };
  return (
    (currentTheme?.value === "new" && <NewNavbar />) ||
    (currentTheme?.value === "original" && <OriginalNavbar />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
    themeName: "new"
  };
};

export default connect(mapStateToProps)(ParticipantTopbar);
