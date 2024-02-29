import { useState, useEffect } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { initReactI18next, useTranslation } from "react-i18next";
import {connect} from "react-redux";
import {MEDIA_TYPES} from "@/containers/LogIn/components/LogInForm";
import axios from "axios";
import Points from "@/containers/Layout/sidebar/Points";

const LINKS = [
  // { to: "/participant/my-points", text: "my_rewards" },
  // { to: "/participant/my-gift-codes", text: "my_gift_codes" },
  // { to: "/participant/peer-to-peer", text: "give_an_award" },
  //   { to: "/participant/referral", text: "submit_a_referral" },
  //{ to: "/participant/suggestion_box", text: "suggestion_box" },
  //{ to: "/participant/survey", text: "survey" },
  //{ to: "/participant/calendar", text: "calendar" },
  // { to: "/participant/program_rules", text: "program_rules" },
  // { to: "/participant/newsletter", text: "newsletter" },
  //   { to: "/participant/feeling", text: "how_are_you_feeling" },
];

const SlideOutMenu = ({ isFixed,  program, organization }) => {

  const [menuItems, setMenuItems] = useState(LINKS);
  const [menuBuilt, setMenuBuilt] = useState(false);
  const [iframeItems, setIframeItems] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(true);
  const { t } = useTranslation();
  const toggleMenu = () => {
      if (!isFixed) setMenuOpen((prev) => !prev);
  };

useEffect( () => {
    if( program?.id ) {
      if(!menuBuilt ) {
        let newItems = [];
        if( program.uses_peer2peer )    {
            newItems.push({ to: "/participant/peer-to-peer", text: "give_an_award" })
        }
        if( program.uses_leaderboards ){
          newItems.push({ to: "/participant/leaderboards", text: "leaderboards" })
        }
        if( program.uses_goal_tracker ){
          newItems.push({ to: "/participant/my-goals", text: "my_goals" })
        }
        if( program.enable_referrals ){
          newItems.push({ to: "/participant/referral", text: "submit_a_referral" })
        }
        if( program.enable_how_are_you_feeling ){
            newItems.push({ to: "/participant/feeling", text: "how_are_you_feeling" })
        }
        if( newItems.length > 0)    {
            setMenuItems([...menuItems, ...newItems])
        }
        setMenuBuilt(true)
    }
    loadMediTypes();
  }
}, [program])

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  })
}

const loadMediTypes = async () => {
  try {
    const response = await axios.get(`/organization/${organization.id}/program/${program.id}/digital-media-type`);
    if (response.data.length === 0) return {results: [], count: 0}

    let options = [];
    let menuItems = [];
    response.data.map(row => {
      if (row.is_menu_item === 1) {
        menuItems.push({
          value: row.program_media_type_id,
          url: row.menu_link,
          id: row.program_media_type_id,
          menu_link:row.menu_link,
          label: toTitleCase(row.name),
          is_menu_item:1
        })
      }
      else {
        options.push({
          value: row.program_media_type_id,
          label: toTitleCase(row.name),
          id:row.program_media_type_id,
          is_menu_item:0,
        });
       
      }
    })
    setIframeItems(menuItems);
    setMediaItems(options);
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
}



  //const mediaTypes = JSON.parse(localStorage.getItem(MEDIA_TYPES)) || [];

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
        {menuItems.map((item, index) => {
            
          let url = item.is_menu_item ?  "/participant/iframe/" + item.id : "/participant/media/" + item.id;
          if (item.to.length > 0){
            url = item.to;
          }
          return (
            <NavItem key={index}>
              <NavLink to={url}>{t(item.text)}</NavLink>
            </NavItem>
          );
        })}
        {mediaItems.map((item, index) => {
          
          const url = item.is_menu_item ?  "/participant/iframe/" + item.id : "/participant/media/" + item.id;
          return (

            <NavItem key={index}>
                <NavLink to={url} >{t(item.label)}</NavLink>
            </NavItem>
          );
        })}
        {iframeItems.map((item, index) => {
          const url = item.is_menu_item ?  "/participant/iframe/" + item.id : "/participant/media/" + item.id;
          return (

            <NavItem key={index}>
                <NavLink to={url} >{t(item.label)}</NavLink>
            </NavItem>
          );
        })}
        <Points />
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
