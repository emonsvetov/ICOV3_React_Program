import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import PointsOrigin from "../../Layout/sidebar/PointsOrigin";
import { getSlideImg } from "../Home";
import { SliderOrigin } from "../Home/components/slider";
import Redeem from "./components/Redeem";
import { useTranslation } from "react-i18next";
import {Img} from '@/theme'

export const RedeemMerchant = ({ theme }) => {
  const { t } = useTranslation();

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
          <h6 className="m-3">
            {t("select_a_merchant_to_redeem_your_points")}
          </h6>
          <SliderOrigin data={slide_imgs} />
        </div>
      </Container>
    );
  };

  const NewRedeemMerchant = () => {
    return (
      <>
        <div className="mainboard">
          <Img src={'img/pages/my-points.jpg'} />
          <div className="title">{t("redeem_my_points")}</div>
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
    (theme?.name === "clear" && <OriginRedeemMerchant />) ||
    (theme?.name === "classic" && <NewRedeemMerchant />)
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(RedeemMerchant);
