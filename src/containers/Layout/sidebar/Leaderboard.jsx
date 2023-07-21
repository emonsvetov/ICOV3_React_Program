import React from "react";

import { numFormatter } from "../../../utils/helper";
import { useTranslation } from "react-i18next";
import { isEmpty } from "@/shared/helpers";

const Chart = (props) => {
  let { display_name, total, avatar } = props.data;
  const Ava = avatar
    ? `${process.env.REACT_APP_API_STORAGE_URL}/` + avatar
    : `${process.env.PUBLIC_URL}/theme/classic/img/avatar/avatar.jpg`;
  const { index } = props;
  display_name = display_name.length > 10  ? display_name.substring(0, 8)+'..' : display_name;


  return (
    <div className={`chart-item index-${index}`}>
      <img className="chart-avatar" src={Ava}></img>
      <strong className="text-center">{display_name}</strong>
      <strong className="text-center">{numFormatter(total)}</strong>
    </div>
  );
};

const Leaderboard = ({ leaderboard }) => {
  const { t } = useTranslation();

  if (!leaderboard || isEmpty(leaderboard.leaders)) {
    return '';
  }

  return (
    <>
    <div className="leaderboard pt-4">
      <h5 className="text-center">{leaderboard.name}</h5>
      <div className="charts pt-5">
        {leaderboard.leaders.map((item, index) => {
          if (index >= 3) return;
          return <Chart key={index} data={item} index={index} />;
        })}
      </div>
    </div>
    <div className="matching black fw-bold">
      <span>{t("participant")}</span>
      <span>{leaderboard.leaderboard_type.name === 'Goal Progress' ? 'Progress' : t("awards")}</span>
    </div>
    <div className="red mb-3">
      {leaderboard.leaders.map((item, index) => {
        return (
          <div className="matching" key={index}>
            <span>{item.display_name}</span>
            <span>{item.total}</span>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Leaderboard;
