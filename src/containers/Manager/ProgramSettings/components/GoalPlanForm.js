import { Input, Col, Row, FormGroup, Label, Button, FormFeedback} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import Switch from '@/shared/components/form/Switch';
import Select from 'react-select';
import renderSelectField from '@/shared/components/form/Select';
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
//import formValidation from "@/validation/addEvent";

const GoalPlanForm = ({
    onSubmit, 
   // onChangeAwardValue, 
   goalPlanTypes,
    loading,
    btnLabel = 'Save',
    goalplan = {},
    value,
    program
}) => {
   console.log(goalPlanTypes)
   //// if( event?.max_awardable_amount)    {
       // event.awarding_points = program.factor_valuation * event.max_awardable_amount
   // }
    return(
    <Form
            onSubmit={onSubmit}
            //validate={(values) => formValidation.validateForm(values)}
           // mutators={{
           // onChangeAwardValue
          //  }}
            initialValues={goalplan
            }
        >
            {({ handleSubmit, form, submitting, pristine, values }) => {
            return (
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
                      <Field 
                            name="goal_plan_type_id"
                            className="react-select"
                            options={goalPlanTypes}
                            placeholder={'Select Goal Plan Type'}
                            component={renderSelectField}
                    />
                      </Col>
                      <Col md="6">
                          {/*<Field name="automatic_progress">
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
                          </Field>*/}
                           <Field name="automatic_progress">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Select
                                  value={value}
                                  onChange={{}}
                                  options={[{ value: '1', label: 'Yes' },
                                  { value: '0', label: 'No' }]}
                                  clearable={false}
                                  className="react-select"
                                  placeholder={'Accrue Progress Automatically'}
                                  classNamePrefix="react-select"
                                  label="fdgfdgfd"
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                           <Field name="automatic_frequency">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Select
                                  value={value}
                                  onChange={{}}
                                  options={[{ value: 'daily', label: 'Daily' },
                                  { value: 'weekly', label: 'Weekly' },
                                  { value: 'monthly', label: 'Monthly' },
                                  { value: 'annually', label: 'Annually' }]}
                                  clearable={false}
                                  className="react-select"
                                  placeholder={'Automatic Goal Frequency'}
                                  classNamePrefix="react-select"
                                  label="fdgfdgfd"
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                          </Col>
                          <Col md="6">
                          <Field name="automatic_value">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Amount of Progress To Assign"
                                  type="number"
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
                                  type="date"
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
                          <Field name="goal_measurement_label">
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
                          <Field name="factor_before">
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
                          <Field name="factor_after">
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
                    {/*<Row>
                      <Col md="6">
                           <Field name="expire_date">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Annual Expiration Month"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row> /*}
                    {/*<Row>
                      <Col md="6">
                          <Field name="annual_expire_month">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Annual Expiration Month"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                      <Col md="6">
                      <Field name="annual_expire_day">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Annual Expiration Day"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>*/}
                     {/*<Row>
                      <Col md="6">
                          <Field name="custom_expire_offset">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Annual Expiration Month"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                      <Col md="6">
                      <Field name="custom_expire_units">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Annual Expiration Day"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>*/}
                      <Row>
                      <Col md="6">
                          <Field name="achieved_event_id">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Select
                                  value={value}
                                  onChange={{}}
                                 
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
                          <Field name="exceeded_event_id">
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
                          <Field name="progress_email_template_id">
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
                          <Field name="is_recurring">
                            {({ input, meta }) => (
                                <FormGroup className='d-flex justify-content-between'>
                                  <Label>Recurring:</Label>
                                  <Switch
                                    isOn={value}
                                    //handleToggle={() => setValue(!value)}
                                    >
                                  </Switch>
                                </FormGroup>
                            )}
                            </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Field name="award_per_progress">
                            {({ input, meta }) => (
                                <FormGroup className='d-flex justify-content-between'>
                                  <div className='d-flex flex-column' style={{width: '90%'}}>
                                    <Label>Award Per Goal Progress Item:</Label>
                                    <small>(If turned on, when a goal is met 1 award will be given for each goal progress item)</small>
                                  </div>
                                  <Switch
                                    isOn={value}
                                    //</FormGroup>handleToggle={() => setValue(!value)}
                                    >
                                  </Switch>
                                </FormGroup>
                            )}
                            </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Field name="award_email_per_progress">
                            {({ input, meta }) => (
                                <FormGroup className='d-flex justify-content-between'>
                                  <div className='d-flex flex-column' style={{width: '90%'}}>
                                    <Label>Award Email Per Award:</Label>
                                    <small>(If turned off, when a goal is met only 1 award email will be sent regardless of the number of awards generated)</small>
                                  </div>                                
                                  <Switch
                                    isOn={value}
                                   //</FormGroup> handleToggle={() => setValue(!value)}
                                   >
                                  </Switch>
                                </FormGroup>
                            )}
                            </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Field name="progress_requires_unique_ref_num">
                            {({ input, meta }) => (
                                <FormGroup className='d-flex justify-content-between'>
                                  <Label>Goal Progress Items Require Unique Reference Number:</Label>
                                  <Switch
                                    isOn={value}
                                    //</FormGroup>handleToggle={() => setValue(!value)}
                                    >
                                  </Switch>
                                </FormGroup>
                            )}
                            </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Field name="assign_goal_all_participants_default">
                            {({ input, meta }) => (
                                <FormGroup className='d-flex justify-content-between'>
                                  <Label>Assign Goal To All Participants By Default</Label>
                                  <Switch
                                    isOn={value}
                                    //</FormGroup>handleToggle={() => setValue(!value)}
                                    >
                                  </Switch>
                                </FormGroup>
                            )}
                            </Field>
                        </Col>
                      </Row>
                    <div className='d-flex justify-content-end'>
                      <Button  color='danger' type='submit'>Save Goal Plan</Button>
                    </div>
                  </form>
                )}
                            }
              </Form>
              
    )
}

export default GoalPlanForm;