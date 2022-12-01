import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AcceptInvitationForm from './components/AcceptInvitationForm';

const Invitation = ({template}) => {

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

  const onSubmitResetPassword = values => {

    // setLoading(true)
    values = {...values, ...{token:confirmCode, invited: true}}
    // console.log(values)
    // return;
    axios.post('/password/reset', values)
    .then( (res) => {
      // console.log(res)
      // console.log(res.status == 200)
      if(res.status == 200)  {
        // var t = setTimeout(window.location = '/', 500)
        window.location = '/invitation/success'
      }
    })
    .catch( error => {
      // console.log(error.response.data);
      setErrors(error.response.data);
      setLoading(false)
    })
  }

  const checkForConfirmCode = () => {

    if( confirmCode ) return;

    const params = new URLSearchParams(window.location.search) // id=123
    let token = params.get('token');
    if( token ) {
      setConfirmCode(token);
      console.log(token);
      setStep(1);
    }
  }
  if (!template) return 'Loading...'
  // console.log(template)
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;

  return (
    <div className="login-form-wrap flex-column align-items-center pt-4">
      <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
      <div className="card mt-4">
          {step==1 && confirmCode && <AcceptInvitationForm token={confirmCode} errors={errors} onSubmit={onSubmitResetPassword} loading={loading} />}
          {step==1 && !confirmCode && <div className="form__form-group-field flex-column"><p>Invalid or expired link</p></div>}
      </div>
    </div>
)}

const mapStateToProps = (state) => {
  return {
      template: state.domain?.program?.template
  };
};
export default connect(mapStateToProps)(Invitation);