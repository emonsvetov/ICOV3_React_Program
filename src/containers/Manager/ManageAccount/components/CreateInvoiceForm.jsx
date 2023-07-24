import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import React, { useState } from "react";
import axios from 'axios';
import renderToggleButtonField from "@/shared/components/form/ToggleButton"

import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"
import formValidation from "@/validation/addReferralNotificationRecipient"
import TemplateButton from "@/shared/components/TemplateButton"
import SelectProgram from '../../components/SelectProgram';

const CreateInvoiceForm = ({
    referral,
    toggle,
    program,
    btnLabel = 'Save',
}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        // console.log('data aa gya', values)
        // // console.log('edit')
        let formData = {};
        formData.amount = values?.amount;
        formData.amount_confirmation = values?.amount_confirmation;
        
    
        console.log(formData)

        let url = `organization/${program.organization_id}/program/${program.id}/invoice/on-demand`
        let method = 'post'

        if (referral?.id) //Is Edit
        {
            formData._method = "PUT";
            formData.id = referral.id;
            url += `/${referral.id}`
            method = 'put'
        }
        setLoading(true)
        axios.post(url, formData).then((res) => {
                     console.log(res)
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
            // validate={(values) => formValidation.validateForm(values)}
            initialValues={referral}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="12">
                        <Field name="program">
                        {({ input, meta }) => (
                            <FormGroup>
                            <SelectProgram />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {/* {meta.error} */}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Field name="amount">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Amount"
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
                        <Field name="amount_confirmation">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Confirm Amount"
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
            
                <div className='d-flex justify-content-end'>
                        <TemplateButton disabled={loading} type='submit' text={btnLabel} />
                    </div>
            </form>
            )}
        </Form>
    )
}

export default CreateInvoiceForm;