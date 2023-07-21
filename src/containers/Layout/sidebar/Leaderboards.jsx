import React, { useState, useEffect } from "react";

import Leaderboard from "./Leaderboard";
import { useTranslation } from "react-i18next";
import { getLeaderboardLeaders } from "@/services/program/getLeaderboardLeaders";
import {connect} from "react-redux";


const leaders = [
  { name: "Jay Moore", award: 800 },
  { name: "Mary-Kate Olsen", award: 600 },
];

const Leaderboards = ({ program, organization }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [leaderboardLeaders, setLeaderboardLeaders] = useState([]);

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getLeaderboardLeaders(organization.id, program.id).then((items) => {
        setLeaderboardLeaders(items);
        setLoading(false);
      });
    }
  }, [organization, program]);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="leaderboards mt-3">
      <h3>{t("leaderboards")}</h3>
      <div className="panel leader-panel">
        {leaderboardLeaders.map((item, index) => {
          return (
            <Leaderboard key={index} leaderboard={item} />
          );
        })}
        {/*<h4>{t("great_reviews")}</h4>*/}
        {/*<div className="matching black mt-3 fw-bold">*/}
        {/*  <span>{t("participant")}</span>*/}
        {/*  <span>{t("awards")}</span>*/}
        {/*</div>*/}
        {/*<div className="bg-warning">*/}
        {/*  {participants.map((item, index) => {*/}
        {/*    return (*/}
        {/*      <div className="matching" key={index}>*/}
        {/*        <span>{item.name}</span>*/}
        {/*        <span>{item.award}</span>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Leaderboards);
