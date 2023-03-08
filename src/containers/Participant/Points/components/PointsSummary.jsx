import React from "react";
import PointsSummaryTable from "./PointsSummaryTable";
import { useTranslation } from "react-i18next";
import {connect} from "react-redux";

const SUMMARY_LABELS = [
  { index: "balance", text: "Your Points Balance", value: 0 },
  { index: "redeemed", text: "Points Redeemed", value: 0 },
  // { index: "expired", text: "Points Expired", value: 0 },
];

const PointsSummary = ({ program, pointBalance, myPoints }) => {

  // console.log(pointBalance)

  const { t } = useTranslation();

  const factor_valuation = program.factor_valuation
  let points_summary = myPoints.points_summary

  // console.log(myPoints)
  points_summary = [
    ...points_summary, 
    {
      'name': 'Points Reclaimed',
      'points': parseInt(myPoints.points_reclaimed * factor_valuation)
    }
  ]

  const PointsSummaryHeader = () => {
    return (
      <div className="points-summary p-3 rounded-3">
      <h3>{t("points_summary")}</h3>
      <div className="d-flex justify-content-around">
        {SUMMARY_LABELS.map((item, index) => {
          return (
            <div
              key={index}
              className="summary-item d-flex flex-column rounded-3"
            >
              <strong className={`point-value index-${index}`}>
                {
                  item.index === 'expired' ? (
                      pointBalance.expiredBalance * factor_valuation
                    ) : item.index === 'redeemed' ?
                    (
                      pointBalance.redeemedBalance * factor_valuation
                    ) : item.index === 'balance' ?
                    (
                      pointBalance.amount * factor_valuation
                    ) : ''
                }
              </strong>
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
    )
  }

  return (
    <>
      <PointsSummaryHeader />
      <PointsSummaryTable
        table_data={points_summary}
        factor_valuation={factor_valuation}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myPoints: state.participant.myPoints,
    pointBalance: state.pointBalance,
    program: state.program
  };
};

export default connect(mapStateToProps)(PointsSummary);
