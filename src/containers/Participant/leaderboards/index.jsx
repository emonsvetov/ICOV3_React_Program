import React, { useContext, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";
import Leaderboards from "./components/Leaderboards";
import { useTranslation } from "react-i18next";
import { themeContext } from "@/context/themeContext";

const LeaderboardPage = ({ template }) => {
  const {
    state: { themeName },
  } = useContext(themeContext);
  const { t, i18n } = useTranslation();

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin />
        </Col>

        <Col md={8} className="">
          <div className="title leaderboard h5 fw-bold p-3 font-weight-bold">
            {t("leaderboards")}
          </div>
          <Leaderboards />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(LeaderboardPage);
