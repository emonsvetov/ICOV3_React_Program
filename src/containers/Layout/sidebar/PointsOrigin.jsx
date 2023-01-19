import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const MYPOINTS = [
  {
    name: "Points to Redeem",
    value: 800,
  },
  {
    name: "peer_points_to_award",
    value: 4000,
  },
];
const PointsOrigin = ({ myPoints }) => {
  console.log(myPoints)
  const { t } = useTranslation();
  if (!myPoints) return t("loading");
  return (
    <div className="points-origin flex-column p-2">
      <div className="points-origin-header bg-blue">{t("my_balance")}</div>
      <table className="points-origin-table" width="100%">
        <tbody>
          <tr>
            <td className="points-title text-uppercase">
              {t("Points to Redeem")}:
            </td>
          </tr>
          <tr>
            <td className="value"> {myPoints.amount * myPoints.factor}</td>
          </tr>
          <tr>
            <td className="points-title text-uppercase">
              {t("Peer Points to Award")}:
            </td>
          </tr>
          <tr>
            <td className="value"> {myPoints.peerBalance * myPoints.factor}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    myPoints: state.pointBalance,
  };
};

export default connect(mapStateToProps)(PointsOrigin);
