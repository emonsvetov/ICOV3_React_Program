import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Input, Col, Row, FormGroup } from "reactstrap";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { connect } from "react-redux";
import { useDispatch, flashSuccess, flash422 } from "@/shared/components/flash";
import {
  makeLabelizedOptionsFromTree,
  labelizeNamedData,
  unpatchSelect
} from "@/shared/helpers";
import { getProgramTree } from "@/services/program/getProgramTree";
import TemplateButton from "@/shared/components/TemplateButton";
import getUnitNumbers from "@/services/program/getUnitNumbers";

const InviteParticipant = ({ auth, organization, rootProgram }) => {
  const [programOptions, setProgramOptions] = useState([]);

  useEffect(() => {
    if (rootProgram && rootProgram?.id) {
      getProgramTree(rootProgram.organization_id, rootProgram.id).then((p) => {
        setProgramOptions(makeLabelizedOptionsFromTree(p));
      });
    }
  }, [rootProgram]);

  /*const onSubmit = values => {
    
  }*/
  let [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unitNumberOptions, setUnitNumberOptions] = useState(null);
  const dispatch = useDispatch();
  const onSelectProgram = (selectedOption) => {
    setProgram(selectedOption);
  };

  const awardLevelOptions = [{ label: "Default", value: "default" }];
  const hasNonDefaultOptions = awardLevelOptions.some(option => option.value !== 'default');

  useEffect(() => {
    let currentProgramId = program?.value ?? rootProgram?.id
    if( currentProgramId ) {
      getUnitNumbers(organization.id, currentProgramId, "assignable=1")
      .then( res => {
        setUnitNumberOptions(labelizeNamedData(res));
      })
    }
  }, [organization, rootProgram, program]);

  const onChangeProgramValue = ([fieldName, fieldVal], state, {changeValue }) => {
    changeValue(state, 'unit_number', () => null);
  }

  const onSubmit = (values) => {
    setLoading(true);
    if( typeof values.unit_number === 'object') {
      values = unpatchSelect(values, ['unit_number'])
    }
    axios
      .put(
        `/organization/${organization.id}/program/${values.program.value}/invite`,
        values
      )
      .then((res) => {
        // console.log(res)
        if (res.status == 200) {
          window.location.reload();
          flashSuccess(
            dispatch,
            "The participant has been invited to your program!"
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        //console.log(error.response.data);
        flash422(dispatch, error.response.data);
        setLoading(false);
      });
  };
  // console.log(programOptions)
  return (
    <div className="invite-participant">
      <h2 className="title mb-3">Invite Participant</h2>
      <Form onSubmit={onSubmit} initialValues={{}} validate={validate}
        mutators={{
          onChangeProgramValue
        }}
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className="form d-flex flex-column justify-content-evenly"
            onSubmit={handleSubmit}
          >
            {programOptions.length > 0 && (
            <Row>
              <Col md="12">
                <Field
                  name={"program"}
                  parse={(value) => {
                    onSelectProgram(value);
                    return value;
                  }}
                >
                  {({ input, meta }) => (
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Select your Reward Program
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-row">
                          <Select
                            options={programOptions}
                            clearable={false}
                            className="react-select"
                            placeholder={" --- "}
                            classNamePrefix="react-select"
                            value={program}
                            onInputChange={form.mutators.onChangeProgramValue}
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="form-error">{meta.error}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Field>
              </Col>
            </Row>
            )}
            <Row>
              <Col md="12">
                <Field name="first_name">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="First Name *"
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
            <Row>
              <Col md="12">
                <Field name="last_name">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input placeholder="Last Name *" type="text" {...input} />
                      {meta.touched && meta.error && (
                        <span className="form-error">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Field name="external_id">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input placeholder="External ID" type="text" {...input} />
                      {meta.touched && meta.error && (
                        <span className="form-error">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Field name="email">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="Email Address *"
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
            {hasNonDefaultOptions &&  (
            <Row>
              <Col md="12">
                <Field name="award_level">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Select
                        options={awardLevelOptions}
                        clearable={true}
                        className="react-select"
                        placeholder={"Award Level"}
                        classNamePrefix="react-select"
                        parse={(value) => {
                          // handleAwardLevelChange(value)
                          return value;
                        }}
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
            {unitNumberOptions && unitNumberOptions.length >0 && (
              <Row>
                <Col md="12">
                  <Field name="unit_number">
                    {({ input, meta }) => (
                      <FormGroup>
                        <Select
                          options={unitNumberOptions}
                          clearable={true}
                          className="react-select"
                          placeholder={"Unit Number"}
                          classNamePrefix="react-select"
                          parse={(value) => {
                            return value;
                          }}
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
            <div className="d-flex justify-content-center">
              <TemplateButton
                type="submit"
                text="Invite Participant"
                disabled={loading}
                spinner={loading}
              />
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

const validate = (values) => {
  let errors = {};
  if (!values.program) {
    errors.program = "Select a program";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.first_name) {
    errors.first_name = "first_name is required";
  }
  if (!values.last_name) {
    errors.last_name = "last_name is required";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    rootProgram: state.rootProgram,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(InviteParticipant);
