import React, {useEffect, useState} from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";

const ParticipantInfo = ({ participant, auth, program }) => {
    const [awardLevels, setAwardLevels] = useState([])
    const fullName = `${participant.first_name} ${participant.last_name}`

    const getDataItems = async () => {
        const response = await axios.get(
            `/organization/${program.organization_id}/program/${program.id}/program-award-levels`,
        );
        setAwardLevels(response.data);
    };

    useEffect(() => {
        getDataItems()
    }, [program]);

    const handleChange = (event) => {
        axios.put(`/organization/${program.organization_id}/program/${program.id}/user/${participant.id}`, {
                award_level: event.target.value,
                first_name: participant.first_name,
                last_name: participant.last_name,
                email: participant.email,
            }).then( (res) => {})
    };

    return (
        <>
            <Row>
                <Col md="6" lg="6" xl="6">
                    <p>{fullName}</p>
                    <span>{participant?.email}</span>
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Participant Since:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12" >
                    {participant?.created_at ? `${new Date(participant.created_at).toLocaleDateString("en-US", {})}` : ''}
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
                    {participant?.organization_id}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Anniversary:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    { participant?.work_anniversary ? `${new Date(participant.work_anniversary).toLocaleDateString("en-US", {})}`: ''}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Birthday:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    { participant?.dob ? `${new Date(participant.dob).toLocaleDateString("en-US", {})}`: ''}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Department / Team:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    {participant?.division}
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" xl="6" sm="12">
                    Award Level:
                </Col>
                <Col md="6" lg="6" xl="6" sm="12">
                    <select onChange={handleChange}>
                        <option disabled selected value=""></option>
                        {awardLevels.map((option, index) => (
                            <option key={index} value={option.id} selected={participant.award_level === option.name}>{option.name}</option>
                        ))}
                    </select>
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
