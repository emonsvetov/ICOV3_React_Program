import React, { useState, useEffect } from "react";
import ResendIcon from "mdi-react/AccountPlusIcon";
import MailIcon from "mdi-react/MailOutlineIcon";
import ParticipantGoalPlans from "./ParticipantGoalPlans";
import PeerIcon from "mdi-react/PostItNoteAddIcon";

import ModalWrapper from "./ModalWrapper";
import ParticipantCurrentPoints from "./ParticipantCurrentPoints";
import ParticipantInfo from "./ParticipantInfo";
import ParticipantRewardHistory from "./ParticipantRewardHistory";
import { Modal, Col, Row, Button, Container, ModalHeader, ModalBody } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";

const ParticipantViewModal = ({ isOpen, setOpen, toggle, participants, program, template }) => {
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
      className={`modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <ModalHeader>
        <h3>Participant Information</h3>
      </ModalHeader>
      <ModalBody>  
        <Container fluid>
          <Col>
            <Button
              type="button"
              aria-label="button collapse"
              className="action-item template-button border-0 me-2"
              style={template.button_color ? {
                color: template.button_color,
                backgroundColor: template.button_bg_color,
              } : {}}
              onClick={(e) => {
                window.location.href = `mailto: ${participants.email}`;
                e.preventDefault();
              }}
              // onClick={handleToggleCollapse}
            >
              <div className="d-flex gap-1">
                <MailIcon />
                Email
              </div>
            </Button>
            <Button
              onClick={() => onClickAction("Resend Invite", participants)}
              type="button"
              aria-label="button collapse"
              className="action-item template-button border-0 me-2"
              style={template.button_color ? {
                color: template.button_color,
                backgroundColor: template.button_bg_color,
              } : {}}
            >
              <div className="d-flex gap-1">
                <ResendIcon />
                Resend Invite
              </div>
            </Button>
            {program.uses_peer2peer && <Button
              onClick={() =>
                onClickAction("Reclaim Peer Allocations", participants)
              }
              type="button"
              aria-label="button collapse"
              className="template-button border-0 me-2"
              style={template.button_color ? {
                color: template.button_color,
                backgroundColor: template.button_bg_color,
              } : {}}
            >
              <div className="d-flex gap-1">
                <PeerIcon />
                Reclaim Peer Allocations
              </div>
            </Button>}
          </Col>
          <Row className="mt-0">
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
      </ModalBody>
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
