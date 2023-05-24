import { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { useTranslation } from "react-i18next";
import {connect} from "react-redux";
import {MEDIA_TYPES} from "@/containers/LogIn/components/LogInForm";

const LINKS = [
  { to: "/participant/my-points", text: "my_rewards" },
  // { to: "/participant/peer-to-peer", text: "give_an_award" },
  { to: "/participant/referral", text: "submit_a_referral" },
  //{ to: "/participant/suggestion_box", text: "suggestion_box" },
  //{ to: "/participant/survey", text: "survey" },
  //{ to: "/participant/calendar", text: "calendar" },
  // { to: "/participant/program_rules", text: "program_rules" },
  // { to: "/participant/newsletter", text: "newsletter" },
  { to: "/participant/feeling", text: "how_are_you_feeling" },
];

let pushedPeerToPeer = 0;

const SlideOutMenu = ({ isFixed,  program, organization }) => {

  if(program.uses_peer2peer
      > 0 && pushedPeerToPeer === 0){
    LINKS.splice(1, 0, { to: "/participant/peer-to-peer", text: "give_an_award" })
    pushedPeerToPeer = 1
  }

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
