import React, { useState } from "react";
import { connect } from "react-redux";
import { PDF } from "./components/PDF";
import { Col, Row, Container } from "reactstrap";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const Training = ({ template }) => {
  const img = `${process.env.PUBLIC_URL}/theme/original/img/training_thumbnail.jpg`;
  const link =
    "https://staging-mypathpps.incentco.com/assets/theme/mypathpps/img/training/Training_flyer.pdf";
  const title = "Training";
  const props = { img, link, title };
  const { t } = useTranslation();

  return (
    <Row className="mt-4">
      <Col md={4}>
        <SidebarOrigin />
      </Col>

      <Col md={3}>
        <div className="pdf-link">
          <h2 className="text-uppercase text-center mb-5">{t("training")}</h2>
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

export default connect(mapStateToProps)(Training);
