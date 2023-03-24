import React, { useState, useEffect } from "react";
import TabNav from "./components/Tabnav";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// const program = getAuthProgram();

export const ParticipantTabNavsOrigin = () => {
    const { t } = useTranslation();
    const TAB_ITEMS = [
      { title: "my_rewards", icon: "MyRewards", to: `/participant/my-points` },
    ];
  
    if(program.uses_peer2peer
        > 0){
      TAB_ITEMS.push({
        title: "peer_to_peer",
        icon: "PeerToPeer",
        to: "/participant/peer-to-peer",
      },)
    }
  
    if(program.uses_leaderboards > 0){
      TAB_ITEMS.push({
        title: "leaderboards",
        icon: "Leaderboards",
        to: "/participant/leaderboards",
      },)
    }
  
    if(program.uses_goal_tracker > 0){
      TAB_ITEMS.push({
        title: "my_goals",
        icon: "MyGoals",
        to: "/participant/my-goals",
      },)
    }
  
    let navigate = useNavigate();
    return (
      <div className="">
        <ul className="horizontal d-flex justify-content-evenly">
          {TAB_ITEMS.map((item, key) => {
            return (
              <li key={key} onClick={() => navigate(item.to)}>
                <TabNavOrigin title={t(item.title)} icon={item.icon} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

export const ParticipantTabNavs = ({program}) => {
  const { t } = useTranslation();

  const TAB_ITEMS = [
    { title: "my_rewards", icon: "redeem", to: `/participant/my-points` },
  ];

  if(program?.uses_peer2peer
      > 0) {
    TAB_ITEMS.push({
      title: "peer_to_peer",
      icon: "gift",
      to: "/participant/peer-to-peer",
    })
  }

  if(program?.uses_leaderboards > 0){
    TAB_ITEMS.push({
      title: "leaderboards",
      icon: "leaderboard",
      to: "/participant/leaderboards",
    })
  }

  if(program?.uses_goal_tracker > 0){
    TAB_ITEMS.push({
      title: "my_goals",
      icon: "survey",
      to: "/participant/my-goals",
    })
  }

  let navigate = useNavigate();
  if( ! program ) return 'loading...'
  return (
    <div className="tab-navs items-5">
      <ul className="horizontal">
        {TAB_ITEMS.map((item, key) => {
          return (
            <li key={key} onClick={() => navigate(item.to)}>
              <TabNav title={t(item.title)} icon={item.icon} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ManagerTabNavs = ({program}) => {
  let MANAGER_ITEMS;
  if (program.uses_social_wall > 0) {
    MANAGER_ITEMS = [
      { title: "Dashboard", icon: "dashboard", to: "/manager/home" },
      { title: "Social Wall", icon: "spire", to: `/manager/nspire-wall` },
      {
        title: "Leaderboard",
        icon: "leaderboard",
        to: `/manager/leaderboards`,
      },
    ];
  } else {
    MANAGER_ITEMS = [
      { title: "Dashboard", icon: "dashboard", to: "/manager/home" },
      {
        title: "Leaderboard",
        icon: "leaderboard",
        to: `/manager/leaderboards`,
      },
    ];
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
