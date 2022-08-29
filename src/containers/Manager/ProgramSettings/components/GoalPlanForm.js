import { Input, Col, Row, FormGroup, Label, Button, FormFeedback} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import {patch4Select} from '@/shared/helper'
import { Link } from 'react-router-dom';
import Switch from '@/shared/components/form/Switch';
import Select from 'react-select';
import renderSelectField from '@/shared/components/form/Select';
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import formValidation from "@/validation/addGoalPlan";
import DatePickerField from '@/shared/components/form/DatePicker';
const current = new Date();
const automaticProgressOptions = [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }];

const monthsOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May'}, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }];

const daysOptions =[{ value: 1, label: 1 }, { value: 5, label: 5 }, { value: 10, label: 10 }, { value: 15, label: 15 }, { value: 20, label: 20 }, { value: 25, label: 25 }];

const customUnitsOptions = [{ value: 'months', label: 'Months' },{ value: 'days', label: 'Days' }, { value: 'years', label: 'Years' }];


const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
console.log(date);
const GoalPlanForm = ({
    onSubmit,
    //handleChange,
    goalPlanTypes,
    expirationRules,
    events,
    loading,
    btnLabel = 'Save',
    //goalplan = {},
    goalplan = {'is_recurring':1,'default_target':0,'goal_measurement_label':'$','goal_plan_type_id':1, 'automatic_progress':0,'date_begin':date},
    //{'is_recurring':1,'goal_plan_type_id':1},'date_begin':date
    //'award_per_progress':1
    value,
    program
}) => {
      if( goalplan ) {
        if(goalplan.goal_plan_type_id)
        goalplan = patch4Select(goalplan, 'goal_plan_type_id', goalPlanTypes)
        if(goalplan.automatic_progress)
        goalplan = patch4Select(goalplan, 'automatic_progress', automaticProgressOptions)
        if(goalplan.expiration_rule_id)
        goalplan = patch4Select(goalplan, 'expiration_rule_id', expirationRules)
        if(goalplan.annual_expire_month)
        goalplan = patch4Select(goalplan, 'annual_expire_month', monthsOptions)
        if(goalplan.annual_expire_day)
        goalplan = patch4Select(goalplan, 'annual_expire_day', daysOptions)
        if(goalplan.custom_expire_units)
        goalplan = patch4Select(goalplan, 'custom_expire_units', customUnitsOptions)
        if(goalplan.exceeded_event_id)
        goalplan = patch4Select(goalplan, 'exceeded_event_id', events)
        if(goalplan.achieved_event_id)
        goalplan = patch4Select(goalplan, 'achieved_event_id', events)
      }
      const validate = values => {
      let required_field_msg =  "This field is required";
      let errors = {};
      if (!values.name) 
      errors.name = required_field_msg;

      if (!values.goal_plan_type_id) {
      errors.goal_plan_type_id = required_field_msg;
      } else if (values.goal_plan_type_id.value ==  "1") {
          if (!values.exceeded_event_id) 
          errors.exceeded_event_id = required_field_msg;

          if (!values.factor_before) 
          errors.factor_before = required_field_msg;
      }

      if (!values.hasOwnProperty('default_target')) 
      errors.default_target = required_field_msg;

      if (!values.achieved_event_id) 
      errors.achieved_event_id = required_field_msg;

      if (!values.automatic_progress) {
      errors.automatic_progress = required_field_msg;

      } else if (values.automatic_progress.value ==  "1") {
          if (!values.automatic_frequency) 
          errors.automatic_frequency = required_field_msg; 
      }

      if (!values.goal_measurement_label) 
      errors.goal_measurement_label = required_field_msg;

      if (!values.expiration_rule_id) {
        errors.expiration_rule_id = required_field_msg;

      } else if (values.expiration_rule_id.value == "6")  {

        if (!values.date_end)
          errors.date_end = required_field_msg;

      } else if (values.expiration_rule_id.value == "5")  {

        if (!values.annual_expire_month)
          errors.annual_expire_month = required_field_msg; 

          if (!values.annual_expire_day)
            errors.annual_expire_day = required_field_msg;

      } else if (values.expiration_rule_id.value == "4")  {

        if (!values.custom_expire_offset)
          errors.custom_expire_offset = required_field_msg;

        if (!values.custom_expire_units)
            errors.custom_expire_units = required_field_msg
      }
      
      return errors;
    }


    /*const onChangeGoalType = ([field,value], state, { setIn, changeValue }) => {
     console.log(field);
      console.log(value);
      console.log(state);
      if(value[0] === 'goal_plan_type_id')
      {
        const field = state.fields["award_per_progress"];
        if(value[1].value == 1 || value[1].value == 4)
          field.change(1);
        else 
          field.change(0);
      }
    }*/
    return(
    <Form
            onSubmit={onSubmit}
            validate={validate}
            //validate={(values) => formValidation.validateForm(values)}
            /*mutators={{
              onChangeGoalType
              }}*/
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
                                  placeholder="Goal Plan Name*"
                                  type="text"
                                 // onChange={(e) =>handleChange(input,value)}
                                  {...input}
                                />
                                   {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                                    {/*meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>*/}
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
                              placeholder={'Select Goal Plan Type*'}
                              /*parse={value => {
                                  form.mutators.onChangeGoalType(['goal_plan_type_id',value]);
                                  return value;
                              }}*/
                             // parse={form.mutators.onChangeGoalType} ['goal_plan_type_id',1]
                              component={renderSelectField}/>
                      </Col>
                      <Col md="5">
                          <Field 
                            name="automatic_progress"
                            className="react-select"
                            options={automaticProgressOptions}
                           //defaultValue='0'
                            placeholder={'Accrue Progress Automatically*'}
                            component={renderSelectField}/>
                      </Col>
                      <Col md="3">
                     {/* <FormGroup>
                                <Label  className="form-label"> From </Label>
                                <DatePickerField  name='date_begin' onChange = {() =>{}} />
                            </FormGroup> */}
                        {/* dateFormat="yyyy-mm-dd" selected= {date} */}
                        <Field name="date_begin">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Goal Plan Start Date*"
                                  type="date"
                                  {...input}
                                />
                                {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    { values.hasOwnProperty('automatic_progress') && values.automatic_progress.value ==  "1" 
                          &&
                    <Row>
                      <Col md="6">
                       
                        <Field 
                            name="automatic_frequency"
                            className="react-select"
                            //value={value}
                            options={[{ value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' },
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'annually', label: 'Annually' }]}
                           placeholder={'Automatic Goal Frequency*'}
                           //label="Automatic Goal Frequency"
                          component={renderSelectField}/>
                      </Col>
                      <Col md="6">
                        <Field name="automatic_value">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Amount of Progress To Assign*"
                                type="number"
                                {...input}
                              />
                                  {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
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
                                placeholder="Default Target*"
                                type="number"
                              
                                {...input}
                              />
                                  {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                      </Col>
                      <Col md="6">
                        <Field name="goal_measurement_label">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Measurement Label*"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                      </Col>
                      
                    </Row>
                    { values.hasOwnProperty('goal_plan_type_id') && values.goal_plan_type_id.value ==  "1" 
                          && //1 is for sales goal type
                    <Row>
                      <Col md="6">
                        <Field name="factor_before">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Goal Plan Achieved Factor*"
                                type="text"
                                {...input}
                              />
                                 {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                        </Col>
                        <Col md="6">
                            <Field name="factor_after">
                            {({ input, meta }) => (
                                <FormGroup>
                                  <Input
                                    placeholder="Goal Plan Exceeded Factor*"
                                    type="text"
                                    {...input}
                                  />
                                      {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
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
                            placeholder={'Goal Plan Expiration Rule*'}
                            component={renderSelectField}
                    />
                      </Col> 
                      { values.hasOwnProperty('goal_plan_type_id') && values.goal_plan_type_id.value ==  "1" 
                          && //1 is for sales goal type
                      <Col md="6">
                        <Field 
                              name="exceeded_event_id"
                              className="react-select"
                              options={events}
                              placeholder={'Goal Plan Exceeded Event*'}
                              component={renderSelectField}/>
                      </Col>
                    }
                    </Row> 
                    { //Specifield expiration date
                    values.hasOwnProperty('expiration_rule_id') && values.expiration_rule_id.value ==  "6" 
                     &&
                     <Row>
                        <Col md="12"> 
                          <Field name="date_end">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input //by default set default to +1 year from begin date (pending here)
                                placeholder="Goal Plan Specified Expiration*"
                                type="date"
                                {...input}
                              />
                                  {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
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
                            options={monthsOptions}
                            placeholder={'Goal Plan Annual Expiration Month*'}
                            component={renderSelectField}/>
                      </Col>
                      <Col md="6">
                        <Field 
                            name="annual_expire_day"
                            className="react-select"
                            options={daysOptions}
                            placeholder={'Goal Plan Annual Expiration Day*'}
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
                                  placeholder="Goal Plan Custom Expiration - Expires after*"
                                  type="number"
                                  {...input}
                                />
                                  {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                              </FormGroup>
                          )}
                          </Field>
                        </Col>
                        <Col md="6">
                          <Field 
                                name="custom_expire_units"
                                className="react-select"
                                options={customUnitsOptions}
                                placeholder={'Goal Plan Custom Expiration*'}
                                component={renderSelectField}/>
                        </Col>
                      </Row>
                      }
                      <Row>
                      <Col md="6">
                      <Field 
                              name="achieved_event_id"
                              className="react-select"
                              options={events}
                              placeholder={'Goal Plan Achieved Event*'}
                              component={renderSelectField}/>
                      </Col>
                      
                    </Row>
                    <Row className='align-items-baseline'>
                      <Col md="10">
                      <Field 
                          name="progress_email_template_id"
                          className="react-select"
                          //options={}
                           placeholder={'Goal Plan Progress Email Template*'}
                           component={renderSelectField}/>
                      </Col>
                      <Col md="2">
                          <Link to={''}> Preview</Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                      <FormGroup className='d-flex justify-content-between'>
                        <Label>Recurring:</Label>
                        <Field
                            name="is_recurring"
                            //enable="1"
                            component={renderToggleButtonField}
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="12">
                      <FormGroup className='d-flex justify-content-between'>
                        <Label>Award Per Goal Progress Item:</Label>
                        <small>(If turned on, when a goal is met 1 award will be given for each goal progress item)</small>
                       
                          <Field
                                  name="award_per_progress"
                                  //enable="1"
                                  component={renderToggleButtonField}
                              />
                        
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup className='d-flex justify-content-between'>
                          <Label>Award Email Per Award:</Label>
                          <small>(If turned off, when a goal is met only 1 award email will be sent regardless of the number of awards generated)</small>
                         
                            <Field
                                  name="award_email_per_progress"
                                    //enable="1"
                                  component={renderToggleButtonField}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup className='d-flex justify-content-between'>
                          <Label>Goal Progress Items Require Unique Reference Number:</Label>
                            <Field
                                  name="progress_requires_unique_ref_num"
                                    //enable="1"
                                  component={renderToggleButtonField}
                            />
                          </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup className='d-flex justify-content-between'>
                          <Label>Assign Goal To All Participants By Default</Label>
                            <Field
                                  name="assign_goal_all_participants_default"
                                    //enable="1"
                                    //disabled={1}
                                  component={renderToggleButtonField}
                            />
                          </FormGroup>
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