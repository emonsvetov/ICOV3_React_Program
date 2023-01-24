import { Input, Col, Row, FormGroup, Label, Button } from 'reactstrap';
import React, { useState, useEffect } from "react";
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"
import formValidation from "@/validation/addTeam"
import TemplateButton from "@/shared/components/TemplateButton"

const TeamForm = ({
    data,
    toggle,
    //organization,
    program,
    btnLabel = 'Save',
    //team = {}
}) => {
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    let [team, setTeam] = useState(null);
    const photoChangeHandler = (event) => {
        setPhoto(event.target.files[0]);
    };
    useEffect(() => {
        if (data?.id) {
            //console.log("Setting Team")
            setTeam(data)
        }
    }, [data])

    const onSubmit = (values) => {
        console.log(values);
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('title', values?.title ? values.title : '');
        formData.append('description', values?.description ? values.description : '');
        formData.append('contact_email', values?.contact_email ? values.contact_email : '');
        formData.append('contact_phone', values?.contact_phone ? values.contact_phone : '');
        formData.append('photo', photo);
        let url = `/organization/${program.organization_id}/program/${program.id}/team`
        let method = 'post'

        if (team?.id) //Is Edit
        {
            formData.append("_method", "PUT");
            formData.append('id', team.id);
            url += `/${team.id}`
            method = 'put'
        }
        setLoading(true)
        axios
            .post(url, 
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }).then((res) => {
                    // console.log(res)
                    if (res.status == 200) {
                        flashSuccess(dispatch, 'Team saved successfully!')
                        setLoading(false)
                        window.location.reload()
                        toggle()
                    }
                })
            .catch((err) => {
                //console.log(error.response.data);
                flashError(dispatch, err.response.data)
                setLoading(false)
            });
    };
    //if (!team) return t("loading");
    return (
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={team}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                    <Row>
                        <Col md="12">
                            <Field name="photo1">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Photo:(300 * 300px)</Label>
                                        <Input
                                            placeholder="Photo"
                                            type="file"

                                            {...input}
                                            onChange={(e) => { photoChangeHandler(e) }}
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
                            <Field name="name">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            placeholder="Name"
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
                            <Field name="title">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <Input
                                            placeholder="Title"
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
                            <Field name="description">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <Input
                                            placeholder="Description"
                                            type="textarea"
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
                            <Field name="contact_phone">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Contact Phone</Label>
                                        <Input
                                            placeholder="Phone Number"
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
                            <Field name="contact_email">
                                {({ input, meta }) => (
                                    <FormGroup>
                                        <Label>Contact Email</Label>
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

                    <div className='d-flex justify-content-end'>
                        <TemplateButton disabled={loading} type='submit' text={btnLabel} />
                    </div>
                </form>
            )}
        </Form>
    )
}

export default TeamForm;