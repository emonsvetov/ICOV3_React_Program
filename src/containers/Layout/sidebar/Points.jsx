import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const Points = ({ pointBalance }) => {
  console.log(pointBalance)
  const { t } = useTranslation();
  if (!pointBalance) return t("loading");
  return (
    <div className="points">
      <h3>{t("my_points")}</h3>
      <div className="panel redeem-panel">
        <div className="mb-3">
          <h6> {t("points_to_redeem")} </h6>
          <div className="panel-group">
            <h4>{pointBalance.points.toLocaleString()}</h4>
            <TemplateButton
              text={t("redeem_points")}
              link="/participant/select-merchants"
            />
            {/* <Button className='btn-round'> Redeem Points</Button> */}
          </div>
        </div>
        <div className="point-award">
          <h6> {t("peer_points_to_award")} </h6>
          <h4> {pointBalance.peerBalance.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    pointBalance: state.pointBalance,
  };
};

export default connect(mapStateToProps)(Points);
// export default Points;
