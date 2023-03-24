import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import Sidebar from "../../Layout/sidebar";
import SuggestionForm from "./components/SuggestionForm";


const SuggestionBox = ({ template }) => {
  // console.log(auth)

  return (
    <div className="submit-referral">
      <Row className="mt-4">
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={1}></Col>
        <Col md={6}>
          <SuggestionForm />
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

export default connect(mapStateToProps)(SuggestionBox);
