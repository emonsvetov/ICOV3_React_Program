import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Nav, Navbar, NavbarBrand, Collapse, NavbarToggler} from "reactstrap";
import LanguageBar from "../LanguageBar";
import TopbarProfile from "../TopbarProfile";

const LINKS = [
  { to: "/participant/home", text: "home" },
  { to: "/participant/browse-merchants", text: "redeem_my_points" },
  { to: "/participant/my-points", text: "my_rewards" },
  { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  { to: "/participant/my-account", text: "my_account" },
  { to: "/participant/faqs", text: "faqs" },
];

const NavbarDefault = ({ template }) => {
  const { t } = useTranslation();

  const [isOpen, setOpen] = React.useState(false);
  const toggleNavbar = () => {
    setOpen((prev) => !prev);
  }
  const onClickNavLink = () => {
    if( isOpen ) {
      setOpen(false)
    }
  }

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
        <div className="navbar-top_row">
          <div className="navbar-brand-logowrap">
            <NavbarBrand href="/">
              <img alt={"brand"} src={Brand} />
            </NavbarBrand>
          </div>
          <div className="topbar__right navbar-profilewrap">
            <Collapse isOpen={isOpen} navbar>
              <Nav className="horizontal" navbar style={{ flexWrap: "nowrap" }}>
                {LINKS.map((item, index) => {
                  return (
                    <NavLink key={index} to={item.to} onClick={onClickNavLink} className="link">
                      {t(item.text)}
                    </NavLink>
                  );
                })}
              </Nav>
            </Collapse>
            <TopbarProfile />
            <div className="language-bar">
              <LanguageBar />
            </div>
            <div style={{marginRight:10}}></div>
            <NavbarToggler onClick={toggleNavbar} />
          </div>
          {/* <ThemeBar /> */}
        </div>
      </Navbar>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(NavbarDefault);
