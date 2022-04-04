import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';


const InviteParticipant = () => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }
  return (
    <div className='invite-participant'>
        <h2 className='title'>Invite Participant</h2>
        <Form
              onSubmit={onSubmit}
              
              initialValues={{}}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                   
                    <div className="w-75 program-select">
                      <Field name="program">
                        {({ input, meta }) => (
                            <FormGroup className='d-flex'>  
                              <span className='w-50'>For Program:</span>          
                              <Input type="select" name="program" className='w-50'>
                                <option>301166: Incentco</option>
                              </Input>
                          </FormGroup>
                        )}
                      </Field>
                    </div>
                  
                  <Row>  
                    <Col md="12">
                        <Field name="first_name">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="First Name *"
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
                            <FormGroup>
                              <Input
                                placeholder="Last Name *"
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
                        <Field name="external_id">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="External ID"
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
                            <FormGroup>
                              <Input
                                placeholder="Email Address *"
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
                        <Field name="award_level">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Award Level'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-center'>
                    <Button  color='danger' type='submit'>Invite Participant</Button>
                  </div>
                </form>
              )}
        </Form>
    </div>
)}

export default InviteParticipant;
