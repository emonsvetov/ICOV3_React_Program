import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import Switch from '@/shared/components/form/Switch';

const AddEventImg = `/img/pages/addEvent.png`;

const AddGoalPopup = ({onCancelHandler}) => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

  return (
    <div className='popup add-event'>
      
      <div className='popup__content'>
        
          <Col md={5} className="left">
            <div className='mb-5'>
              <h3>Add New Event</h3>
              <span>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </span>
            </div>
            
            <img src={AddEventImg}/>
          </Col>
          <Col md={7} className="right">
            <Form
              onSubmit={onSubmit}
              
              initialValues={{}}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                        <Field name="name">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Event Name"
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
                        <Field name="amount">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Max Awardable Amount"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="ledger_code">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Ledger Code"
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
                        <Field name="enable">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <Label>Enable This Event</Label>
                                <Switch
                                  isOn={value}
                                  handleToggle={() => setValue(!value)}>
                                </Switch>
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <Field name="event_type">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Select Event Type'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="template">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Select a Template'}
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
                        <Field name="post_to_social_wall">
                        {({ input, meta }) => (
                            <FormGroup className='d-flex justify-content-between'>
                              <Label>Post to Social Wall</Label>
                              <Switch
                                  isOn={value}
                                  handleToggle={() => setValue(!value)}>
                              </Switch>
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="ledger_code">
                        {({ input, meta }) => (
                            <FormGroup className='d-flex justify-content-between'>
                              <Label>All amount to be overridden</Label>
                              <Switch
                                  isOn={value}
                                  handleToggle={() => setValue(!value)}>
                              </Switch>
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                        <Field name="min_override">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Min amount award override"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="max_override">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Max amount award override"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    </Row>
                    <Col md="6">
                        <Field name="awarding_points">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Awarding Points"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Row>
                      <Col md="6">
                          <Field name="message_editable">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <Label>Award Message Editable</Label>
                                <Switch
                                  isOn={value}
                                  handleToggle={() => setValue(!value)}>
                                </Switch>
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Col md="12">
                        <Field name="award_message">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Award Message"
                                type="textarea"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  
                  <div className='d-flex justify-content-end'>
                    <Button  color='danger' type='submit'>Add New Event</Button>
                  </div>
                </form>
              )}
            </Form>
          </Col>
        
        </div>
      <div className='popup__top'>
        {/* <Button close onClick={onCancelHandler}/> */}
        <CloseIcon onClick={onCancelHandler} size={30}/>
      </div>
    </div>
)}

export default AddGoalPopup;
