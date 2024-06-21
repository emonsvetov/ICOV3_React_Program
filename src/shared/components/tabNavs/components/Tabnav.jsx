import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import RedeemIcon from "mdi-react/HandHeartIcon";
import GiftIcon from "mdi-react/UserBadgeIcon";
import SurveyIcon from "mdi-react/NoteTextIcon";
import NewsletterIcon from "mdi-react/TextBoxMultipleIcon";
import SubmitIcon from "mdi-react/CursorPointerIcon";

import DashboardIcon from "mdi-react/ViewDashboardIcon";
import SpireIcon from "mdi-react/StarBoxIcon";
import LeaderboardIcon from "mdi-react/ChartBarIcon";
import BudgetCascadingApprovalIcon from "mdi-react/ReceiptIcon";
function Tabnav(props) {
  const { title, icon, isActive } = props;
  return (
    <div className={"tab-nav"}>
      <div
        className={isActive ? `icon ${icon}-icon active` : `icon ${icon}-icon`}
      >
        {icon == "redeem" && (
          <RedeemIcon size={40} className={`${icon}-icon`} />
        )}
        {icon == "gift" && <GiftIcon size={40} className={`${icon}-icon`} />}
        {icon == "survey" && (
          <SurveyIcon size={40} className={`${icon}-icon`} />
        )}
        {icon == "newsletter" && (
          <NewsletterIcon size={40} className={`${icon}-icon`} />
        )}
        {icon == "submit" && (
          <SubmitIcon size={40} className={`${icon}-icon`} />
        )}

        {icon == "dashboard" && (
          <DashboardIcon size={40} className={`${icon}-icon`} />
        )}
        {icon == "spire" && <SpireIcon size={40} className={`${icon}-icon`} />}
        {icon == "leaderboard" && (
          <LeaderboardIcon size={40} className={`${icon}-icon`} />
        )}
        {icon == "budgetcascading" && (
          <BudgetCascadingApprovalIcon size={40} className={`${icon}-icon`} />
        )}
      </div>
      <div className="text-center text-uppercase">
        <strong>{title}</strong>
      </div>
    </div>
  );
}

Tabnav.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Tabnav.defaultProps = {};

export default Tabnav;
