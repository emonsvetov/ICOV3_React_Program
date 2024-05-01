import React, {useEffect, useState} from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";

const ParticipantInfo = ({ participant, auth, program }) => {
    // const [awardLevels, setAwardLevels] = useState([])
    const [awardLevelOptions, setAwardLevelOptions] = useState([])
    const [awardLevel, setAwardLevel] = useState({})
    
    const fullName = `${participant.first_name} ${participant.last_name}`

    const getDataItems = async () => {
        const response = await axios.get(
            `/organization/${program.organization_id}/program/${program.id}/program-award-levels`,
        );
        // setAwardLevels(response.data);
        let options = []
        if(response.data?.length){
            response.data.forEach(item => {
                options.push({label: item.name, value: item.id})
                if(item.name == participant.award_level){
                    setAwardLevel({label: item.name, value: item.id})
                }
            });
            setAwardLevelOptions(options)
        }
    };

    useEffect(() => {
        getDataItems()
    }, [program]);

    const handleChange = (event) => {
        axios.put(`/organization/${program.organization_id}/program/${program.id}/user/${participant.id}`, {
                award_level: event.value,
                first_name: participant.first_name,
                last_name: participant.last_name,
                email: participant.email,
            }).then( (res) => {
                awardLevelOptions.forEach(item => {
                    if(item.value == res.data?.user?.award_level){
                        setAwardLevel(item)
                    }
            });})
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
                    <Select
                        options={awardLevelOptions}
                        clearable={false}
                        className="react-select"
                        placeholder={" --- "}
                        classNamePrefix="react-select"
                        value={awardLevel}
                        onChange={handleChange}
                        />
                    {/* <select onChange={handleChange}>
                        <option disabled selected value="">Select a level</option>
                        {awardLevels.map((option, index) => (
                            <option key={index} value={option.id} selected={participant.award_level === option.name}>{option.name}</option>
                        ))}
                    </select> */}
                    {/* <button style={{marginLeft:10}}>Save</button> */}
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
