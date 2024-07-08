import React, { useState } from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import PendingAwardApprovals from "../components/PendingAwardApprovals";
import ManageAwardApprovals from "../components/ManageAwardApprovals";
import classnames from "classnames";

const AwardApprovals = () => {
  const [activeTab, setActiveTab] = useState("1");

  const togglePan = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "1",
            })}
            onClick={() => {
              togglePan("1");
            }}
          >
            Pending Approvals
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "2",
            })}
            onClick={() => {
              togglePan("2");
            }}
          >
            Manage Approvals
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <>
            <Row>
              <Col>
                <PendingAwardApprovals />
              </Col>
            </Row>
          </>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col>
              <ManageAwardApprovals togglePan={togglePan} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default AwardApprovals;
