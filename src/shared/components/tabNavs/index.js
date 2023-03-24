import React, { useState, useEffect } from "react";
import TabNav from "./components/Tabnav";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import {Themed} from '@/theme'

export const ParticipantTabNavs = () => {
  return <Themed component={'ParticipantTabnav'} />
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
