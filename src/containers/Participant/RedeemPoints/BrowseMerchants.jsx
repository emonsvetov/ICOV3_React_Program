import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import OurMerchants from "./components/BrowseMerchant";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

const BrowseMerchants = ({ template }) => {
  const { t, i18n } = useTranslation();
  const isOriginTheme = template?.type == "origin";

  const OriginBrowseMerchants = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin />
          </Col>
          <Col md={8} className="">
            <p className="fw-bold pb-3">{t("browse_merchant_desc")}</p>
            <OurMerchants />
          </Col>
        </Row>
      </Container>
    );
  };

  const NewBrowseMerchants = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} alt={"Redeem"} />
          <div className="title">Redeem My Points</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <OurMerchants />
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
    (isOriginTheme && <OriginBrowseMerchants />) ||
    (!isOriginTheme && <NewBrowseMerchants />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(BrowseMerchants);
