import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import OurMerchants from "./components/BrowseMerchant";
import { connect } from "react-redux";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

const BrowseMerchants = ({ template }) => {
  console.log("template: browsemerchants:", template);

  const isOriginTheme = template?.type == "origin";

  const OriginBrowseMerchants = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
          </Col>
          <Col md={8} className="">
            <p className="fw-bold pb-3">
              Redeem your points from this list to receive a gift code to use
              whenever you'd like.
            </p>
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
