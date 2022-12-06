import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";

// import SelectProgram from '../components/SelectProgram'
import Users from "./components/Users";
import { isEmpty } from "@/shared/helper";
import { SidebarOrigin } from "../../Layout/sidebar";

const Peer2Peer = ({ auth, program, organization, template }) => {
  const isOriginTheme = template?.type == "origin";

  const Peer2PeerOrigin = () => {
    return (
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={4}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>
        <Col md={7} className="peer-peer">
          <div className="mb-5">
            <h5>Reward a Peer</h5>
            <div>
              You can search for users by name or email address. Then select the
              user you would like to reard and click the 'reward' button.
            </div>
          </div>
          {auth && program && !isEmpty(organization) && (
            <Users organization={organization} program={program} />
          )}
        </Col>
      </Row>
    );
  };
  const Peer2PeerNew = () => {
    return (
      <div className="peer-peer">
        <Container>
          <ParticipantTabNavs />
          <Row>
            <Col md={9}>
              <div className="mb-5">
                <h3>Reward a Peer</h3>
                <div>
                  You can search for users by name or email address. Then select
                  the user you would like to reard and click the 'reward'
                  button.
                </div>
              </div>
              {auth && program && !isEmpty(organization) && (
                <Users organization={organization} program={program} />
              )}
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    (isOriginTheme && <Peer2PeerOrigin />) ||
    (!isOriginTheme && <Peer2PeerNew />)
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    template: state.template,
  };
};

export default connect(mapStateToProps)(Peer2Peer);
