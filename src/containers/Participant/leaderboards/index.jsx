import React, { useState } from "react";

import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";
import Leaderboards from "./components/Leaderboards";

const LeaderboardPage = ({ template }) => {
  const isOriginTheme = template?.type == "origin";

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>

        <Col md={8} className="">
          <div className="title leaderboard h5 fw-bold p-3 font-weight-bold">
            Leaderboards
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
