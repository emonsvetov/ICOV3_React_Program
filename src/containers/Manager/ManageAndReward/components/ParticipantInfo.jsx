import React, { useEffect } from "react";
import { Table, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";

const ParticipantInfo = ({ participant, auth, program }) => {
    const fullName = `${participant.first_name} ${participant.last_name}`
    console.log(participant);
    return (
        <>
            <Row>
                <Col md="6" lg="6" xl="6">
                    <p>{fullName}</p>
                    <span>{participant.email}</span>
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Participant Since:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12" >
                    {participant.created_at}
                    {/*TO DO created_at*/}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Last Activity:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {/*TO DO last_login*/}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Current Status:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant.status?.status ? participant.status.status : ''}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    External ID:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant.organization_id}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Anniversary:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant.work_anniversary}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Birthday:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant.dob}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Department / Team:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant.division}
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        program: state.program,
    };
};

export default connect(mapStateToProps)(ParticipantInfo);
