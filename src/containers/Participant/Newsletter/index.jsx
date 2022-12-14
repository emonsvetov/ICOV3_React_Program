import React, { useState } from "react";
import { connect } from "react-redux";
import { PDF } from "../Training/components/PDF";
import { Col, Row } from "reactstrap";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const Newsletter = ({ template }) => {
  const img = `${process.env.PUBLIC_URL}/img/thumbnail_The-Changing-Face-of-Incentive-Travel.jpg`;
  const link =
    "https://staging-mypathpps.incentco.com/assets/theme/mypathpps/img/newsletter/The%20Changing%20Face%20of%20Incentive%20Travel.pdf";
  const title = "The Changing Face of Incentive Travel";
  const props = { img, link, title };
  const { t, i18n } = useTranslation();

  return (
    <Row className="mt-4">
      <Col md={4}>
        <SidebarOrigin />
      </Col>

      <Col md={3}>
        <div className="pdf-link">
          <h2 className="text-uppercase text-center">Newsletter</h2>
          <PDF props={props}></PDF>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Newsletter);
