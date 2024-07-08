import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import TabNav from "./components/Tabnav";
import { useNavigate, useLocation } from "react-router-dom";
import {Themed} from '@/theme'
import {getLeaderboards} from '@/services/program/getLeaderboards'

let ParticipantTabNavsBase = ({program}) => {
  const [leaderboardCount, setLeaderboardCount] = useState(0);
  useEffect(() => {
    if( program?.id ) {
      getLeaderboards(program.organization_id, program.id, true)
      .then( count => {
        setLeaderboardCount(count)
      })
    }
    return () => {
    }
  }, []);
  return <Themed leaderboardCount={leaderboardCount} component={'ParticipantTabnav'} />
};

ParticipantTabNavsBase =  connect((state) => ({
  program: state.program
}))(ParticipantTabNavsBase);

export const ParticipantTabNavs = () => {
  return <ParticipantTabNavsBase />
};

let ManagerTabNavsTmp = ({program, rootProgram}) => {
  

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

  if (rootProgram?.use_cascading_approvals > 0) {
    MANAGER_ITEMS .push(
      { title: "Approvals", icon: "budgetcascading", to: `/manager/cascading-approvals` }
    );
  }

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
  program: state.program,
  rootProgram: state.rootProgram
}))(ManagerTabNavsTmp);

export const ManagerTabNavs = () => {
    return <ManagerTabNavsTmp />
}
