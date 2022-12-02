import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import SelectMerchantType from "./components/SelectMerchantType";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

export const SelectMerchants = () => {
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
              <SelectMerchantType />
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
