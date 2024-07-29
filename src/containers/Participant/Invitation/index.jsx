import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import AcceptInvitationForm from "./components/AcceptInvitationForm";
import { useTranslation } from "react-i18next";
import {login} from '@/containers/App/auth';
import {useDispatch, flashSuccess, flashError} from "@/shared/components/flash"

const Invitation = ({ template }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    // Update the document title using the browser API
    checkForConfirmCode();
    // document.title = `You are on step ${step} with ${confirmCode}`;
  });
  const [step, setStep] = useState(0);
  const [confirmCode, setConfirmCode] = useState(null);
  // const [validCode, setValidCode] = useState(false);

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [completed, setCompleted] = useState(false);

  const onSubmitResetPassword = (values) => {
    setLoading(true);
    values = { ...values, ...{ token: confirmCode, invited: true } };
    // console.log(values)
    // return;
    axios
      .post("/invitation/accept", values)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          const access_token = res.data?.access_token ? res.data.access_token : null
          const user = res.data.user ? res.data.user : null
          const program = res.data?.program?.id ? res.data.program : null
          const organization = program?.organization ? program.organization : null
          if( access_token && user && program && organization )
          {
            user.loginAs = res.data?.role ? res.data.role : null
              login({
                user,
                access_token,
                program,
                rootProgram: program,
                organization
              })
              flashSuccess(dispatch, `${t("invitation_accepted")} ${t('redirecting_to_dashboard')}`)
              setTimeout( () => window.location="/participant/home?message=Invitation accepted. Please start awarding", 2000);
          } else {
            setTimeout( () => window.location="/invitation/success?message=Invitation accepted. Please Login.", 2000);
            flashSuccess(dispatch, `${t("invitation_accepted")} ${t('please_login')}`)
          }
        } else {
          flashError(dispatch, res.response.error)
          setLoading(false);
        }
      })
      .catch((error) => {
        flashError(dispatch, error.response.data)
        setLoading(false);
      });
  };

  const checkForConfirmCode = () => {
    if (confirmCode) return;

    const params = new URLSearchParams(window.location.search); // id=123
    let token = params.get("token");
    if (token) {
      setConfirmCode(token);
      console.log(token);
      setStep(1);
    }
  };
  if (!template) return t("loading");
  // console.log(template)
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;

  return (
    <div className="login-form-wrap flex-column align-items-center pt-4">
      <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
      <div className="card mt-4">
        {step == 1 && confirmCode && (
          <AcceptInvitationForm
            token={confirmCode}
            errors={errors}
            onSubmit={onSubmitResetPassword}
            loading={loading}
          />
        )}
        {step == 1 && !confirmCode && (
          <div className="form__form-group-field flex-column">
            <p>{t("invalid_or_expired_link")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.domain?.program?.template,
  };
};
export default connect(mapStateToProps)(Invitation);
