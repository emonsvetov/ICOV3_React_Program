import React, { useState } from "react";
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

// const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;
const LINKS = [
  { to: "/participant/home", text: "Home" },
  { to: "/participant/my-gift-codes", text: "My Gift Codes" },
  { to: "/participant/my-points", text: "My Points" },
  { to: "/participant/my-goals", text: "My Goals" },
  { to: "/participant/faqs", text: "FAQs" },
];

const ORIGIN_LINKS = [
  { to: "/participant/home", text: "Home" },
  { to: "/participant/my-points", text: "My Rewards" },
  { to: "/participant/my-gift-codes", text: "My Gift Codes" },
  { to: "/participant/my-account", text: "My Account" },
  { to: "/participant/faqs", text: "FAQs" },
];

const ParticipantTopbar = ({ template }) => {
  const isOriginTheme = template?.type == "origin";

  if (!template) return "Loading...";
  const NewNavbar = () => {
    const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;
    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
      setOpen((prev) => !prev);
    };
    return (
      <div className="topbar">
        <Container className="topbar__wrapper">
          <Navbar color="" expand="md" fixed="" light>
            <NavbarBrand href="/">
              <img src={Brand} />
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
              <TopbarProfile />
            </div>
          </Navbar>
        </Container>
        <div
          className="container d-flex justify-content-end"
          style={{ marginBottom: "-36px" }}
        >
          <Cart />
        </div>
      </div>
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
          <nav className="teritery-menu">
            <ul className="horizontal">
              {ORIGIN_LINKS.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.to} className="link">
                      {item.text}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a className="cursor-pointer" onClick={() => logout()}>
                  Sign Out
                </a>
              </li>
            </ul>
          </nav>
        </Navbar>
        <CartOrigin />
      </>
    );
  };
  return (
    (!isOriginTheme && <NewNavbar />) || (isOriginTheme && <OriginalNavbar />)
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(ParticipantTopbar);
