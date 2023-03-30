import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const PointsClear = ({ pointBalance, template }) => {
  const { t } = useTranslation();
  if (!pointBalance) return t("loading");
  return (
    <div className={`points-${template.name} flex-column p-2`}>
      <div className={`points-${template.name}-header bg-blue`}>{t("my_balance")}</div>
      <table className={`points-${template.name}-table`} width="100%">
        <tbody>
          <tr>
            <td className="points-title text-uppercase">
              {t("Points to Redeem")}:
            </td>
          </tr>
          <tr>
            <td className="value"> {pointBalance.amount * pointBalance.factor}</td>
          </tr>
          <tr>
            <td className="points-title text-uppercase">
              {t("Peer Points to Award")}:
            </td>
          </tr>
          <tr>
            <td className="value"> {pointBalance.peerBalance * pointBalance.factor}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    pointBalance: state.pointBalance,
    template: state.template,
  };
};

export default connect(mapStateToProps)(PointsClear);
