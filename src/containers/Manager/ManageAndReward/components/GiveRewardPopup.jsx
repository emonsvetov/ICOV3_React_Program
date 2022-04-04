import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import Switch from '@/shared/components/form/Switch';

const GiveRewardImg = `/img/pages/giveReward.png`;
const Participants = [
  'Bobrowski Robert'
]
const GiveRewardPopup = ({onCancelHandler}) => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

  return (
    <div className='popup give-reward'>
      
      <div className='popup__content d-flex'>
          <div className="left">
            <div className='title mb-5'>
              <h3>Give A Reward</h3>
              <span>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </span>
            </div>
            
            <img src={GiveRewardImg}/>
          </div>
          <div className="right">
            <Form
              onSubmit={onSubmit}
              
              initialValues={{}}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                              
                  <Row>  
                    <Col md="12">
                        <Field name="event">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Select an Event'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label>Participant List to be Rewarded</Label>
                    </Col>
                    <Col md="6">
                        {Participants.map((item, index) => {
                          return <div key={index}>
                            <strong>{item}</strong>
                          </div>
                        })}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label>Cash Value per Particiapnt</Label>
                    </Col>
                    <Col md="6">                        
                        <strong>{'$500'}</strong>
                    </Col>
                  </Row>
                  <Row>  
                    <Col md="12">
                        <Field name="override_cash">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Override Cash Value"
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
                    <Col md="6">
                      <Label>Points per Particiapnt</Label>
                    </Col>
                    <Col md="6">                        
                        <strong>{'20000'}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                        <Field name="email_template">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Email Template'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="referrer">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Referrer"
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
                    <Col md="6">
                      <Label>Total People Selected</Label>
                    </Col>
                    <Col md="6">                        
                        <strong>{'1'}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label>Documentation</Label>
                    </Col>
                    <Col md="6">                        
                    <Field name="doc_file">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Browse"
                                type="file"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label>Total Award</Label>
                    </Col>
                    <Col md="6">                        
                        <strong>{'$500.00'}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Field name="notes">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Reward Notes(optional)"
                                type="textarea"
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
                        <Field name="message">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Message to Participant(s)"
                                type="textarea"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-end'>
                    <Button  color='danger' type='submit'>Save Reward</Button>
                  </div>
                </form>
              )}
            </Form>
          </div>
        
        </div>
      <div className='popup__top'>
        <CloseIcon onClick={onCancelHandler} size={30}/>
      </div>
    </div>
)}

export default GiveRewardPopup;
