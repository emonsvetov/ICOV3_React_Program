import React from "react";
import { connect } from "react-redux";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const InvitationSuccess = ({ template }) => {
  const { t, i18n } = useTranslation();
  if (!template) return t("loading");
  // console.log(template)
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  return (
    <div className="login-form-wrap flex-column align-items-center pt-4">
      <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
      <div className="card mt-4">
        <div className="card-header">Invitation Accepted!</div>
        <div className="card-body">
          <p className="pb-4">You have successfully set your password.</p>
          <div className="d-flex justify-content-between">
            <TemplateButton link="/login" text="Sign in" />
          </div>
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
export default connect(mapStateToProps)(InvitationSuccess);
