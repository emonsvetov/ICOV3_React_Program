import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row, NavLink, Button } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";

import { SidebarOrigin } from "../../Layout/sidebar";
import ReferralForm from "./components/ReferralForm";


const SubmitReferral = ({ template }) => {
  // console.log(auth)

  return (
    <div className="submit-referral">
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin />
        </Col>
        <Col md={1}></Col>
        <Col md={6}>
          <ReferralForm />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(SubmitReferral);
