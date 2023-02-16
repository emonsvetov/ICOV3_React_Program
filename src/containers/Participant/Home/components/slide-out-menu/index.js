import { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { useTranslation } from "react-i18next";
import {connect} from "react-redux";
import {MEDIA_TYPES} from "../../../../LogIn/components/LogInForm";

const LINKS = [
  { to: "/participant/my-points", text: "my_rewards" },
  { to: "/participant/survey", text: "survey" },
  { to: "/participant/calendar", text: "calendar" },
  { to: "/participant/feeling", text: "how_are_you_feeling" },
];

const SlideOutMenu = ({ isFixed,  program, organization }) => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const { t } = useTranslation();
  const toggleMenu = () => {
    if (!isFixed) setMenuOpen((prev) => !prev);
  };
  const mediaTypes = JSON.parse(localStorage.getItem(MEDIA_TYPES)) || [];
  return (
    <div>
      <div
        className={`menuBtn ${
          isMenuOpen ? (isFixed ? "closer fixed" : "closer") : null
        }`}
        onClick={toggleMenu}
      >
        <span
          className={`line ${
            isMenuOpen ? (isFixed ? "closer fixed" : "closer") : null
          }`}
        ></span>
        <span
          className={`line ${
            isMenuOpen ? (isFixed ? "closer fixed" : "closer") : null
          }`}
        ></span>
        <span
          className={`line ${
            isMenuOpen ? (isFixed ? "closer fixed" : "closer") : null
          }`}
        ></span>
      </div>
      <Nav
        vertical
        className={`menuOverlay ${
          isMenuOpen ? (isFixed ? "show fixed" : "show") : null
        }`}
      >
        {LINKS.map((item, index) => {
          return (
            <NavItem key={index}>
              <NavLink to={item.to}>{t(item.text)}</NavLink>
            </NavItem>
          );
        })}
        {mediaTypes.map((item, index) => {
          const url = "/participant/media/" + item.program_media_type_id;
          return (
            <NavItem key={index}>
              <NavLink to={url} >{t(item.name)}</NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization
  };
};
export default connect(mapStateToProps)(SlideOutMenu)
