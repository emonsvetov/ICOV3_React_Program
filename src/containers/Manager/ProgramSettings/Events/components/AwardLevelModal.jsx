import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from "axios";

const AwardLevelModal = ({ isOpen, toggle, awardLevel, handleAssign, eventId,organizationId, programId}) => {
    const [formData, setFormData] = useState({
        id: 0,
        event_id: eventId,
        amount: "",
        award_level_id: awardLevel.id
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'amount') {
            const isValid = /^\d+(\.\d{1,2})?$/.test(value); // Проверяем, является ли значение числом с двумя знаками после запятой
            setErrors({ ...errors, [name]: isValid ? '' : 'Amount must be a number with up to two decimal places' });
        }
    };

    const save = (data) => {
        axios.put(`/organization/${organizationId}/program/${programId}/event-award-level/${eventId}`, data)
            .then((res) => {
                handleAssign(data);
            }).catch((err) => {});
    };

    const handleSubmit = () => {
        if (Object.values(errors).every(error => error === '')) {
            formData.event_id = eventId;
            formData.award_level_id = awardLevel.id;
            save(formData);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Assign Award Level {awardLevel.name}</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                        type="text"
                        name="amount"
                        id="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        invalid={errors.amount !== ''}
                    />
                    <FormFeedback>{errors.amount}</FormFeedback>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Assign
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AwardLevelModal;
