import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Col, Row, FormGroup, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { getUser } from "@/services/program/getUser";
import axios from "axios";
// import {
//   useDispatch,

// } from "@/shared/components/flash";
import TemplateButton from "@/shared/components/TemplateButton";
import {
  mapFormDataUploads,
  unpatchMedia,
  patchMediaURL,
} from "@/shared/helpers";
import { getAuthUser, AUTH_USER_KEY } from "@/containers/App/auth";
import { ErrorMessage } from "@/shared/components/ErrorMsg";
import { useTranslation } from "react-i18next";

const MEDIA_FIELDS = ["avatar"];

const ReferralForm = ({ organization, program, auth }) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  let [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth && organization && program) {
      // console.log(auth)
      getUser(organization.id, program.id, auth.id).then((payload) => {
        setUser(payload);
      });
    }
  }, [organization, program, auth]);

  const validate = (values) => {
    let errors = {};
    if (!values.recipient_first_name) {
      errors.recipient_first_name = t("please_enter_first_name");
    }
    if (!values.recipient_last_name) {
      errors.recipient_last_name = t("please_enter_last_name");
    }
    if (!values.recipient_email) {
      errors.recipient_email = t("email_is_required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.recipient_email)) {
      errors.recipient_email = t("invalid_email_address");
    }
    if (!values.recipient_area_code) {
      errors.recipient_area_code = t("field_required");
    }
    if (!values.recipient_phone) {
      errors.recipient_phone = t("field_required");
    }else if(!/^[0-9-]+$/.test(values.recipient_phone)){
      errors.recipient_phone = t("invalid_phone_number");
    }
    if (!values.message) {
      errors.message = t("field_required");
    }
    return errors;
  };

  const onSubmit = (values) => {
    values = unpatchMedia(values, MEDIA_FIELDS);
    let formData = mapFormDataUploads(values);
    // formData.append("_method", "PUT");
    formData.append("sender_id", user.id);
    let url = `/organization/${program.organization_id}/program/${program.id}/refer`
    setLoading(true);
    axios
      .post(url, formData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(true)
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  if(submitted){
    return <div className="mt-5"><h3>Thank You</h3></div>
  }
  return (
    <div className="submit-referral">
      <h2 className="title">{t("submit_a_referral")}</h2>
      <div className="mb-5">{t("submit_info_below")}</div>

      <Form
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className="form d-flex flex-column justify-content-evenly"
            onSubmit={handleSubmit}
          >
            <Row>
              <Col md="6">
                <Label className="w-50">* {t("name")}:</Label>
                <div className="d-flex justify-content-between">
                  <Field name="recipient_first_name">
                    {({ input, meta }) => (
                      <FormGroup className="">
                        <Input
                          placeholder={t("first_name")}
                          type="text"
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage msg={meta.error} />
                        )}
                      </FormGroup>
                    )}
                  </Field>
                  <span>&nbsp; &nbsp; </span>
                  <Field name="recipient_last_name">
                    {({ input, meta }) => (
                      <FormGroup className="Last Name">
                        <Input
                          placeholder={t("last_name")}
                          type="text"
                          {...input}
                        />
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
                <Field name="recipient_email">
                  {({ input, meta }) => (
                    <FormGroup className="w-75">
                      <Label className="w-50">* {t("email")}:</Label>
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
              <Col md="6">
                <Label className="w-50">* {t("phone_number")}:</Label>
                <div className="d-flex justify-content-between">
                  <Field name="recipient_area_code">
                    {({ input, meta }) => (
                      <FormGroup className="">
                        <Input
                          placeholder={t("area_code")}
                          type="text"
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage msg={meta.error} />
                        )}
                      </FormGroup>
                    )}
                  </Field>
                  <span className="phone-separate" aria-hidden="true">
                    &nbsp;- &nbsp;
                  </span>
                  <Field name="recipient_phone">
                    {({ input, meta }) => (
                      <FormGroup className="">
                        <Input
                          placeholder={t("phone_number")}
                          type="text"
                          {...input}
                        />
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
                <Field name="message">
                  {({ input, meta }) => (
                    <FormGroup className="w-100">
                      <Label className="w-50">* {t("comments")}:</Label>
                      <Input
                        placeholder={t("type_here")}
                        type="textarea"
                        {...input}
                      />
                      {meta.touched && meta.error && (
                          <ErrorMessage msg={meta.error} />
                        )}
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>

            <div className="d-flex justify-content-start">
              <TemplateButton
                type="submit"
                disabled={loading}
                text={t("submit_your_referral")}
              />
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default connect((state) => ({
  auth: state.auth,
  program: state.program,
  organization: state.organization,
}))(ReferralForm);
