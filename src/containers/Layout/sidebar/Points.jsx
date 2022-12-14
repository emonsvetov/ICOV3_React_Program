import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const Points = ({ myPoints }) => {
  const { t, i18n } = useTranslation();
  if (!myPoints) return t("loading");
  return (
    <div className="points">
      <h3>My Points</h3>
      <div className="panel redeem-panel">
        <div className="mb-3">
          <h6> Points to Redeem </h6>
          <div className="panel-group">
            <h4>{myPoints.points.toLocaleString()}</h4>
            <TemplateButton
              text="Redeem Points"
              link="/participant/select-merchants"
            />
            {/* <Button className='btn-round'> Redeem Points</Button> */}
          </div>
        </div>
        <div className="point-award">
          <h6> Peer Points to Award </h6>
          <h4> {myPoints.peerBalance.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    myPoints: state.pointBalance,
  };
};

export default connect(mapStateToProps)(Points);
// export default Points;
