import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import {Modal, Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import Switch from '@/shared/components/form/Switch';
import TemplateButton from "@/shared/components/TemplateButton"

const AddGoalPlanImg = `/img/pages/addGoalPlan.png`;

const AddGoalPlanPopup = ({program, organization, isOpen, setOpen, toggle, data}) => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
          <div className='close cursor-pointer'>
            <CloseIcon onClick={toggle} size={30}/>
          </div>
          <div className="left">
            <div className='title mb-5'>
              <h3>Add New Goal Plan</h3>
              {/*<span>*/}
              {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.*/}
              {/*</span>*/}
            </div>
            <img src={AddGoalPlanImg}/>
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
                        <Field name="name">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Name"
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
                        <Field name="type">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Type'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="accrue_progress">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Accrue Progress Automatically"
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
                        <Field name="start_date">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Start Date:"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="default_target">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Default Target"
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
                        <Field name="measurement_label">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Measurement Label"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="achieved_factor">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Achieved Factor"
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
                        <Field name="exceeded_factor">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Exceeded Factor"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="expiration_rule">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Goal Plan Expiration Rule'}
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
                        <Field name="achieved_event">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Goal Plan Achieved Event'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="6">
                        <Field name="exceeded_event">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Goal Plan Exceeded Event'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row className='align-items-baseline'>
                    <Col md="10">
                        <Field name="email_template">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Goal Plan Progress Email Template'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                    <Col md="2">
                        <Link to={''}> Preview</Link>
                    </Col>
                  </Row>

                    <Row>
                      <Col md="12">
                        <Field name="recurring">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <Label>Recurring:</Label>
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
                      <Col md="12">
                        <Field name="per_goal_item">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <div className='d-flex flex-column' style={{width: '90%'}}>
                                  <Label>Award Per Goal Progress Item:</Label>
                                  <small>(If turned on, when a goal is met 1 award will be given for each goal progress item)</small>
                                </div>
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
                      <Col md="12">
                        <Field name="award_email">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <div className='d-flex flex-column' style={{width: '90%'}}>
                                  <Label>Award Email Per Award:</Label>
                                  <small>(If turned off, when a goal is met only 1 award email will be sent regardless of the number of awards generated)</small>
                                </div>                                
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
                      <Col md="12">
                        <Field name="require_unique_ref_num">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <Label>Goal Progress Items Require Unique Reference Number:</Label>
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
                      <Col md="12">
                        <Field name="assign_to_all">
                          {({ input, meta }) => (
                              <FormGroup className='d-flex justify-content-between'>
                                <Label>Assign Goal To All Participants By Default</Label>
                                <Switch
                                  isOn={value}
                                  handleToggle={() => setValue(!value)}>
                                </Switch>
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                  <div className='d-flex justify-content-end'>
                    <TemplateButton type='submit' text='Save Goal Plan' />
                  </div>
                </form>
              )}
            </Form>
          </div>      
    </Modal>
)}

export default AddGoalPlanPopup;
