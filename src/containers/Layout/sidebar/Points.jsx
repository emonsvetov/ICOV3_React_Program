import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const PointsClear = ({ pointBalance, template, program }) => {
  const { t } = useTranslation();
  const locale = new Intl.Locale('en-US');
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
            <td className="value"> {(pointBalance.points).toLocaleString(locale)}</td>
          </tr>
          {
            program.uses_peer2peer > 0 &&
            <>
              <tr>
                <td className="points-title text-uppercase">
                  {t("Peer Points to Award")}:
                </td>
              </tr>
              <tr>
              <td className="value"> {(pointBalance.peerBalance * pointBalance.factor).toLocaleString(locale)}</td>
              </tr>
            </>
          }
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    pointBalance: state.pointBalance,
    template: state.template,
    program: state.program,
  };
};

export default connect(mapStateToProps)(PointsClear);
