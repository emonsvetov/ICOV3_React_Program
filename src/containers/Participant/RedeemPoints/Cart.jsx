import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import PointsOrigin from "../../Layout/sidebar/PointsOrigin";
import CartPage from "./components/CartPage";
import { themeContext } from "@/context/themeContext";
import { useTranslation } from "react-i18next";

const IMG_BACK = `${process.env.PUBLIC_URL}/new/img/pages/my-points.jpg`;

export const Cart = ({ template }) => {
  const { t } = useTranslation();
  const {
    state: { themeName },
  } = useContext(themeContext);

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
          <div className="title">{t("redeem_my_points")}</div>
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

  return (
    (themeName === "original" && <OriginCart />) ||
    (themeName === "new" && <NewCart />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Cart);
