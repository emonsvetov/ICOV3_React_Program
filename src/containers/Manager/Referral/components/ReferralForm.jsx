import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import renderToggleButtonField from "@/shared/components/form/ToggleButton"

import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"
import formValidation from "@/validation/addReferralNotificationRecipient"
import TemplateButton from "@/shared/components/TemplateButton"

const ReferralForm = ({
    referral,
    toggle,
    program,
    btnLabel = 'Save',
}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        let formData = {};
        formData["referral_notification_recipient_email"] = values.referral_notification_recipient_email;
        formData["referral_notification_recipient_name"] = values.referral_notification_recipient_name;
        formData["referral_notification_recipient_lastname"] = values.referral_notification_recipient_lastname;
        formData["referral_notification_recipient_active"] = values.referral_notification_recipient_active;
    
        console.log(formData)

        let url = `/organization/${program.organization_id}/program/${program.id}/referral-notification-recipient`
        let method = 'post'

        if (referral?.id) //Is Edit
        {
            //formData.append("_method", "PUT");
            formData.append('id', referral.id);
            url += `/${referral.id}`
            method = 'put'
        }
        setLoading(true)
        axios.post(url, formData).then((res) => {
                    // console.log(res)
                    if (res.status == 200) {
                        flashSuccess(dispatch, 'Referral saved successfully!')
                        setLoading(false)
                        window.location.reload()
                        toggle()
                    }
                })
            .catch((err) => {
                flashError(dispatch, err.response.data)
                setLoading(false)
            });
    };
    return(
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={referral}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="12">
                        <Field name="referral_notification_recipient_name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="First Name"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Field name="referral_notification_recipient_lastname">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Last Name"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <Field name="referral_notification_recipient_email">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Email"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>
                
                <Row>
                <Col md="12">
                    <FormGroup className='d-flex justify-content-between'>
                    <Label>Status</Label>
                    <Field
                        name="referral_notification_recipient_active"
                        component={renderToggleButtonField}
                    />
                    </FormGroup>
                </Col>
                </Row>
                
                <div className='d-flex justify-content-end'>
                        <TemplateButton disabled={loading} type='submit' text={btnLabel} />
                    </div>
            </form>
            )}
        </Form>
    )
}

export default ReferralForm;