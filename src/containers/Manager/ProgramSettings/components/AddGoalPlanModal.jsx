import React, { useState, useEffect } from "react";
//import Select from 'react-select';
//import { Link } from 'react-router-dom';
import axios from "axios";
import { Modal } from "reactstrap";
//import { Form, Field } from 'react-final-form';
import CloseIcon from "mdi-react/CloseIcon";
//import Switch from '@/shared/components/form/Switch';
import { getGoalPlanTypes } from "@/services/getGoalPlanTypes";
import { getEvents } from "@/services/getEvents";
import { getProgramEmailTemplates } from "@/services/getProgramEmailTemplates";
import { getExpirationRules } from "@/services/getExpirationRules";
import { labelizeNamedData } from "@/shared/helper";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import GoalPlanForm from "./GoalPlanForm";
import {Img} from '@/theme'
//import Switch from '@/shared/components/form/Switch';
//import TemplateButton from "@/shared/components/TemplateButton"

const AddGoalPlanModal = ({
  program,
  organization,
  isOpen,
  setOpen,
  toggle,
  data,
}) => {
  const [value, setValue] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [goalPlanTypes, setGoalPlanTypes] = useState([]);
  const [expirationRules, setExpirationRules] = useState([]);
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;
  const [events, setEvents] = useState([]);
  const [program_email_templates, setProgramEmailTemplates] = useState([]);
  const [goalplan, setGoalPlan] = useState({
    is_recurring: 1,
    default_target: 0,
    goal_measurement_label: "$",
    goal_plan_type_id: 1,
    automatic_progress: 0,
    date_begin: date,
  });

  //const [fields, setFields] = useState({});
  /* const onSelectGoalPlanType = (selectedOption) => {
     
     //console.log(selectedOption);
     //goalPlanData.award_per_progress=1;
   };*/
  const [goalPlanTypeId, setgoalPlanTypeId] = useState([]);
  const goal_plan_type = '';
  const onChangeGoalType = ([field], state, { setIn, changeValue }) => {
    //console.log(field);
    let event_type = 'standard'
    if (field.label == "Recognition Goal") {//Recognition Goal 
      event_type = 'badge'
    }
    getEvents(organization.id, program.id, event_type).then((evts) => {
      setEvents(labelizeNamedData(evts));
    });
    setgoalPlanTypeId(field.value);
    /*setGoalPlan({
      ...goalplan,
      goal_plan_type_id:
  })*/
  }

  const onSubmit = (values) => {
    let goalPlanData = {};
    goalPlanData["organization_id"] = organization.id;
    goalPlanData["program_id"] = program.id;

    // console.log(values); return;
    let {
      name,
      goal_measurement_label,
      goal_plan_type_id,
      default_target,
      email_template_id,
      achieved_event_id,
      exceeded_event_id,
      automatic_progress,
      automatic_frequency,
      automatic_value,
      expiration_rule_id,
      custom_expire_offset,
      custom_expire_units,
      annual_expire_month,
      annual_expire_day,
      date_begin,
      date_end,
      factor_before,
      factor_after,
      progress_email_template_id,
      is_recurring,
      award_per_progress,
      award_email_per_progress,
      progress_requires_unique_ref_num,
      progress_notification_email_id,
      assign_goal_all_participants_default,
    } = values;

    goalPlanData.name = name;
    goalPlanData.goal_measurement_label = goal_measurement_label;
    goalPlanData.goal_plan_type_id = goal_plan_type_id
      ? goal_plan_type_id.value
      : 1;
    goalPlanData.default_target = default_target;
    goalPlanData.automatic_progress = automatic_progress
      ? automatic_progress.value
      : 0;
    goalPlanData.email_template_id = email_template_id;
    goalPlanData.achieved_event_id = achieved_event_id
      ? achieved_event_id.value
      : null; //pending
    goalPlanData.exceeded_event_id = exceeded_event_id
      ? exceeded_event_id.value
      : null; //pending
    goalPlanData.automatic_frequency = automatic_frequency
      ? automatic_frequency.value
      : null;
    goalPlanData.automatic_value = automatic_value;
    goalPlanData.expiration_rule_id = expiration_rule_id
      ? expiration_rule_id.value
      : 1;
    goalPlanData.custom_expire_offset = custom_expire_offset;
    goalPlanData.custom_expire_units = custom_expire_units
      ? custom_expire_units.value
      : null;
    goalPlanData.annual_expire_month = annual_expire_month
      ? annual_expire_month.value
      : null;
    goalPlanData.annual_expire_day = annual_expire_day
      ? annual_expire_day.value
      : null;
    goalPlanData.date_begin = date_begin;
    goalPlanData.date_end = date_end;
    goalPlanData.factor_before = factor_before;
    goalPlanData.factor_after = factor_after;
    goalPlanData.progress_email_template_id = progress_email_template_id
      ? progress_email_template_id.value
      : null;
    goalPlanData.is_recurring = is_recurring;
    goalPlanData.award_per_progress = award_per_progress;
    goalPlanData.award_email_per_progress = award_email_per_progress;
    goalPlanData.progress_requires_unique_ref_num =
      progress_requires_unique_ref_num;
    goalPlanData.assign_goal_all_participants_default =
      assign_goal_all_participants_default;

    //penidng fiels (for testing only
    //goalPlanData.state_type_id = 1;
    goalPlanData.progress_notification_email_id = progress_notification_email_id
      ? progress_notification_email_id.value
      : null;
    //goalPlanData.progress_notification_email_id = 1; //pending to make it dynamic
    setGoalPlan(goalPlanData);
    //return;
    setLoading(true);
    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/goalplan`,
        goalPlanData
      )
      .then((res) => {
        //console.log(res)
        if (res.status == 200) {
          //console.log(res);
          //window.location.reload()
          if (res.data.assign_msg)
            dispatch(
              sendFlashMessage(
                "Goal Plan added successfully! " + res.data.assign_msg,
                "alert-success",
                "top"
              )
            );
          else
            dispatch(
              sendFlashMessage(
                "Goal Plan added successfully!",
                "alert-success",
                "top"
              )
            );

          setLoading(false);
        }
      })
      .catch((err) => {
        //console.log(error.response.data);
        dispatch(
          sendFlashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setLoading(false);
      });
  };
  useEffect(() => {
    getGoalPlanTypes().then((gptypes) => {
      setGoalPlanTypes(labelizeNamedData(gptypes));
    });

    getExpirationRules().then((ertypes) => {
      setExpirationRules(labelizeNamedData(ertypes));
    });

    getEvents(organization.id, program.id, 'standard').then((evts) => {
      setEvents(labelizeNamedData(evts));
    });

    getProgramEmailTemplates(organization.id, program.id, "Goal Progress").then(
      (evts) => {
        setProgramEmailTemplates(labelizeNamedData(evts));
      }
    );
  }, []);
  let props = {
    btnLabel: "Add New Goal Plan",
    goalPlanTypes,
    expirationRules,
    events,
    goalplan,
    program_email_templates,
    // handleChange,
    loading,
    // onSelectGoalPlanType,
    onChangeGoalType,
    goalPlanTypeId,
    onSubmit,
  };

  //console.log(events);
  return (
    <Modal
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div className="left">
        <div className="title mb-5">
          <h3>Add New Goal Plan</h3>
          <span>
            Add new Goal Plan Here.
          </span>
        </div>
        <Img src="img/pages/addGoalPlan.png" className="add-goalplan" />
      </div>
      <div className="right">
        <GoalPlanForm {...props} />
      </div>
      {/* <Form
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
      </Form> */}
    </Modal>
  );
};

export default AddGoalPlanModal;
