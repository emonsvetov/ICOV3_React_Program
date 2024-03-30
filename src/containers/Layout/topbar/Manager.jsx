import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import TopbarProfile from "./TopbarProfile";
import {
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Navbar,
} from "reactstrap";

// const DefaultBrand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

const LINKS = [
  { to: "/manager/home", text: "Home" },
  { to: "/manager/program-settings", text: "Reward Events" },
  { to: "/manager/manage-and-reward", text: "Manage and Reward" },
  { to: "/manager/report", text: "View Reports" },
  { to: "/manager/invite-participant", text: "Invite New Participant" },
  { to: "/manager/referral", text: "Referral Administrator" },
  { to: "/manager/manage-account", text: "Manage Account" },
  { to: "/manager/team", text: "Team" },
];

const ManagerTopbar = ({ template }) => {
  // console.log(template)
  const [isOpen, setOpen] = useState(false);
  const toggleNavbar = () => {
    setOpen((prev) => !prev);
  }
  const onClickNavLink = () => {
    if( isOpen ) {
      setOpen(false)
    }
  }

  if (!template) return "loading";
  // if (!template) return t("loading");
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;

  const localStyles = {
    // navbarTopRow: {
    //   display:'flex'
    // }
  }

  return (
    <div className="topbar">
      <Container fluid className="topbar__wrapper">
        <Navbar color="" expand="md" fixed="" light>
          <div style={localStyles.navbarTopRow} className="navbar-top_row">
            <div className="navbar-brand-logowrap">
              <NavbarBrand href="/">
                <img src={Brand} alt="brand-logo" />
              </NavbarBrand>
            </div>
            <div className="topbar__right navbar-profilewrap">
              <Collapse isOpen={isOpen} navbar>
                <Nav className="horizontal" navbar style={{ flexWrap: "nowrap" }}>
                  {LINKS.map((item, index) => {
                    return (
                      <NavLink key={index} onClick={onClickNavLink} to={item.to} className="link">
                        {item.text}
                      </NavLink>
                    );
                  })}
                </Nav>
              </Collapse>
              <TopbarProfile isManager={true} />
              <NavbarToggler onClick={toggleNavbar} />
            </div>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(ManagerTopbar);
