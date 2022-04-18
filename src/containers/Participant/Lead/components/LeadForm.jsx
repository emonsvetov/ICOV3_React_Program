import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

import { Input, Col, Row, FormGroup, FormFeedback, Label} from 'reactstrap';
import { Form, Field } from 'react-final-form';


const LeadForm = () => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }
  return (
    
    <div className='lead'>
        
        <Card >
        <CardHeader tag="h3" className='text-center'> Lead </CardHeader>
          <CardBody>
            <Form
                  onSubmit={onSubmit}
                  
                  initialValues={{}}
                >
                  {({ handleSubmit, form, submitting, pristine, values }) => (
                    <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>  
                      <Row>
                        <Label className='w-50'>Name *</Label>
                      </Row>
                      <Row>  
                        <Col md="6">
                          <Field name="first_name">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Input
                                      placeholder="First Name"
                                      type="text"
                                      {...input}
                                    />
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      
                        <Col md="6">
                          <Field name="last_name">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Input
                                      placeholder="Last Name"
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
                        <Label className='w-50'>Email *</Label>
                      </Row>
                      <Row>  
                        <Col md="12">
                          <Field name="email">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
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
                        <Label className='w-50'>Phone Number *</Label>
                      </Row>
                      <Row>  
                        <Col md="6">
                          <Field name="area_code">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Input
                                      placeholder="Area Code"
                                      type="text"
                                      {...input}
                                    />
                                        {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                                </FormGroup>
                              )}
                            </Field>
                        </Col>
                      
                        <Col md="6">
                          <Field name="number">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
                                    <Input
                                      placeholder="Phone Number"
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
                        <Label className='w-50'>Company Name</Label>
                      </Row>
                      <Row>  
                        <Col md="12">
                          <Field name="company_name">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
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
                        <Label className='w-50'>What can we do to help? *</Label>
                      </Row>
                      <Row>  
                        <Col md="12">
                          <Field name="content">
                              {({ input, meta }) => (
                                  <FormGroup className='d-flex justify-content-between'>
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

                      <div className='d-flex justify-content-end mt-3'>
                        <Button  color='danger' className='w-100' type='submit'>Submit</Button>
                      </div>
                    </form>
                  )}
            </Form>    
          </CardBody>
        </Card>
        
    </div>
)}

export default LeadForm;