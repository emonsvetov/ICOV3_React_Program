import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Navbar,
  NavbarBrand,
} from "reactstrap";
import {Themed} from '@/theme'
import LanguageBar from '../LanguageBar'
import TopbarProfile from "../TopbarProfile";

const LINKS = [
  { to: "/participant/home", text: "home" },
  { to: "/participant/my-points", text: "my_rewards" },
  { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  { to: "/participant/my-account", text: "my_account" },
  { to: "/participant/faqs", text: "faqs" },
];

const NavbarClear = ({template}) => {

  const { t } = useTranslation();

  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;
  return (
    <>
      <Navbar
        color=""
        expand="md"
        fixed=""
        container="fluid"
        light
        className={template.name}
      >
        <NavbarBrand href="/">
          <img alt={"brand"} src={Brand} />
        </NavbarBrand>
        <div className="d-flex align-items-center " style={{ gap: 10 }}>
          <nav className="teritery-menu">
            <ul className="horizontal">
              {LINKS.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.to} className="link">
                      {t(item.text)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
          <LanguageBar />
          {/* <ThemeBar /> */}
        </div>
      </Navbar>

      <Themed component="Cart"  />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template
  };
};

export default connect(mapStateToProps)(NavbarClear);