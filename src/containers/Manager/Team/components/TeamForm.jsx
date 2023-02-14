import { Input, Col, Row, FormGroup, Label, Button } from 'reactstrap';
import React, { useState, useEffect } from "react";
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import {
  mapFormDataUploads,
  unpatchMedia,
  patchMediaURL,
} from "@/shared/helpers";

import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"
import formValidation from "@/validation/addTeam"
import TemplateButton from "@/shared/components/TemplateButton"

const MEDIA_FIELDS = ["photo"];

const TeamForm = ({
    team,
    toggle,
    program,
    btnLabel = 'Save',
    //team = {}
}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    team = patchMediaURL(team, MEDIA_FIELDS);

    const onSubmit = (values) => {
        // console.log(values);
        if( !(values["photo"] instanceof File))
        {
          console.log("alert: deleting")
          delete values["photo"]
        }
        values = unpatchMedia(values, MEDIA_FIELDS);
        let formData = mapFormDataUploads(values);
        if( values["photo"] instanceof File )
        {
          formData.append('photo', values.photo);
        }

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
                            <Field name="photo">
                                {({ input: { value, onChange, ...input }, meta }) => (
                                    <FormGroup>
                                        <Label>Photo:(300 * 300px)</Label>
                                        <Input
                                            placeholder="Photo"
                                            type="file"
                                            onChange={({ target }) => onChange(target.files[0])}
                                            {...input}
                                        />
                                        {meta.touched && meta.error && <span className="text-danger">
                                            {meta.error}
                                        </span>}
                                    </FormGroup>
                                )}
                            </Field>
                            <RenderImage src={team?.photo} />
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

const RenderImage = ({ src }) => {
  if (!src || typeof src === "undefined") return "";
  return (
    <div className="dropzone-img">
      <a href={src} target="_blank" title="View the picture">
        <img style={{ maxHeight: 120 }} src={src} />
      </a>
    </div>
  );
};

export default TeamForm;