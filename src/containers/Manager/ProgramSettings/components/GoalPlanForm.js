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
    //onChangeAwardValue, 
    //handleChange,
    goalPlanTypes,
    expirationRules,
    loading,
    btnLabel = 'Save',
    goalplan = {},
    value,
    program
}) => {
  /*const handleChange = (value,input) => {
  }*/
    return(
    <Form
            onSubmit={onSubmit}
            //validate={(values) => formValidation.validateForm(values)}
            //  mutators={{
            //  handleChange
            // }}
            initialValues={goalplan
            }
        >
            {({ handleSubmit, form, submitting, pristine, values }) => {
             //console.log(values)
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
                                 // onChange={(e) =>handleChange(input,value)}
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                         
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Field 
                              name="goal_plan_type_id"
                              className="react-select"
                              options={goalPlanTypes}
                              placeholder={'Select Goal Plan Type'}
                              component={renderSelectField}/>
                      </Col>
                      <Col md="5">
                          <Field 
                            name="automatic_progress"
                            className="react-select"
                            options={[{ value: '1', label: 'Yes' },
                            { value: '0', label: 'No' }]}
                            placeholder={'Accrue Progress Automatically'}
                            component={renderSelectField}/>
                      </Col>
                      <Col md="3">
                          <Field name="date_begin">
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
                    </Row>
                    { values.hasOwnProperty('automatic_progress') && values.automatic_progress.value ==  "1" 
                          &&
                    <Row>
                      <Col md="6">
                        <Field name="automatic_frequency">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                value={value}
                                //onChange={(e) =>handleChange(input,value)}
                                options={[{ value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' },
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'annually', label: 'Annually' }]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Automatic Goal Frequency'}
                                classNamePrefix="react-select"
                                label="Automatic Goal Frequency"
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
                    }
                    <Row>
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
                      
                    </Row>
                    { values.hasOwnProperty('goal_plan_type_id') && values.goal_plan_type_id.value ==  "1" 
                          &&
                    <Row>
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
                    </Row>
                  }
                    <Row>
                      <Col md="6">
                        <Field 
                            name="expiration_rule_id"
                            className="react-select"
                            options={expirationRules}
                            placeholder={'Goal Plan Expiration Rule'}
                            component={renderSelectField}
                    />
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
                    { //Specifield expiration date
                    values.hasOwnProperty('expiration_rule_id') && values.expiration_rule_id.value ==  "6" 
                     &&
                     <Row>
                        <Col md="12">
                          <Field name="date_end">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Specified Expiration"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
                        )}
                          </Field>
                        </Col>
                      </Row> 
                    }
                    { //Annual expiration date
                    values.hasOwnProperty('expiration_rule_id') && values.expiration_rule_id.value ==  "5" 
                     &&
                    <Row> 
                      <Col md="6">
                        <Field 
                            name="annual_expire_month"
                            className="react-select"
                            options={[{ value: 1, label: 'January' },
                            { value: 2, label: 'February' },
                            { value: 3, label: 'March' },
                            { value: 4, label: 'April' },
                            { value: 5, label: 'May'}, 
                            { value: 6, label: 'June' },
                            { value: 7, label: 'July' },
                            { value: 8, label: 'August' },
                            { value: 9, label: 'September' },
                            { value: 10, label: 'October' },
                            { value: 11, label: 'November' },
                            { value: 12, label: 'December' }]}
                            placeholder={'Goal Plan Annual Expiration Month'}
                            component={renderSelectField}/>
                      </Col>
                      <Col md="6">
                        <Field 
                            name="annual_expire_day"
                            className="react-select"
                            options={[
                              { value: 1, label: 1 },
                              { value: 5, label: 5 },
                              { value: 10, label: 10 },
                              { value: 15, label: 15 },
                              { value: 20, label: 20 },
                              { value: 25, label: 25 }]}
                            placeholder={'Goal Plan Annual Expiration Day'}
                            component={renderSelectField}/>
                      </Col>
                    </Row> 
                    }
                    { values.hasOwnProperty('expiration_rule_id') && values.expiration_rule_id.value ==  "4" 
                     &&
                    <Row> 
                        <Col md="6">
                          <Field name="custom_expire_offset">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Custom Expiration - Expires after"
                                  type="number"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                        </Col>
                        <Col md="6">
                          <Field 
                                name="custom_expire_units"
                                className="react-select"
                                options={[{ value: 'months', label: 'Months' },
                                { value: 'days', label: 'Days' },
                                { value: 'years', label: 'Years' }]}
                                placeholder={'Goal Plan Custom Expiration'}
                                component={renderSelectField}/>
                        </Col>
                      </Row>
                      }
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
                                  isOn={true}
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
                )}}
              </Form>  
    )
}

export default GoalPlanForm;