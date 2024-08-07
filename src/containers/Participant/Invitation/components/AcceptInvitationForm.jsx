import React from "react";
import { Form, Field } from "react-final-form";
import { Spinner } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import { ApiErrorMessage } from "@/shared/components/flash";
import { validEmail } from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const AcceptInvitationForm = ({ onSubmit, errors, loading }) => {
  const { t } = useTranslation();
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = t("email_is_required");
    } else if (!validEmail(values.email)) {
      errors.email = t("invalid_email_address");
    }
    if (!values.password) {
      errors.password = t("password_is_required");
    }
    if (!values.password_confirmation) {
      errors.password_confirmation = t("confirm_password_required");
    }
    if (values.password != values.password_confirmation) {
      errors.password_confirmation = t(
        "password_and_confirm_password_do_not_match"
      );
    }
    return errors;
  };
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const onSubmit = async values => {
  //   await sleep(400);
  //   window.location = '/forgot/success'
  // }
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // initialValues={{"email":"testdev1008@gmail.com"}}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="card-header">{t("set_your_password")}</div>
          <div className="card-body">
            {errors && <ApiErrorMessage errors={errors} showLabel={false} />}
            <div className="form__form-group-field flex-column">
              <Field name="email">
                {({ input, meta }) => (
                  <div className="mb-3">
                    <label htmlFor="loginInputEmail" className="form-label">
                      {t("email_address")}
                    </label>
                    <input
                      id="loginInputEmail"
                      type="text"
                      {...input}
                      placeholder= {t("email")}
                      className="form-control"
                    />
                    {meta.touched && meta.error && (
                      <span className="form-error">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div className="mb-3">
                    <label htmlFor="loginInputPassword" className="form-label">
                      {t("password")}
                    </label>
                    <input
                      id="loginInputPassword"
                      type="password"
                      {...input}
                      placeholder= {t("password")}
                      className="form-control"
                    />
                    {meta.touched && meta.error && (
                      <span className="form-error">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password_confirmation">
                {({ input, meta }) => (
                  <div className="mb-3">
                    <label
                      htmlFor="loginInputPasswordConfirm"
                      className="form-label"
                    >
                      {t("confirm_password")}
                    </label>
                    <input
                      id="loginInputPasswordConfirm"
                      type="password"
                      {...input}
                      placeholder= {t("confirm_password")}
                      className="form-control"
                    />
                    {meta.touched && meta.error && (
                      <span className="form-error">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="d-flex justify-content-between">
              <TemplateButton
                type="submit"
                disabled={loading}
                text={t("set_password")}
              />
              {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                  className="text-center"
                  variant="warning"
                />
              )}
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default AcceptInvitationForm;
