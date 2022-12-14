import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row, NavLink, Button } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";

import { SidebarOrigin } from "../../Layout/sidebar";
import SuggestionForm from "./components/SuggestionForm";

const IMG_REFERRAL = `${process.env.PUBLIC_URL}/img/MyPath_Color_outlines.635ff927bd7f32.03885491.png`;

const SuggestionBox = ({ template }) => {
  // console.log(auth)

  return (
    <div className="submit-referral">
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin />
        </Col>
        <Col md={1}></Col>
        <Col md={6}>
          <div className="d-flex justify-content-center mb-5">
            <img src={IMG_REFERRAL} alt="My Path logo" width={"100px"}></img>
          </div>
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
