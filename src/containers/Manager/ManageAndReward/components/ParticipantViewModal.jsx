import React, { useState, useEffect } from "react";
import ResendIcon from "mdi-react/AccountPlusIcon";
import ParticipantGoalPlans from "./ParticipantGoalPlans";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
    Modal,
    Input,
    Col,
    Row,
    FormGroup,
    FormFeedback,
    Label,
    Button,
    Container,
    Card, CardBody,
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
    console.log(participants)
    console.log('kkkk');
    let data = participants
    //console.log(participants)
    const fullName = `${data.first_name} ${data.last_name}`
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
                        <button
                            type="button"
                            aria-label="button collapse"
                            className="template-button border-0 btn btn-secondary me-2"
                        // onClick={handleToggleCollapse}
                        >Email</button>
                        <button
                            type="button"
                            aria-label="button collapse"
                            className="template-button border-0 btn btn-secondary me-2"
                        // onClick={handleToggleCollapse}
                        >Resend Invite</button>
                        <button
                            type="button"
                            aria-label="button collapse"
                            className="template-button border-0 btn btn-secondary me-2"
                        // onClick={handleToggleCollapse}
                        >Reclaim Peer Allocations</button>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>

                        <Row>
                            <Col md="6" lg="6" xl="6">
                                <p>{fullName}</p>
                                <span>{data.email}</span>
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
                                {data.status.status}
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
                                {data.work_anniversary}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Birthday:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {data.dob}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Work Anniversary:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {data.work_anniversary}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Department / Team:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {data.division}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6" xl="6" sm="12">
                                Birthday:
                            </Col>
                            <Col md="6" lg="6" xl="6" sm="12">
                                {data.dob}
                            </Col>
                        </Row>


                    </Col>
                    <Col md={6}>

                        {/* <Link className="text-right"  to={`/users/edit/${data.id}`}>Edit Participant</Link> */}

                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Total Points Rewarded:</td>
                                    <td>4,000</td>

                                </tr>
                                <tr>
                                    <td><strong>Current Points Balance:</strong></td>
                                    <td><strong>0</strong></td>

                                </tr>
                                <tr>
                                    <td><strong>Current Peer Points Balance:</strong></td>
                                    <td><strong>200</strong></td>
                                </tr>

                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ParticipantGoalPlans></ParticipantGoalPlans>
                <Table striped bordered hover> 
                    <thead>
                        <tr>
                            <td colspan="8" class="title">
                                Reward History
                            </td>
                        </tr>
                    </thead>
                    <tbody><tr>
                        <th class="title-col"></th>
                        <th class="title-col">
                            Event
                        </th>
                        <th class="title-col">Notes</th>
                        <th class="title-col">
                            Referrer
                        </th>
                        <th class="title-col value">Date</th>
                        <th class="title-col value">Reference Document</th>										<th class="value">
                            Points                        </th>
                    </tr>
                        <tr class="odd">
                            <td class="title-col">

                            </td>
                            <td class="title-col">
                                Reclaim points                            </td>
                            <td class="title-col">
                                audit cleanup test awards                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                12/31/2022                            </td>
                            <td class="title-col" id="pdf-">
                            </td>
                            <td class="title-col value">
                                -400                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr class="even">
                            <td class="title-col">

                            </td>
                            <td class="title-col">
                                Reclaim points                            </td>
                            <td class="title-col">
                                audit cleanup test awards                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                12/31/2022                            </td>
                            <td class="title-col" id="pdf-">
                            </td>
                            <td class="title-col value">
                                -200                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr class="odd">
                            <td class="title-col">

                                <div class="event-icon g"></div>
                            </td>
                            <td class="title-col">
                                Happy Birthday!                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                08/12/2022                            </td>
                            <td class="title-col" id="pdf-465656">
                            </td>
                            <td class="title-col value">
                                0                            </td>
                            <td>
                                
                                    <a href="/manager/participant/print-award-email/404628/465656" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 465656); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                                
                            </td>
                        </tr>
                        <tr class="even">
                            <td class="title-col">

                                <div class="event-icon g"></div>
                            </td>
                            <td class="title-col">
                                Award                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                04/14/2022                            </td>
                            <td class="title-col" id="pdf-449264">
                            </td>
                            <td class="title-col value">
                                400                            </td>
                            <td>
                                
                                    <a href="/manager/participant/print-award-email/404628/449264" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 449264); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                               
                            </td>
                        </tr>
                        <tr class="odd">
                            <td class="title-col">

                                <div class="event-icon i"></div>
                            </td>
                            <td class="title-col">
                                Helping Hand                            </td>
                            <td class="title-col">
                                Peer 2 Peer Award                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                04/06/2022                            </td>
                            <td class="title-col" id="pdf-448261">
                            </td>
                            <td class="title-col value">
                                0                            </td>
                            <td>
                                
                                    <a href="/manager/participant/print-award-email/404628/448261" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 448261); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                              
                            </td>
                        </tr>
                        <tr class="even">
                            <td class="title-col">

                                <div class="event-icon i"/>
                            </td>
                            <td class="title-col">
                                Helping Hand                            </td>
                            <td class="title-col">
                                Peer 2 Peer Award                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                03/03/2022                            </td>
                            <td class="title-col" id="pdf-444680">
                            </td>
                            <td class="title-col value">
                                0                            </td>
                            <td>
                                
                                    <a href="/manager/participant/print-award-email/404628/444680" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 444680); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                               
                            </td>
                        </tr>
                        <tr class="odd">
                            <td class="title-col">

                                <div  class="event-icon g"></div>
                            </td>
                            <td class="title-col">
                                Peer Award Limited                            </td>
                            <td class="title-col">
                                Peer 2 Peer Award                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                03/03/2022                            </td>
                            <td class="title-col" id="pdf-444679">
                            </td>
                            <td class="title-col value">
                                200                            </td>
                            <td>
                               
                                    <a href="/manager/participant/print-award-email/404628/444679" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 444679); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                              
                            </td>
                        </tr>
                        <tr class="even">
                            <td class="title-col">

                            </td>
                            <td class="title-col">
                                Expire points                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                01/06/2022                            </td>
                            <td class="title-col" id="pdf-">
                            </td>
                            <td class="title-col value">
                                -40                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr class="odd">
                            <td class="title-col">

                            </td>
                            <td class="title-col">
                                Expire points                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                12/31/2021                            </td>
                            <td class="title-col" id="pdf-">
                            </td>
                            <td class="title-col value">
                                -3,960                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr class="even">
                            <td class="title-col">

                                <div class="event-icon g"></div>
                            </td>
                            <td class="title-col">
                                Happy Birthday!                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col">
                            </td>
                            <td class="title-col value">
                                08/12/2021                            </td>
                            <td class="title-col" id="pdf-407214">
                            </td>
                            <td class="title-col value">
                                0                            </td>
                            <td>
                              
                                    <a href="/manager/participant/print-award-email/404628/407214" target="_blank" title="Print"><img src="/assets/img/printer.png"/></a>

                                    <a href="" onclick="Participant.getInstance().resendAward(404628 , 407214); return false;" title="Resend"><img src="/assets/img/mail.png"/></a>
                                
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Modal>
    );
};
export default ParticipantViewModal;