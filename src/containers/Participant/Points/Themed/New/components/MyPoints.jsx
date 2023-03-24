import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import Sidebar from "../../Layout/sidebar";
import PointsSummary from "./components/PointsSummary";
import PointsDetail from "./components/PointsDetail";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getParticipantMypointsAction } from '@/redux/actions/userActions';

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-points.jpg`;

const IMG_GIFT = `${process.env.PUBLIC_URL}/theme/clear/img/GiftCode_button.png`;
const IMG_MERCHAN = `${process.env.PUBLIC_URL}/theme/clear/img/Merchandise_button.png`;

const MyPointsNew = () => {

  return (
    <>
      <div className="mainboard">
        <img src={IMG_BACK} alt={"my_points"} />
        <div className="title">{t("my_points")}</div>
      </div>
      <Container>
        <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <PointsSummary />
              <PointsDetail />
            </div>
          </Col>
          <Col md={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
    program: state.program,
    auth: state.auth,
    myPoints: state.participant.myPoints,
    pointBalance: state.pointBalance,
  };
};

export default connect(mapStateToProps)(MyPoints);
