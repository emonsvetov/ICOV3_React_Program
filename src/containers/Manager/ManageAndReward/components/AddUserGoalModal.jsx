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
  const [loadingGoalPlans, setLoadingGoalPlans] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeGoalPlan = (selectedOption) => {
    goalplans.map((item, index) => {
      if (item.id == selectedOption.value) {
        //setGoalPlan(item);
      }
    });

    /*getActiveGoalPlansByProgram(organization.id, program.id, selectedOption.value).then((item) => {
      // console.log(item)
      setGoalPlans(item);
      setLoadingGoalPlans(false);
    });*/
  };
  useEffect(() => {
    setLoading(false);
    if (!organization?.id || !program?.id) return;
    let mounted = true;
    setLoading(true);
    getActiveGoalPlansByProgram(organization.id, program.id).then(
      (items) => {
        if (mounted) {
          // console.log(items)
          if (items.length > 0) {
            setGoalPlans(labelizeNamedData(items));
            setGoalPlan(items.shift());
          }
          setLoading(false);
        }
      }
    );
    return () => (mounted = false);
  }, [organization, program]);

  if (loading) return t("loading");

  let initialValues = {};
  if (goalplan) {
    initialValues = {
      ...initialValues,
      ...{
        goal_plan_id: goalplan.id,
        goal_target: goalplan.default_target,
        date_begin: goalplan.date_begin,
        date_end: goalplan.date_end
      },
    };
  }

  const onSubmit = (values) => {
    let formData = {
      goal_plan_id: values.goal_plan_id,
      goal_target: values.goal_target,
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
            // onChangeAwardValue
          }}
        >
          {({ handleSubmit, form, submitting, pristine, values }) => {
            console.log(values)
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
                            onChange={onChangeGoalPlan}
                            options={goalplans}
                            clearable={false}
                            className="react-select"
                            placeholder={"Select a Goal Plan:"}
                            classNamePrefix="react-select"
                            value={goalplan ? labelizeNamedData([goalplan]) : null}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="goal_target">
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
                            placeholder="Target"
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
                            placeholder="Target"
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