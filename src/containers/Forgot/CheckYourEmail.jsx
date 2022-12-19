import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const CheckYourEmail = ({ template }) => {
  const { t } = useTranslation();
  if (!template) return t("loading");

  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  return (
    <div className="login-form-wrap flex-column align-items-center pt-4">
      <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
      <div className="card mt-4">
        <div className="card-header">{t("check_your_email")} </div>
        <div className="card-body">
          <p className="py-2">
            {t("sent_email")}
            <br />
            {t("reset_password_desc")}
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
