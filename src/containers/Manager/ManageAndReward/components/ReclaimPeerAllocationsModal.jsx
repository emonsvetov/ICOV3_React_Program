import React, { useState, useEffect } from "react";
import { Modal, Input, Col, Row, FormGroup, Label, Button, Container, Table } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { useTranslation } from "react-i18next";
import TemplateButton from "@/shared/components/TemplateButton"; 

import CloseIcon from "mdi-react/CloseIcon";
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import { getReclaimablePeerPoints } from "@/services/user/getReclaimablePeerPoints";



const ReclaimPeerAllocationsModal = ({isOpen, setOpen, toggle, participants, program, organization}) => {
    const [loading, setLoading] = useState(true);
    const [reclaimable_peer_points, setReclaimablePeerPoints] = useState([]);
    const { t } = useTranslation();
    let participant = participants[0];
    
    const onSubmit = (values) => {
        
    };
    useEffect(() => {
        let mounted = true;
        if(participant) {
            console.log('dfdf');
            setLoading(true);
            getReclaimablePeerPoints(organization.id, program.id, participant.id).then((items) => {
                setReclaimablePeerPoints(items);
                setLoading(false);
            });
        }
        return () => (mounted = false);
    },[participant]);

   if (loading) return t("loading");
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
                <Form
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, form, submitting, pristine, values }) => (
                        <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <h3>Reclaim Peer Allocations</h3>
                                    <div>Peer Points Balance: </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <td colSpan="8" className="title">
                                                        Peer Allocations
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Event</th>
                                                    <th>Points</th>
                                                    <th>Reclaim?</th>
                                                    <th>Reason / Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>03/25/2022	</td>
                                                    <td>Event</td>
                                                    <td>100</td>
                                                    <td><FormGroup className='d-flex justify-content-between'>
                                                        <Field
                                                            name="award_message_editable"
                                                            component={renderToggleButtonField}
                                                        />
                                                    </FormGroup></td>
                                                    <td>
                                                        <Field name="name">
                                                            {({ input, meta }) => (
                                                                <FormGroup>
                                                                    <Input
                                                                        placeholder="Leaderboard Name"
                                                                        type="text"
                                                                        {...input}
                                                                    />
                                                                    {meta.touched && meta.error && <span className="text-danger">
                                                                        {meta.error}
                                                                    </span>}
                                                                </FormGroup>
                                                            )}
                                                        </Field></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className='d-flex justify-content-end'>
                                        <TemplateButton type='submit' text='Reclaim Peer Allocations' />
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    )}
                </Form>
            </Container>
        </Modal>

    );

};
export default ReclaimPeerAllocationsModal;