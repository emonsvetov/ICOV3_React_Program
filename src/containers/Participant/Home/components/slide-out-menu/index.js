import { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
const LINKS = [
  { to: "/participant/my-points", text: "My Rewards" },
  { to: "/participant/peer-to-peer", text: "Give an Award" },
  { to: "/participant/referral", text: "Submit A Referral" },
  { to: "/participant/suggestion_box", text: "Suggestion Box" },
  { to: "/participant/survey", text: "Survey" },
  { to: "/participant/calendar", text: "Calendar" },
  { to: "/participant/program_rules", text: "Program Rules" },
  { to: "/participant/newsletter", text: "Newsletter" },
  { to: "/participant/training", text: "Training" },
  { to: "/participant/feeling", text: "How Are you Feeling?" },
];

const SlideOutMenu = ({ isFixed }) => {
  const [isMenuOpen, setMenuOpen] = useState(isFixed);
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
              <NavLink to={item.to}>{item.text}</NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
};

export default SlideOutMenu;
