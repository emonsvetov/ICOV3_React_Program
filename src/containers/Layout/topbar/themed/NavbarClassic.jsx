import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap"
import {Themed} from '@/theme'
import LanguageBar from '../LanguageBar'
import TopbarProfile from "../TopbarProfile"

const LINKS = [
  { to: "/participant/home", text: "home" },
  { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  { to: "/participant/my-points", text: "my_points" },
  { to: "/participant/my-goals", text: "my_goals" },
  { to: "/participant/faqs", text: "faqs" },
];

const NavbarClassic = ({template}) => {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);

  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  if( !template?.name ) return ''
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
      <div className="position-relative">
        <Themed component="Cart"  />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template
  };
};

export default connect(mapStateToProps)(NavbarClassic);