import React, { useState, useEffect } from "react";
import ResendIcon from "mdi-react/AccountPlusIcon";
import MailIcon from "mdi-react/MailOutlineIcon";
import ParticipantGoalPlans from "./ParticipantGoalPlans";
import PeerIcon from "mdi-react/PostItNoteAddIcon";

import ModalWrapper from "./ModalWrapper";
import ParticipantCurrentPoints from "./ParticipantCurrentPoints";
import ParticipantInfo from "./ParticipantInfo";
import ParticipantRewardHistory from "./ParticipantRewardHistory";
import { Modal, Col, Row, Button, Container } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";

const ParticipantViewModal = ({ isOpen, setOpen, toggle, participants }) => {
  const [participant, setParticipant] = useState([]);
  const [isActionOpen, setActionOpen] = useState(false);
  const [modalName, setModalName] = useState(null);
  const toggle_modal = (name = null) => {
    if (name) setModalName(name);
    setActionOpen((prevState) => !prevState);
  };
  const onClickAction = (name, participant) => {
    setParticipant([participant]);
    toggle_modal(name);
  };
  return (
    <Modal
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <Container fluid>
        <Row>
          <Col md={12}>
            <h3>Participant Information</h3>
          </Col>
          <Col md={12}>
            <Button
              type="button"
              aria-label="button collapse"
              className="action-item template-button border-0 btn btn-secondary me-2"
              onClick={(e) => {
                window.location.href = `mailto: ${participants.email}`;
                e.preventDefault();
              }}
              // onClick={handleToggleCollapse}
            >
              <MailIcon />
              Email
            </Button>
            <span
              onClick={() => onClickAction("Resend Invite", participants)}
              type="button"
              aria-label="button collapse"
              className="action-item template-button border-0 btn btn-secondary me-2"
            >
              <ResendIcon />
              Resend Invite
            </span>
            <Button
              onClick={() =>
                onClickAction("Reclaim Peer Allocations", participants)
              }
              type="button"
              aria-label="button collapse"
              className="template-button border-0 btn btn-secondary me-2"
            >
              <PeerIcon />
              Reclaim Peer Allocations
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ParticipantInfo participant={participants}></ParticipantInfo>
          </Col>
          <Col md={6}>
            {/* <Link className="text-right"  to={`/users/edit/${data.id}`}>Edit Participant</Link> */}
            <ParticipantCurrentPoints participant={participants} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ParticipantGoalPlans
              participant={participants}
            ></ParticipantGoalPlans>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ParticipantRewardHistory
              participant={participants}
            ></ParticipantRewardHistory>
          </Col>
        </Row>
      </Container>
      <ModalWrapper
        name={modalName}
        isOpen={isActionOpen}
        setOpen={setActionOpen}
        toggle={toggle_modal}
        participants={participant}
      />
    </Modal>
  );
};
export default ParticipantViewModal;
