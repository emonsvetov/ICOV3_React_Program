import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import React, { useState, useEffect } from "react";
import axios from 'axios';

import {useDispatch, flashError, flashSuccess} from "@/shared/components/flash"
import formValidation from "@/validation/addTeam"
import TemplateButton from "@/shared/components/TemplateButton"
import { makeFormData } from './common'
//import {mapFormDataUploads} from '@/shared/helpers'
import {
    mapFormDataUploads,
    unpatchMedia,
    patchMediaURL,
  } from "@/shared/helper";
const MEDIA_FIELDS = ["photo"];
const TeamForm = ({
    data,
    toggle,
    program,
    btnLabel = 'Save',
    //team = {}
}) => {
    console.log(data);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    let [team, setTeam] = useState(null);
  
    useEffect( () => {
      if( data?.id )
      {
        //console.log("Setting Team")
        setTeam(data)
      }
    }, [data])
  
    const onSubmit = (values) => {
        //let data = makeFormData(program, values)
        //new
        console.log(values);
        values = unpatchMedia(values, MEDIA_FIELDS);
        let formData = mapFormDataUploads(values);
        formData.append("_method", "PUT");

        let url = `/organization/${program.organization_id}/program/${program.id}/team`
        let method = 'post'
        console.log(formData);
        if(team?.id) //Is Edit
        {
          url += `/${team.id}`
          method = 'put'
        }
    
        setLoading(true)
        /*axios({
          url,
          method,
          data
        })*/
        axios
        .post(`/organization/${program.organization_id}/program/${program.id}/team`, formData, {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        })
        .then((res) => {
          //   console.log(res)
          if (res.status == 200) {
            flashSuccess(dispatch, 'Team saved successfully!')
            setLoading(false)
           // window.location.reload()
            // setTrigger(Math.floor(Date.now() / 1000))
            toggle()
          }
        })
        .catch((err) => {
          //console.log(error.response.data);
          flashError(dispatch, err.response.data)
          setLoading(false)
        });
      };
      console.log(team);
      //if (!team) return t("loading");

     // user = patchMediaURL(team, MEDIA_FIELDS);
    return(
    
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={ team }
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="12">
                        <Field name="photo">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Photo:(300 * 300px)</Label>
                                <Input
                                placeholder="Photo"
                                type="file"
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