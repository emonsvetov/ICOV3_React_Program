import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

import { Input, Col, Row, FormGroup, FormFeedback, Label} from 'reactstrap';
import { Form, Field } from 'react-final-form';


const AccountForm = () => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }
  return (
    
    <div className='account'>
        <h2 className='text-center title mb-5'>My Account</h2>
        <Card >
          <CardHeader tag="h3">Account Information</CardHeader>
          <CardBody>
            <Form
                  onSubmit={onSubmit}
                  
                  initialValues={{}}
                >
                  {({ handleSubmit, form, submitting, pristine, values }) => (
                    <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>  
                      
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
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <Row>  
                        <Col md="12">
                          <Field name="password_confirm">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Label className='w-50'>* Confirm Password:</Label>
                                    <Input
                                      placeholder=""
                                      type="password"
                                      {...input}
                                    />
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      </Row>

                      <div className='d-flex justify-content-end'>
                        <Button  color='danger' type='submit'>Save My Account Information</Button>
                      </div>
                    </form>
                  )}
            </Form>    
          </CardBody>
        </Card>
        
    </div>
)}

export default AccountForm;
