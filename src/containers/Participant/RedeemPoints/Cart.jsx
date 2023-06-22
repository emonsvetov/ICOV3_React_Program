import React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import Sidebar from "../../Layout/sidebar";
import Points from "../../Layout/sidebar/Points";
import CartPage from "./components/CartPage";
import { useTranslation } from "react-i18next";

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-points.jpg`;

export const Cart = ({ template }) => {
  const { t } = useTranslation();
  

  const OriginCart = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={3}>
            <Points />
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
          <img src={IMG_BACK} alt="point_img" />
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
    (template?.name === "clear" && <OriginCart />) ||
    (template?.name === "classic" && <NewCart />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Cart);
