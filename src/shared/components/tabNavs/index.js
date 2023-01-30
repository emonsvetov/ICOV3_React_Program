import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabNav from "./components/Tabnav";
import TabNavOrigin from "./components/TabnavOrigin";
import { Container } from "reactstrap";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuthProgram } from "@/containers/App/auth";
import { useTranslation } from "react-i18next";

const program = getAuthProgram();

export const ParticipantTabNavsOrigin = () => {
  const { t } = useTranslation();
  const TAB_ITEMS = [
    { title: "my_rewards", icon: "MyRewards", to: `/participant/my-points` },
    { title: "peer_to_peer", icon: "PeerToPeer", to: "/participant/peer-to-peer"},
    { title: "my_goals", icon: "MyGoals", to: "/participant/my-goals" },
  ];

  if(program.uses_leaderboards > 0){
    TAB_ITEMS.push({
      title: "leaderboards",
      icon: "Leaderboards",
      to: "/participant/leaderboards",
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

export const ParticipantTabNavs = (props) => {
  const { t } = useTranslation();
  const PARTICIPANT_ITEMS = [
    {
      title: "redeem_my_points",
      icon: "redeem",
      to: `/participant/select-merchants`,
    },
    { title: "peer_to_peer", icon: "gift", to: "/participant/peer-to-peer" },
    { title: "survey", icon: "survey", to: "/participant/survey" },
    { title: "newsletter", icon: "newsletter", to: "/participant/newsletter" },
    { title: "submit_a_lead", icon: "submit", to: "/participant/lead" },
  ];
  let navigate = useNavigate();
  return (
    <div className="tab-navs items-5">
      <ul className="horizontal">
        {PARTICIPANT_ITEMS.map((item, key) => {
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

export const ManagerTabNavs = (props) => {
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
