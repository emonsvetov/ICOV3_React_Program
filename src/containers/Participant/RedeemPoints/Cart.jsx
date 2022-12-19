import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import PointsOrigin from "../../Layout/sidebar/PointsOrigin";
import { SliderOrigin } from "../Home/components/slider";
import { getSlideImg } from "../Home";
import CartPage from "./components/CartPage";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

export const Cart = ({ template }) => {
  const isOriginTheme = template?.type == "origin";
  let slide_imgs = getSlideImg();

  console.log("template", template);

  const OriginCart = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={3}>
            <PointsOrigin />
          </Col>
          <Col md={9} className="">
            <CartPage />
          </Col>
        </Row>
      </Container>
    );
  };

  const NewCart = () => {
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
                <CartPage />
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

  return (isOriginTheme && <OriginCart />) || (!isOriginTheme && <NewCart />);
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Cart);
