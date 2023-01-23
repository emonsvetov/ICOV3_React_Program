import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row } from "reactstrap";
import Leaderboard from "./Leaderboard";
import { useTranslation } from "react-i18next";

const leaders = [
  { name: "Jay Moore", award: 800 },
  { name: "Mary-Kate Olsen", award: 600 },
];
// const participants = [
//   { name: "Jay Moore", award: 800 },
//   { name: "Mary-Kate Olsen", award: 600 },
//   { name: "Jason Hembre", award: 400 },
//   { name: "Susan Jackson", award: 500 },
//   { name: "G W", award: 300 },
// ];
const Leaderboards = () => {
  const { t } = useTranslation();
  return (
    <div className="leaderboards mt-3">
      <h3>{t("leaderboards")}</h3>
      <div className="panel leader-panel">
        <Leaderboard />
        <div className="matching black fw-bold">
          <span>{t("participant")}</span>
          <span>{t("awards")}</span>
        </div>
        <div className="red mb-3">
          {leaders.map((item, index) => {
            return (
              <div className="matching" key={index}>
                <span>{item.name}</span>
                <span>{item.award}</span>
              </div>
            );
          })}
        </div>
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

export default Leaderboards;
