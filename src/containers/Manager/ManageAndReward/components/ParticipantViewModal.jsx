import React, { useState, useEffect } from "react";
import ResendIcon from "mdi-react/AccountPlusIcon";
import MailIcon from "mdi-react/MailOutlineIcon";
import ParticipantGoalPlans from "./ParticipantGoalPlans";
import PeerIcon from "mdi-react/PostItNoteAddIcon";
import { getParticipantMypointsAction } from '@/redux/actions/userActions';
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ModalWrapper from "./ModalWrapper";
import ParticipantCurrentPoints from "./ParticipantCurrentPoints";

import {
    Modal,
    Col,
    Row,
    Label,
    Button,
    Container,
    Table
} from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";

import { Img } from '@/theme'

const ParticipantViewModal = ({
    isOpen,
    setOpen,
    toggle,
    participants,
    program,
    organization,
    auth,
    template,
    theme
}) => {
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
    const fullName = `${participants.first_name} ${participants.last_name}`
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
                        ><MailIcon />Email</Button>
                        <span
                            onClick={() => onClickAction("Resend Invite", participants)}
                            type="button"
                            aria-label="button collapse"
                            className="action-item template-button border-0 btn btn-secondary me-2"
                        ><ResendIcon />Resend Invite</span>
                        <Button
                            type="button"
                            aria-label="button collapse"
                            className="template-button border-0 btn btn-secondary me-2"
                        ><PeerIcon />Reclaim Peer Allocations</Button>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>

                        <Row>
                            <Col md="6" lg="6" xl="6">
                                <p>{fullName}</p>
                                <span>{participants.email}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Participant Since:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12" >
                                09/13/2019
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Last Activity:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">

                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Current Status:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.status.status}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                External ID:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">

                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Anniversary:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.work_anniversary}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Birthday:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.dob}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Work Anniversary:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.work_anniversary}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Department / Team:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.division}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Birthday:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {participants.dob}
                            </Col>
                        </Row>


                    </Col>
                    <Col md={6}>

                        {/* <Link className="text-right"  to={`/users/edit/${data.id}`}>Edit Participant</Link> */}
                        <ParticipantCurrentPoints participant={participants}/>
                    </Col>
                </Row>
                <ParticipantGoalPlans></ParticipantGoalPlans>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td colSpan="8" className="title">
                                Reward History
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="title-col"></th>
                            <th className="title-col"> Event </th>
                            <th className="title-col">Notes</th>
                            <th className="title-col"> Referrer </th>
                            <th className="title-col value">Date</th>
                            <th className="title-col value">Reference Document</th>
                            <th className="value">Points</th>
                        </tr>
                        <tr className="odd">
                            <td className="title-col"></td>
                            <td className="title-col"> Reclaim points </td>
                            <td className="title-col"> audit cleanup test awards </td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 12/31/2022 </td>
                            <td className="title-col" id="pdf-"></td>
                            <td className="title-col value"> -400 </td>
                            <td></td>
                        </tr>
                        <tr className="even">
                            <td className="title-col"></td>
                            <td className="title-col"> Reclaim points </td>
                            <td className="title-col"> audit cleanup test awards </td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 12/31/2022 </td>
                            <td className="title-col" id="pdf-"></td>
                            <td className="title-col value"> -200 </td>
                            <td></td>
                        </tr>
                        <tr className="odd">
                            <td className="title-col">
                                <div className="event-icon g"></div>
                            </td>
                            <td className="title-col"> Happy Birthday! </td>
                            <td className="title-col"></td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 08/12/2022 </td>
                            <td className="title-col" id="pdf-465656"></td>
                            <td className="title-col value"> 0 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/465656" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                        <tr className="even">
                            <td className="title-col">
                                <div className="event-icon g"></div>
                            </td>
                            <td className="title-col"> Award </td>
                            <td className="title-col"></td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 04/14/2022 </td>
                            <td className="title-col" id="pdf-449264"></td>
                            <td className="title-col value"> 400 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/449264" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                        <tr className="odd">
                            <td className="title-col">
                                <div className="event-icon i"></div>
                            </td>
                            <td className="title-col"> Helping Hand </td>
                            <td className="title-col"> Peer 2 Peer Award </td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 04/06/2022 </td>
                            <td className="title-col" id="pdf-448261"></td>
                            <td className="title-col value"> 0 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/448261" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                        <tr className="even">
                            <td className="title-col">
                                <div className="event-icon i" />
                            </td>
                            <td className="title-col"> Helping Hand </td>
                            <td className="title-col"> Peer 2 Peer Award </td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 03/03/2022 </td>
                            <td className="title-col" id="pdf-444680"></td>
                            <td className="title-col value"> 0 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/444680" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                        <tr className="odd">
                            <td className="title-col">
                                <div className="event-icon g"></div>
                            </td>
                            <td className="title-col"> Peer Award Limited </td>
                            <td className="title-col"> Peer 2 Peer Award </td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 03/03/2022 </td>
                            <td className="title-col" id="pdf-444679"></td>
                            <td className="title-col value"> 200 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/444679" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                        <tr className="even">
                            <td className="title-col"></td>
                            <td className="title-col"> Expire points </td>
                            <td className="title-col"></td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 01/06/2022 </td>
                            <td className="title-col" id="pdf-"></td>
                            <td className="title-col value"> -40 </td>
                            <td></td>
                        </tr>
                        <tr className="odd">
                            <td className="title-col"></td>
                            <td className="title-col"> Expire points </td>
                            <td className="title-col"></td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 12/31/2021 </td>
                            <td className="title-col" id="pdf-"></td>
                            <td className="title-col value"> -3,960 </td>
                            <td></td>
                        </tr>
                        <tr className="even">
                            <td className="title-col">
                                <div className="event-icon g"></div>
                            </td>
                            <td className="title-col"> Happy Birthday! </td>
                            <td className="title-col"></td>
                            <td className="title-col"></td>
                            <td className="title-col value"> 08/12/2021 </td>
                            <td className="title-col" id="pdf-407214"></td>
                            <td className="title-col value"> 0 </td>
                            <td>
                                <a href="/manager/participant/print-award-email/404628/407214" target="_blank" title="Print">
                                    <img src="/assets/img/printer.png" />
                                </a>
                                <a href="" title="Resend">
                                    <img src="/assets/img/mail.png" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>
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