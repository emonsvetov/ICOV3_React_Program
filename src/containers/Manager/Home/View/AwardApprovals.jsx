import React, { useState, useEffect } from "react";
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
import { readAssignedPositionPermissions } from "@/services/program/budget";

const AwardApprovals = ({ organization, auth, rootProgram }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [assignedPermissions, setAssignedPermissions] = useState([]);

  const togglePan = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (auth?.positionLevel && organization?.id && rootProgram?.id) {
      readAssignedPositionPermissions(
        organization.id,
        rootProgram.id,
        auth.positionLevel.id
      )
        .then((res) => {
          setAssignedPermissions(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [auth, organization, rootProgram]);

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
                <PendingAwardApprovals
                  assignedPermissions={assignedPermissions}
                />
              </Col>
            </Row>
          </>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col>
              <ManageAwardApprovals
                togglePan={togglePan}
                assignedPermissions={assignedPermissions}
              />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default AwardApprovals;
