import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import PointsOrigin from "../../Layout/sidebar/PointsOrigin";
import { getSlideImg } from "../Home";
import { SliderOrigin } from "../Home/components/slider";
import Redeem from "./components/Redeem";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

export const RedeemMerchant = ({ template }) => {
  const isOriginTheme = template?.type == "origin";

  console.log("template", template);
  let params = useParams();
  let { merchantId } = params;
  let slide_imgs = getSlideImg();

  const OriginRedeemMerchant = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={3}>
            <PointsOrigin />
          </Col>
          <Col md={9} className="">
            <Redeem />
          </Col>
        </Row>
        <div className="mt-5">
          <h6 className="m-3">Select a merchant to redeem your points</h6>
          <SliderOrigin data={slide_imgs} />
        </div>
      </Container>
    );
  };

  const NewRedeemMerchant = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} />
          <div className="title">Redeem My Points</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <Redeem />
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

  return (
    (isOriginTheme && <OriginRedeemMerchant />) ||
    (!isOriginTheme && <NewRedeemMerchant />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(RedeemMerchant);
