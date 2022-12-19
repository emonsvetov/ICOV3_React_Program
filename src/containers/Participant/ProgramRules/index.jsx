import React from "react";
import { Col, Container, Row } from "reactstrap";
import Queries from "../Faqs/components/Queries";
import { SidebarOrigin } from "../../Layout/sidebar";

const ProgramRules = () => {
  return (
    <>
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>

        <Col md={7}>
          <h2 className="my-3">Program Rules</h2>
          <p>
            Congratulations on participating in your Rewards program! Here are
            some FAQ's to help you understand how the program works.
          </p>
          <h6>Enjoy!</h6>
          <Queries />
        </Col>
      </Row>
    </>
  );
};

export default ProgramRules;
