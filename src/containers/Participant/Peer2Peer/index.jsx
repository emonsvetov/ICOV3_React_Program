import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import Users from "./components/Users";
import { isEmpty } from "@/shared/helpers";
import Sidebar from "@/containers/Layout/sidebar";
import { useTranslation } from "react-i18next";

const Peer2Peer = ({ auth, program, organization, template, pointBalance }) => {
  
  const { t } = useTranslation();

  const Peer2PeerOrigin = () => {
    return (
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={7} className="peer-peer">
          <div className="mb-5">
            <h5>{t("reward_a_peer")}</h5>
            <div>{t("reward_desc")}</div>
          </div>
          {auth && program && !isEmpty(organization) && (
            <Users organization={organization} program={program} pointBalance={pointBalance} />
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
                <h3>{t("reward_a_peer")}</h3>
                <div>{t("reward_desc")}</div>
              </div>
              {auth && program && !isEmpty(organization) && (
                <Users organization={organization} program={program} pointBalance={pointBalance}/>
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
    (template?.name === "clear" && <Peer2PeerOrigin />) ||
    (template?.name === "classic" && <Peer2PeerNew />)
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    template: state.template,
    pointBalance: state.pointBalance,
  };
};

export default connect(mapStateToProps)(Peer2Peer);
