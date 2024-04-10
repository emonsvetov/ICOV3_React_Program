import React from 'react';
//import axios from 'axios';
import CloseIcon from 'mdi-react/CloseIcon';
import {
    Modal,
    Col,
    Container,
    Row,
    FormGroup,
    Label,
} from "reactstrap";
//import { useTranslation } from "react-i18next";

const ViewTeamModal = ({ program, isOpen, setOpen, toggle, team }) => {
    // let props = {
    //     toggle,
    //     data: team,
    //     program,
    // }
    return (
        <Modal className={`program-settings  modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
            <div className='close cursor-pointer'>
                <CloseIcon onClick={toggle} size={30} />
            </div>

            <div className="team p-4">
                <Container>
                    <Row className="mt-1">
                        <Col md={12}>
                            <div className="my-3 d-flex justify-content-between">
                                <h3>{team?.name}</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="team-view">
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Photo:(300 * 300px)</Label>
                                    {/*<img src={team?.photo} style={{}} /> */}
                                    <img src={`${process.env.REACT_APP_API_STORAGE_URL}/${team?.photo}`} style={{width:'300px'}} alt='team_pic' />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Name</Label>
                                    <Label>{team?.name}</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Title</Label>
                                    <Label>{team?.title}</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Description</Label>
                                    <Label>{team?.description}</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Contact Phone</Label>
                                    <Label>{team?.contact_phone}</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <Label>Contact Email</Label>
                                    <Label>{team?.contact_email}</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </Modal>
    )
}

export default ViewTeamModal;
