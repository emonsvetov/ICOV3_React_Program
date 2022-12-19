import { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { useTranslation } from "react-i18next";

const LINKS = [
  { to: "/participant/my-points", text: "my_rewards" },
  { to: "/participant/peer-to-peer", text: "give_an_award" },
  { to: "/participant/referral", text: "submit_a_referral" },
  { to: "/participant/suggestion_box", text: "suggestion_box" },
  { to: "/participant/survey", text: "survey" },
  { to: "/participant/calendar", text: "calendar" },
  { to: "/participant/program_rules", text: "program_rules" },
  { to: "/participant/newsletter", text: "newsletter" },
  { to: "/participant/training", text: "training" },
  { to: "/participant/feeling", text: "how_are_you_feeling" },
];

const SlideOutMenu = ({ isFixed }) => {
  const [isMenuOpen, setMenuOpen] = useState(isFixed);
  const { t } = useTranslation();
  const toggleMenu = () => {
    if (!isFixed) setMenuOpen((prev) => !prev);
  };
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
      </Nav>
    </div>
  );
};

export default SlideOutMenu;
