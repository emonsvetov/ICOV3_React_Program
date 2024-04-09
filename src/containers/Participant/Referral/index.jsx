import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import Sidebar from "@/containers/Layout/sidebar";
import ReferralForm from "./components/ReferralForm";

const SubmitReferral = ({ template }) => {
  // console.log(auth)

  return (
    <div className="submit-referral container-fluid">
      <Row className="mt-4">
        <Col md={4}>
          <Sidebar />
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
