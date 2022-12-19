import React from "react";
import { validEmail } from "@/shared/helper";
import { Form, Field } from "react-final-form";
import TemplateButton from "@/shared/components/TemplateButton";
import { ApiErrorMessage } from "@/shared/components/flash";
import { useTranslation } from "react-i18next";

const ForgotForm = ({ onSubmit, loading, errors }) => {
  const { t } = useTranslation();
  // useEffect(() => {
  // });

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = t("email_is_required");
    } else if (!validEmail(values.email)) {
      errors.email = t("invalid_email_address");
    }
    return errors;
  };

  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const onSubmit = async values => {
  //   await sleep(400);
  //   window.location = '/forgot/checkemail'
  // }

  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="card-header">{t("forgot_password")}</div>

          <div className="card-body">
            <p className="py-2">{t("enter_email_use_sign_in")}</p>

            {errors && <ApiErrorMessage errors={errors} showLabel={false} />}

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
                    placeholder="Email"
                    className="form-control"
                  />
                  {meta.touched && meta.error && (
                    <span className="form-error">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <div className="d-flex justify-content-between">
              <TemplateButton
                type="submit"
                disabled={loading}
                text={t("continue")}
              />
              <TemplateButton
                link="/login"
                text={t("back_to_sign_in")}
                color="outline-secondary"
                className="border-1"
              />
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default ForgotForm;
