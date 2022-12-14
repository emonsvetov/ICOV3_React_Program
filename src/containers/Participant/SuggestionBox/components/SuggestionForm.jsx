import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Col, Row, FormGroup, FormFeedback, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { getUser } from "@/services/program/getUser";
import axios from "axios";
import { useDispatch } from "@/shared/components/flash";
import TemplateButton from "@/shared/components/TemplateButton";
import {
  mapFormDataUploads,
  unpatchMedia,
  patchMediaURL,
} from "@/shared/helper";
import { getAuthUser, AUTH_USER_KEY } from "@/containers/App/auth";
import { ErrorMessage } from "@/shared/components/ErrorMsg";
import { useTranslation } from "react-i18next";

const MEDIA_FIELDS = ["avatar"];

const SuggestionForm = ({ organization, program, auth }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth && organization && program) {
      // console.log(auth)
      getUser(organization.id, program.id, auth.id).then((payload) => {
        setUser(payload);
      });
    }
  }, [organization, program, auth]);

  const onSubmit = (values) => {
    values = unpatchMedia(values, MEDIA_FIELDS);
    let formData = mapFormDataUploads(values);
    formData.append("_method", "PUT");

    axios
      .post(`/organization/${organization.id}/user/${user.id}`, formData, {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        let newUser = res.data.user;
        let currentUser = getAuthUser();
        currentUser.avatar = newUser.avatar ? newUser.avatar : null;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        return false;
      });
  };

  if (!user) return t("loading");

  user = patchMediaURL(user, MEDIA_FIELDS);

  const initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  return (
    <div className="suggestion-box">
      <h2 className="title">My Path Suggestion Box</h2>
      <div className="hr">Let us know what suggestions you have!</div>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className="form d-flex flex-column justify-content-evenly"
            onSubmit={handleSubmit}
          >
            <Row>
              <Col md="12">
                <Label className="w-50">* Name</Label>
                <div className="d-flex justify-content-between">
                  <Field name="first_name">
                    {({ input, meta }) => (
                      <FormGroup className="w-100">
                        <Input
                          placeholder="First Name"
                          type="text"
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage msg={meta.error} />
                          // <span className="form__form-group-error">
                          //   {meta.error}
                          // </span>
                        )}
                      </FormGroup>
                    )}
                  </Field>
                  <span>&nbsp; &nbsp; </span>
                  <Field name="last_name">
                    {({ input, meta }) => (
                      <FormGroup className="w-100">
                        <Input placeholder="Last Name" type="text" {...input} />
                        {meta.touched && meta.error && (
                          <ErrorMessage msg={meta.error} />
                        )}
                      </FormGroup>
                    )}
                  </Field>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <Field name="email">
                  {({ input, meta }) => (
                    <FormGroup className="w-75">
                      <Label className="w-50">* Email:</Label>
                      <Input placeholder="" type="email" {...input} />
                      {meta.touched && meta.error && (
                        <ErrorMessage msg={meta.error} />
                      )}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <Field name="comments">
                  {({ input, meta }) => (
                    <FormGroup className="w-100">
                      <Label className="w-100">
                        What would you like to suggest?
                      </Label>
                      <Input
                        placeholder=""
                        type="textarea"
                        rows="7"
                        {...input}
                      />
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>

            <div className="form-buttons-wrapper">
              <TemplateButton type="submit" disabled={loading} text="Submit" />
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

const validate = (values) => {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = "Please enter first name";
  }
  if (!values.last_name) {
    errors.last_name = "Please enter last name";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values?.password || values?.password_confirmation) {
    if (values.password !== values.password_confirmation) {
      errors.password = "Password and confirm password do not match";
    }
    if (values.password.trim().length < 3) {
      errors.password = "Please enter strong password";
    }
  }
  return errors;
};

export default connect((state) => ({
  auth: state.auth,
  program: state.program,
  organization: state.organization,
}))(SuggestionForm);
