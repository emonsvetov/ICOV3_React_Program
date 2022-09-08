import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardHeader, CardBody} from 'reactstrap';
import { Input, Col, Row, FormGroup, FormFeedback, Label} from 'reactstrap';
import { Form, Field } from 'react-final-form'
import { getUser } from '@/services/program/getUser'
import axios from 'axios';
import {useDispatch, sendFlashMessage, ApiErrorMessage} from "@/shared/components/flash"
import TemplateButton from "@/shared/components/TemplateButton"
import renderDropZoneField from '@/shared/components/form/DropZone';
import {mapFormDataUploads, unpatchMedia, patchMediaURL} from '@/shared/helper'
import {getAuthUser, AUTH_USER_KEY} from "@/containers/App/auth";

const MEDIA_FIELDS = ['avatar']

const AccountForm = ({organization, program, auth}) => {
  const dispatch = useDispatch()
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(cart)
    // console.log(auth)
    // console.log(organization)
    // console.log(program)
    if( auth &&  organization && program)  {
        // console.log(auth)
        getUser(organization.id, program.id, auth.id)
        .then( payload => {
            setUser(payload)
        })
    }
}, [organization, program, auth]);

  const onSubmit = values => {
    values = unpatchMedia(values, MEDIA_FIELDS)
    let formData = mapFormDataUploads( values )
    formData.append('_method', 'PUT');

    axios.post(`/organization/${organization.id}/user/${user.id}`,
      formData,
      {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
      }
    )
    .then( (res) => {
      let newUser = res.data.user;
      let currentUser = getAuthUser();
      currentUser.avatar = newUser.avatar ? newUser.avatar : null;
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
      if(res.status === 200)  {
          window.location.reload()
      }
    })
    .catch( error => {
      return false;
        if(error?.response?.data) {
          dispatch(sendFlashMessage(<ApiErrorMessage errors={error.response.data} />, 'alert-danger'))
          setLoading(false)
        }
    })
  }

  if( !user ) return 'Loading...'

  user = patchMediaURL( user, MEDIA_FIELDS )

  const initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  }

  return (

    <div className='account'>
        <h2 className='text-center title mb-5'>My Account</h2>
        <Card >
          <CardHeader tag="h3">Account Information</CardHeader>
          <CardBody>
            <Form
                  onSubmit={onSubmit}
                  initialValues={initialValues}
                  validate={validate}
                >
                  {({ handleSubmit, form, submitting, pristine, values }) => (
                    <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>

                      <Row>
                        <Col md="12">
                            <div className='avatar-wrap'>
                              <Field
                                name="avatar"
                                component={renderDropZoneField}
                                multiple={false}
                                customHeight
                                uploadTitle={{type: 'short', displayAlways: true}}
                              />
                              <div className='image-wrap'>
                                <RenderImage src={user?.avatar} />
                              </div>
                            </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Field name="first_name">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* First Name:</Label>
                                    <Input
                                      placeholder=""
                                      type="text"
                                      {...input}
                                    />
                                     {meta.touched && meta.error && (
                                              <span className="form__form-group-error">
                                              {meta.error}
                                              </span>
                                          )}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Field name="last_name">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* Last Name:</Label>
                                    <Input
                                      placeholder=""
                                      type="text"
                                      {...input}
                                    />
                                   {meta.touched && meta.error && (
                                              <span className="form__form-group-error">
                                              {meta.error}
                                              </span>
                                          )}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Field name="email">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* Email Address:</Label>
                                    <Input
                                      placeholder=""
                                      type="email"
                                      {...input}
                                    />
                                    {meta.touched && meta.error && (
                                              <span className="form__form-group-error">
                                              {meta.error}
                                              </span>
                                          )}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Field name="password">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* Password:</Label>
                                    <Input
                                      placeholder=""
                                      type="password"
                                      {...input}
                                    />
                                        {meta.touched && meta.error && (
                                              <span className="form__form-group-error">
                                              {meta.error}
                                              </span>
                                          )}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Field name="password_confirmation">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* Confirm Password:</Label>
                                    <Input
                                      placeholder=""
                                      type="password"
                                      {...input}
                                    />
                                      {meta.touched && meta.error && (
                                              <span className="form__form-group-error">
                                              {meta.error}
                                              </span>
                                          )}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <div className='d-flex justify-content-end'>
                        <TemplateButton type='submit' disabled={loading} text='Save My Account Information' />
                      </div>
                    </form>
                  )}
            </Form>
          </CardBody>
        </Card>

    </div>
)}

const validate = values => {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = "Please enter first name";
  }
  if ( !values.last_name ) {
    errors.last_name = "Please enter last name";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if( values?.password || values?.password_confirmation) {
    if ( values.password !== values.password_confirmation ) {
      errors.password = "Password and confirm password do not match";
    }
    if ( values.password.trim().length < 3 ) {
      errors.password = "Please enter strong password";
    }
  }
  return errors;
}

const RenderImage = ({src}) => {
  if( !src || typeof src === 'undefined' ) return ''
  return (
    <div className='dropzone-img'>
      <a href={src} target='_blank' title='View the picture'>
        <img style={{maxHeight:200}} src={src} />
      </a>
    </div>
  )
}

export default connect((state) => ({
  auth: state.auth,
  program: state.program,
  organization: state.organization,
}))(AccountForm);
