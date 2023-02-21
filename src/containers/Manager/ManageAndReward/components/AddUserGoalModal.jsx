import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  Modal,
  Input,
  Col,
  Row,
  FormGroup,
  Label,
} from "reactstrap";
import { Form, Field } from "react-final-form";
import CloseIcon from "mdi-react/CloseIcon";
import { useTranslation } from "react-i18next";
import {
  labelizeNamedData,
  patch4Select,
  flashDispatch,
  flashMessage,
} from "@/shared/helpers";
import axios from "axios";
import formValidation from "@/validation/addUserGoal";
import TemplateButton from "@/shared/components/TemplateButton";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { getActiveGoalPlansByProgram } from "@/services/program/getActiveGoalPlansByProgram";
import { getGoalPlan } from "@/services/program/getGoalPlan";
import renderSelectField from "@/shared/components/form/Select";

import { Img } from '@/theme'

const AddUserGoalModal = ({
  isOpen,
  setOpen,
  toggle,
  participants,
  program,
  organization,
  auth,
  template,
  theme
}) => {
  const dispatch = flashDispatch();
  const { t } = useTranslation();
  const [goalplans, setGoalPlans] = useState([]);
  const [goalplan, setGoalPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingGoalPlan, setLoadingGoalPlan] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeGoalPlan = ([field], state, { setIn, changeValue }) => {
    console.log(state);
    setLoadingGoalPlan(true);
    getGoalPlan(organization.id, program.id, field.value).then((item) => {
      setGoalPlan(item);
    });
    setLoadingGoalPlan(false);
    changeValue(state, 'target_value', () => goalplan.default_target);
    changeValue(state, 'date_begin', () => goalplan.date_begin);
    changeValue(state, 'date_end', () => goalplan.date_end);
    changeValue(state, 'factor_before', () => goalplan.factor_before);
    changeValue(state, 'factor_after', () => goalplan.factor_after);
    changeValue(state, 'achieved_callback_id', () => goalplan.achieved_callback_id);
    changeValue(state, 'exceeded_callback_id', () => goalplan.exceeded_callback_id);
    /*if (goalplan.goal_plan_type_name == "Sales Goal") {
      setShowFactors(true)
    } else {
      setShowFactors(false)
    }*/
  };

  useEffect(() => {
    console.log('there');
    setLoading(false);
    if (!organization?.id || !program?.id) return;
    let mounted = true;
    setLoading(true);
    getActiveGoalPlansByProgram(organization.id, program.id).then(
      (items) => {
        if (mounted) {
          if (items.length > 0) {
            setGoalPlans(labelizeNamedData(items));
            setGoalPlan(items.shift());
            /*if (goalplan.goal_plan_type_name == "Sales Goal") {
              setShowFactors(true)
            } else {
              setShowFactors(false)
            }*/
          }
          setLoading(false);
        }
      }
    );
    return () => (mounted = false);
  }, []);
  //}, [organization, program]);

  if (loading) return t("loading");

  let initialValues = {};
  if (goalplan) {
    initialValues = {
      ...initialValues,
      ...{
        goal_plan_id: goalplan.id,
        target_value: goalplan.default_target,
        date_begin: goalplan.date_begin,
        date_end: goalplan.date_end,
        factor_before: goalplan.factor_before,
        factor_after: goalplan.factor_after,
        achieved_callback_id: goalplan.achieved_callback_id,
        exceeded_callback_id: goalplan.exceeded_callback_id,
        // goal_plan_type_name: goalplan.goal_plan_type_name
      },
    };
  }

  const onSubmit = (values) => {
    let formData = {
      goal_plan_id: values.goal_plan_id,
      target_value: values.target_value,
      date_begin: values.date_begin,
      date_end: values.date_end,
      factor_before: values?.factor_before,
      factor_after: values?.factor_after,
      achieved_callback_id: values?.achieved_callback_id ? values.achieved_callback_id : null,
      exceeded_callback_id: values?.exceeded_callback_id ? values.exceeded_callback_id : null,
      user_id: participants.map((p) => p.id),
    };
    setSaving(true)

    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/create-user-goals`,
        formData
      )
      .then((res) => {
        //   console.log(res)
        if (res.status === 200) {
          toggle()
          //let msg = "User Goal Plan created successfully!"
          let msg = ''
          if (res.data.message) {
            msg += " " + res.data.message
          }
          dispatch(flashMessage(msg));
          setSaving(false)
          window.location.reload()
        }
      })
      .catch((err) => {
        dispatch(
          flashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setSaving(false);
      });
  };
  return (
    <Modal
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>

      <div class="right">
        <h3>Add Goal</h3>
        {saving && "Saving, please wait..."}
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={(values) => formValidation.validateForm(values)}
          mutators={{
            onChangeGoalPlan
          }}
        >

          {({ handleSubmit, form, submitting, pristine, values }) => {
            // console.log(values)
            console.log(values);
            return (
              <form
                className="form d-flex flex-column justify-content-evenly"
                onSubmit={handleSubmit}
              >
                <Row>
                  <Col md="12">
                    <Field name="goal_plan_id">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Select
                            options={goalplans}
                            clearable={false}
                            className="react-select"
                            placeholder={"Select a Goal Plan:"}
                            classNamePrefix="react-select"
                            {...input}
                            onChange={form.mutators.onChangeGoalPlan}
                            value={goalplan ? labelizeNamedData([goalplan]) : null}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    {loadingGoalPlan && <span>{t("loading")}</span>}
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="target_value">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder="Target"
                            type="text"

                            //onKeyUp={form.mutators.onChangeAwardValue}
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="date_begin">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder="Date Begin"
                            type="text"
                            readOnly={true}
                            //onKeyUp={form.mutators.onChangeAwardValue}
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="date_end">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder="Date End"
                            type="text"
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                
                  <Row>
                    <Col md="12">
                      <Field name="factor_before">
                        {({ input, meta }) => (
                          <FormGroup>
                            <Input
                              placeholder="Factor Before"
                              type="text"
                              readOnly={true}
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="text-danger">
                                {meta.error}
                              </span>
                            )}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Field name="factor_after">
                        {({ input, meta }) => (
                          <FormGroup>
                            <Input
                              placeholder="Factor After"
                              type="text"
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="text-danger">
                                {meta.error}
                              </span>
                            )}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                
                <div className="d-flex justify-content-end">
                  <TemplateButton
                    disabled={saving}
                    spinner={saving}
                    type="submit"
                    text="Add Goal"
                  />
                </div>

              </form>
            );
          }}
        </Form>
      </div>
      <div class="">
        <Col md="col-md-12 my-4">
          <Label>Selected participant(s):</Label>
          {participants.map((item, index) => {
            return <div key={index}>
              <strong>{item.name}</strong>
            </div>
          })}
        </Col>

      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
    theme: state.theme
  };
};
export default connect(mapStateToProps)(AddUserGoalModal);