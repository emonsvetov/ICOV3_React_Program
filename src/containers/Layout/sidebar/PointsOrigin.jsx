import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const MYPOINTS = [
  {
    name: "points_to_redeem",
    value: 800,
  },
  {
    name: "peer_points_to_award",
    value: 4000,
  },
];
const PointsOrigin = ({ myPoints }) => {
  const { t, i18n } = useTranslation();
  if (!myPoints) return t("loading");
  return (
    <div className="points-origin flex-column p-2">
      <div className="points-origin-header bg-blue">{t("my_balance")}</div>
      <table className="points-origin-table" width="100%">
        <tbody>
          {MYPOINTS.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="points-title text-uppercase">
                  {" "}
                  {t(item.name)}:
                </td>
              </tr>
              <tr>
                <td className="value"> {item.value.toLocaleString()}</td>
              </tr>
            </React.Fragment>
          ))}
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
