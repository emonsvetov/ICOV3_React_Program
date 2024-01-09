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
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  if (!template) return "loading";
  // if (!template) return t("loading");
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;

  return (
    <div className="topbar">
      <Container fluid className="topbar__wrapper">
        <Navbar color="" expand="md" fixed="" light>
          <NavbarBrand href="/">
            <img src={Brand} alt="brand-logo" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse navbar>
            <Nav className="horizontal" navbar>
              {LINKS.map((item, index) => {
                return (
                  <NavLink key={index} to={item.to} className="link">
                    {item.text}
                  </NavLink>
                );
              })}
            </Nav>
          </Collapse>

          <div className="topbar__right">
            <TopbarProfile isManager={true} />
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
