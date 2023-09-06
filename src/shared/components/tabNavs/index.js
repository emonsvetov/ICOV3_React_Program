import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import TabNav from "./components/Tabnav";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import {Themed} from '@/theme'

export const ParticipantTabNavs = () => {
  return <Themed component={'ParticipantTabnav'} />
};

let ManagerTabNavsTmp = ({program}) => {
  let MANAGER_ITEMS;

  MANAGER_ITEMS = [
      { title: "Dashboard", icon: "dashboard", to: "/manager/home" }
  ];
  if (program.uses_social_wall > 0) {
    MANAGER_ITEMS .push(
        { title: "Social Wall", icon: "spire", to: `/manager/nspire-wall` }
    );
  }

  if (program.uses_leaderboards > 0) {
    MANAGER_ITEMS .push(
      { title: "Leaderboard", icon: "leaderboard", to: `/manager/leaderboards` }
    );
  }

  const [path, setPath] = useState(null);
  const location = useLocation();
  useEffect(() => {
    let path = location?.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    setPath(path);
  }, [location]);
  let navigate = useNavigate();

  if( !program ) return 'loading...'

  return (
    <div className="tab-navs items-3">
      <ul className="horizontal">
        {MANAGER_ITEMS.map((item, key) => {
          return (
            <li key={key} onClick={() => navigate(item.to)}>
              <TabNav
                title={item.title}
                icon={item.icon}
                isActive={item.to == location.pathname}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
ManagerTabNavsTmp =  connect((state) => ({
    program: state.program
  }))(ManagerTabNavsTmp);

export const ManagerTabNavs = () => {
    return <ManagerTabNavsTmp />
}
