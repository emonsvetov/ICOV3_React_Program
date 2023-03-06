import {
    Input,
    Col,
    Row,
    FormGroup,
    Label,
    Button,
} from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useEffect, useState } from "react";
import { labelizeNamedData, patch4Select } from "@/shared/helpers";
import axios from "axios";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import renderSelectField from "@/shared/components/form/Select";
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import { getGoalPlanTypes } from "@/services/getGoalPlanTypes";
import { getExpirationRules } from "@/services/getExpirationRules";
import { getEvents } from "@/services/getEvents";
import EventField from "./EventField";
const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
const automaticProgressOptions = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
];

const monthsOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const daysOptions = [
    { value: 1, label: 1 },
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
    { value: 25, label: 25 },
];

const customUnitsOptions = [
    { value: "months", label: "Months" },
    { value: "days", label: "Days" },
    { value: "years", label: "Years" },
];

const automaticFrequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
];
//console.log(date);
const GoalPlanForm = ({
    program,
    goalplan,
    setOpen
}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [events, setEvents] = useState([]);
    const [goalPlanTypes, setGoalPlanTypes] = useState([]);
    const [expirationRules, setExpirationRules] = useState([]);

    useEffect(() => {
        getGoalPlanTypes().then((gptypes) => {
            setGoalPlanTypes(labelizeNamedData(gptypes));
        });
        getExpirationRules().then((ertypes) => {
            setExpirationRules(labelizeNamedData(ertypes));
        });
        getEvents(program.organization_id, program.id)
        .then(items => {
            setEvents(labelizeNamedData(items))
        })
    }, []);

    if (goalplan?.id) {
        // if (goalPlanTypeId) {
        //     goalplan.goal_plan_type_id = goalPlanTypeId
        //     console.log("Setting goalplan.goal_plan_type_id")
        // }
        if (goalplan.goal_plan_type_id)
        {
            goalplan = patch4Select(goalplan, "goal_plan_type_id", goalPlanTypes);
        }
            
        if (goalplan.automatic_progress !== null) {
            goalplan = patch4Select(
                goalplan,
                "automatic_progress",
                automaticProgressOptions
            );
        }
        if (goalplan.expiration_rule_id)
            goalplan = patch4Select(goalplan, "expiration_rule_id", expirationRules);
        if (goalplan.annual_expire_month)
            goalplan = patch4Select(goalplan, "annual_expire_month", monthsOptions);
        if (goalplan.annual_expire_day)
            goalplan = patch4Select(goalplan, "annual_expire_day", daysOptions);
        if (goalplan.custom_expire_units) {
            goalplan = patch4Select(
                goalplan,
                "custom_expire_units",
                customUnitsOptions
            );
        }
        if (goalplan.exceeded_event_id)
            goalplan = patch4Select(goalplan, "exceeded_event_id", events);
        if (goalplan.achieved_event_id)
            goalplan = patch4Select(goalplan, "achieved_event_id", events);
        if (goalplan.automatic_frequency) {
            goalplan = patch4Select(
                goalplan,
                "automatic_frequency",
                automaticFrequencyOptions
            );
        }
        // console.log(goalplan.exceeded_event_id)
        console.log(goalplan.automatic_progress)
    }  else {
        goalplan = {
            is_recurring: 1,
            default_target: 0,
            goal_measurement_label: "$",
            goal_plan_type_id: {label: 'Sales Goal', value: '1'},
            automatic_progress: 0,
            date_begin: date,
        }
        // console.log(goalplan)
    }

    const confirmAssignAllParticipant = (value) => {
        if (value == true) {
            if (
                window.confirm(
                    "After saving, would you like to assign this goal to all existing eligible participants?"
                )
            ) {
                // setValue(values.assign_goal_all_participants_now, '1');
                //values.assign_goal_all_participants_now=true;
                return true;
            } else {
                return false;
            }
        }
        //values.assign_goal_all_participants_now.value=1;
        //return false;
    };

    const onSubmitEdit = (values) => {
        let goalPlanData = {};
        goalPlanData["organization_id"] = program.organization_id;
        goalPlanData["program_id"] = program.id;
        console.log("submit");
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
          is_recurring,
          award_per_progress,
          award_email_per_progress,
          progress_requires_unique_ref_num,
          created_by,
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
        goalPlanData.automatic_value = automatic_value
        ? automatic_value
        : null;
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
        goalPlanData.is_recurring = is_recurring;
        goalPlanData.award_per_progress = award_per_progress;
        goalPlanData.award_email_per_progress = award_email_per_progress;
        goalPlanData.progress_requires_unique_ref_num =
          progress_requires_unique_ref_num;
        goalPlanData.assign_goal_all_participants_default =
          assign_goal_all_participants_default;
        goalPlanData.created_by = created_by;
    
        //penidng fiels (for testing only
        goalPlanData.state_type_id = 1;
        goalPlanData.program_id = program.id;
        goalPlanData.progress_notification_email_id = progress_notification_email_id
          ? progress_notification_email_id.value
          : null;
        //goalPlanData.created_by = 1;
        setLoading(true);
        axios
          .put(
            `/organization/${program.organization_id}/program/${program.id}/goalplan/${goalplan.id}`,
            goalPlanData
          )
          .then((res) => {
            //   console.log(res)
            if (res.status == 200) {
              let msg = "Goal Plan updated successfully!"
              if (res.data.assign_msg)
              {
                msg += " " + res.data.assign_msg
              }
              dispatch(sendFlashMessage(msg));
              setLoading(false);
              setOpen(false);
              window.location.reload()
              
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
          });
    };

    const onSubmitAdd = (values) => {
        let goalPlanData = {};
        goalPlanData["organization_id"] = program.organization_id;
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
        console.log(goalPlanData);
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

        goalPlanData.automatic_value = automatic_value ? 
        automatic_value
        : null;
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
        // setGoalPlan(goalPlanData);
        //return;
        console.log(goalPlanData);
        setLoading(true);
        axios
          .post(
            `/organization/${program.organization_id}/program/${program.id}/goalplan`,
            goalPlanData
          )
          .then((res) => {
            //console.log(res)
            if (res.status == 200) {
                let msg = "Goal Plan created successfully!"
                if (res.data.assign_msg)
                {
                  msg += " " + res.data.assign_msg
                }
                window.location.reload()
                dispatch(sendFlashMessage(msg));
                setLoading(false);
                setOpen(false);
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

    return (
        <Form
        keepDirtyOnReinitialize 
            onSubmit={goalplan?.id ? onSubmitEdit : onSubmitAdd}
            validate={validate}
            initialValues={goalplan}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => {
                //console.log(values)
                return (
                    <form
                        className="form d-flex flex-column justify-content-evenly"
                        onSubmit={handleSubmit}
                    >
                        <Row>
                            <Col md="4">
                                {!goalplan?.id && <label className="form-label">Select Goal Plan Type*:</label>}
                                
                                {goalplan?.goal_plan_type?.name && (
                                    <p>Goal Plan Type:<br/> {goalplan.goal_plan_type.name}</p>
                                )}
                                    
                                {!goalplan?.id && <Field
                                    name="goal_plan_type_id"
                                    className="react-select"
                                    options={goalPlanTypes}
                                    placeholder={"-- select --"}
                                    component={renderSelectField}
                                />}
                            </Col>
                                
                            <Col md="8">
                                <label className="form-label">Goal Plan Name*</label>
                                <Field name="name">
                                    {({ input, meta }) => (
                                        <FormGroup>
                                            <Input
                                                placeholder="Goal Plan Name*"
                                                type="text"
                                                // onChange={(e) =>handleChange(input,value)}
                                                {...input}
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="form-error">{meta.error}</span>
                                            )}
                                            {/*meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>*/}
                                        </FormGroup>
                                    )}
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <p><strong>Goal Plan Expiration</strong></p>
                            <Col md="12">
                                <Row>
                                    {!goalplan.id && (
                                        <Col md="6">
                                            <label className="form-label">
                                                Goal Plan Expiration Rule*
                                            </label>
                                            <Field
                                                name="expiration_rule_id"
                                                className="react-select"
                                                options={expirationRules}
                                                placeholder={"-- select --"}
                                                component={renderSelectField}
                                            />
                                        </Col>
                                    )}
                                    <Col md="6">
                                        <Field name="date_begin">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <label className="form-label">Start Date</label>
                                                    <Input placeholder="Start" type="date" {...input} />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                    {goalplan?.id && (
                                        <Col md="6">
                                            <Field name="date_end">
                                                {({ input, meta }) => (
                                                    <FormGroup>
                                                        <label className="form-label">End Date</label>
                                                        <Input placeholder="End" type="date" {...input} />
                                                        {meta.touched && meta.error && (
                                                            <span className="form-error">{meta.error}</span>
                                                        )}
                                                    </FormGroup>
                                                )}
                                            </Field>
                                        </Col>
                                    )}
                                </Row>
                                {values.hasOwnProperty("expiration_rule_id") && values.expiration_rule_id.value == "4" && (
                                <Row>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Custom Expiration - Expires after*
                                        </label>
                                        <Field name="custom_expire_offset">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <Input
                                                        placeholder="1,2,3 etc."
                                                        type="number"
                                                        {...input}
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Custom Expiration*
                                        </label>
                                        <Field
                                            name="custom_expire_units"
                                            className="react-select"
                                            options={customUnitsOptions}
                                            placeholder={"day/month/year "}
                                            component={renderSelectField}
                                        />
                                    </Col>
                                </Row>
                                )}
                                                        {
                                //Annual expiration date
                                values.hasOwnProperty("expiration_rule_id") &&
                                values.expiration_rule_id.value == "5" && (
                                <Row>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Annual Expiration Month*
                                        </label>
                                        <Field
                                            name="annual_expire_month"
                                            className="react-select"
                                            options={monthsOptions}
                                            placeholder={"-- select --"}
                                            component={renderSelectField}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Annual Expiration Day*
                                        </label>
                                        <Field
                                            name="annual_expire_day"
                                            className="react-select"
                                            options={daysOptions}
                                            placeholder={"-- select --"}
                                            component={renderSelectField}
                                        />
                                    </Col>
                                </Row>
                                )}
                            {
                            //Specifield expiration date
                            values.hasOwnProperty("expiration_rule_id") &&
                            values.expiration_rule_id.value == "6" && (
                                <Row>
                                    <Col md="12">
                                        <label className="form-label">
                                            Goal Plan Specified Expiration*
                                        </label>
                                        <Field name="date_end">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <Input //by default set default to +1 year from begin date (pending here)
                                                        placeholder="Goal Plan Specified Expiration*"
                                                        type="date"
                                                        {...input}
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                </Row>
                            )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <label className="form-label">
                                    Accrue Progress Automatically*
                                </label>
                                <Field
                                    name="automatic_progress"
                                    className="react-select"
                                    options={automaticProgressOptions}
                                    placeholder={"-- select --"}
                                    component={renderSelectField}
                                />
                            </Col>
                        </Row>
                        {values.hasOwnProperty("automatic_progress") &&
                            values.automatic_progress.value == "1" && (
                                <Row>
                                    <Col md="6">
                                        <label className="form-label">
                                            Automatic Goal Frequency*
                                        </label>
                                        <Field
                                            name="automatic_frequency"
                                            className="react-select"
                                            //value={value}
                                            options={automaticFrequencyOptions}
                                            placeholder={"-- select --"}
                                            //label="Automatic Goal Frequency"
                                            component={renderSelectField}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <label className="form-label">
                                            Amount of Progress To Assign*
                                        </label>
                                        <Field name="automatic_value">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <Input
                                                        placeholder="Amount of Progress To Assign*"
                                                        type="number"
                                                        {...input}
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                </Row>
                            )}
                        <Row>
                            <Col md="6">
                                <label className="form-label">Default Target*</label>
                                <Field name="default_target">
                                    {({ input, meta }) => (
                                        <FormGroup>
                                            <Input
                                                placeholder="Default Target*"
                                                type="number"
                                                {...input}
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="form-error">{meta.error}</span>
                                            )}
                                        </FormGroup>
                                    )}
                                </Field>
                            </Col>
                            <Col md="6">
                                <label className="form-label">Measurement Label*</label>
                                <Field name="goal_measurement_label">
                                    {({ input, meta }) => (
                                        <FormGroup>
                                            <Input
                                                placeholder="Measurement Label*"
                                                type="text"
                                                {...input}
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="form-error">{meta.error}</span>
                                            )}
                                        </FormGroup>
                                    )}
                                </Field>
                            </Col>
                        </Row>
                        {values.hasOwnProperty("goal_plan_type_id") &&
                            values.goal_plan_type_id.label == "Sales Goal" && (
                                <Row>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Achieved Factor*
                                        </label>
                                        <Field name="factor_before">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <Input
                                                        placeholder=" enter a number "
                                                        type="number"
                                                        {...input}
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                    <Col md="6">
                                        <label className="form-label">
                                            Goal Plan Exceeded Factor*
                                        </label>
                                        <Field name="factor_after">
                                            {({ input, meta }) => (
                                                <FormGroup>
                                                    <Input
                                                        placeholder=" enter a number "
                                                        type="text"
                                                        {...input}
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <span className="form-error">{meta.error}</span>
                                                    )}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </Col>
                                </Row>
                            )}
                        <Row>
                            {values.hasOwnProperty("goal_plan_type_id") &&
                            values.goal_plan_type_id.label == "Sales Goal" && (
                                <Col md="6">
                                    <label className="form-label">
                                        Goal Plan Exceeded Event*
                                    </label>
                                    <EventField name="exceeded_event_id" placeholder={"-- choose event --"} goalPlanType={values.goal_plan_type_id} program={program} defaultValue={values.exceeded_event_id} />
                                </Col>
                            )}
                        </Row>
                        <Row>
                            <Col md="6">
                                <label className="form-label">Goal Plan Achieved Event*</label>
                                <EventField name="achieved_event_id" placeholder={"-- choose event --"} goalPlanType={values.goal_plan_type_id} program={program} values={values} defaultValue={values.achieved_event_id} />
                                {/* <Field
                                    name="achieved_event_id"
                                    className="react-select"
                                    options={events}
                                    placeholder={"Goal Plan Achieved Event*"}
                                    component={renderSelectField}
                                /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup className="d-flex justify-content-between">
                                    <label className="form-label">Recurring:</label>
                                    <Label></Label>
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
                                <FormGroup className="d-flex justify-content-between">
                                    <label className="form-label">
                                        Award Per Goal Progress Item:
                                    </label>
                                    <small>
                                        (If turned on, when a goal is met 1 award will be given for
                                        each goal progress item)
                                    </small>

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
                                <FormGroup className="d-flex justify-content-between">
                                    <Label className="form-label">Award Email Per Award:</Label>
                                    <small>
                                        (If turned off, when a goal is met only 1 award email will
                                        be sent regardless of the number of awards generated)
                                    </small>

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
                                <FormGroup className="d-flex justify-content-between">
                                    <Label className="form-label">
                                        Goal Progress Items Require Unique Reference Number:
                                    </Label>
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
                                <FormGroup className="d-flex justify-content-between">
                                    <Label className="form-label">
                                        Assign Goal To All Participants By Default
                                    </Label>
                                    <Field
                                        name="assign_goal_all_participants_default"
                                        //enable="1"
                                        //disabled={1}
                                        component={renderToggleButtonField}
                                        parse={(value) => {
                                            return confirmAssignAllParticipant(value);
                                            //return value;
                                            //handleToggle("featured", value, row.original.id);
                                            //return value;
                                        }}

                                    //  onChange={(e) => confirmAssignAllParticipant(e)}
                                    />
                                    <input
                                        name="assign_goal_all_participants_now"
                                        type="hidden"
                                        value="0"
                                    />

                                    {/* <Field field="assign_goal_all_participants_now" value="hiddenFieldName" type="hidden" /> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Button color="danger" type="submit" disabled={saving}>
                                Save Goal Plan
                            </Button>
                        </div>
                    </form>
                );
            }}
        </Form>
    );
};

const validate = (values) => {
   /* let required_field_msg = "This field is required";
    let errors = {};
    if (!values.name) errors.name = required_field_msg;

    if (!values.goal_plan_type_id) {
        errors.goal_plan_type_id = required_field_msg;
    } else if (values.goal_plan_type_id.label == "Sales Goal") {
        if (!values.exceeded_event_id)
            errors.exceeded_event_id = required_field_msg;

        if (!values.factor_before) errors.factor_before = required_field_msg;
    }

    if (!values.hasOwnProperty("default_target"))
        errors.default_target = required_field_msg;

    if (!values.achieved_event_id)
        errors.achieved_event_id = required_field_msg;

    if (!values.automatic_progress) {
        errors.automatic_progress = required_field_msg;
    } else if (values.automatic_progress.value == "1") {
        if (!values.automatic_frequency)
            errors.automatic_frequency = required_field_msg;
    }

    if (!values.goal_measurement_label)
        errors.goal_measurement_label = required_field_msg;

    if (!values.expiration_rule_id) {
        errors.expiration_rule_id = required_field_msg;
    } else if (values.expiration_rule_id.value == "6") {
        if (!values.date_end) errors.date_end = required_field_msg;
    } else if (values.expiration_rule_id.value == "5") {
        if (!values.annual_expire_month)
            errors.annual_expire_month = required_field_msg;

        if (!values.annual_expire_day)
            errors.annual_expire_day = required_field_msg;
    } else if (values.expiration_rule_id.value == "4") {
        if (!values.custom_expire_offset)
            errors.custom_expire_offset = required_field_msg;

        if (!values.custom_expire_units)
            errors.custom_expire_units = required_field_msg;
    }

    return errors;*/
};

export default GoalPlanForm;
