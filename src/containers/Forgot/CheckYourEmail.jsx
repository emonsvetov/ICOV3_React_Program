import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const CheckYourEmail = ({ template }) => {
  const { t, i18n } = useTranslation();
  if (!template) return t("loading");

  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  return (
    <div className="login-form-wrap flex-column align-items-center pt-4">
      <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
      <div className="card mt-4">
        <div className="card-header">Check Your Email! </div>
        <div className="card-body">
          <p className="py-2">
            We just sent you an email.
            <br />
            Please follow the instructions in the email to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.domain?.program?.template,
  };
};
export default connect(mapStateToProps)(CheckYourEmail);
