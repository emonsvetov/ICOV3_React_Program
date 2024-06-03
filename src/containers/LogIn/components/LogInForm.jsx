import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import {login} from '../../App/auth';
import {isProgramManager, isProgramParticipant, hasRoleInProgram} from "@/shared/helpers"
import {useDispatch, flash422} from "@/shared/components/flash"
import Select from 'react-select'
import { ButtonToolbar, Input } from 'reactstrap';
import TemplateButton from "@/shared/components/TemplateButton"
import {useSearchParams} from "react-router-dom";

const axios = require('axios');
export const MEDIA_TYPES = [];

const LogInForm = () => {
  const [searchParams] = useSearchParams();
  const [ssoToken, setSsoToken] = useState(searchParams.get('sso-token') || null);
  const dispatch = useDispatch()
  // const organization = getOrganization()

  const [step, setStep] = useState(0);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState(null);
  let [userEmail, setUserEmail] = useState('');
  let [accessToken, setAccessToken] = useState(null);
  let [program, setProgram] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [isLimitedManager, setIsLimitedManager] = useState(false);
  const [isReadOnlyManager, setIsReadOnlyManager] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [programRoles, setProgramRoles] = useState([]);

  const ssoLogin = async ssoToken => {
    setStep(1)
    await axios.post('/sso-login', {
      sso_token: ssoToken
    }).then((res) => {
      if (res.status === 200) {
        if (!isProgramManager(res.data.user) && !isProgramParticipant(res.data.user)) {
          alert("You are logging into Wrong Login Area")
          return
        } else {
          setLoading(true)
          setStep(1)
          setUser(res.data.user)
          setOrganization(res.data.user.organization)
          setAccessToken(res.data.access_token)
          setLoading(false)

        }
      }
    })
        .catch(err => {
          window.location.href = '/user-not-found';
        })
  };

  const handleCheckRole = ( programId ) => {
    setIsParticipant(false)
    setIsManager(false)
    if(hasRoleInProgram('Participant', programId, user)) {
      setIsParticipant(true)
    }
    if(hasRoleInProgram('Manager', programId, user)) {
      setIsManager(true)
    }
    if(hasRoleInProgram('Limited Manager', programId, user)) {
      setIsLimitedManager(true)
    }
    if(hasRoleInProgram('Read Only Manager', programId, user)) {
      setIsReadOnlyManager(true)
    }
  };

  const handleCountRole = ( ) => {
    let count = 0;
    let programId = null;
    let role = '';
    programOptions.forEach((option, index) =>{
      programId = option.value;
      if(hasRoleInProgram('Participant', programId, user)) {
        role = 'participant';
        count ++;
      }
      if(hasRoleInProgram('Manager', programId, user)) {
        role = 'manager';
        count ++;
      }
      if(hasRoleInProgram('Limited Manager', programId, user)) {
        role = 'limited_manager';
        count ++;
      }
      if(hasRoleInProgram('Read Only Manager', programId, user)) {
        role = 'read_only_manager';
        count ++;
      }
    })
    return [count, programId, role];
  };

  useEffect(() => {
    if (ssoToken !== null && ssoToken !== undefined){
      ssoLogin(ssoToken)
    }
  }, [ssoToken])

  useEffect( () => {
    // setUser(getAuthUser())
  }, [])

  useEffect( () => {
    if(user){
      let options = getProgramOptions(user);
      setProgramRoles(user.programRoles)
      if(options.length > 0){
        setProgramOptions(options)
      }
    }
  }, [user])

  useEffect( () => {
    if(programOptions.length){
      let option = programOptions[0];
      setProgram(option);
      let [roleCount, currentId, currentRole] = handleCountRole();

      console.log("programRoles")
      console.log(programRoles)
      
      if(roleCount == 1){
        handleProgramLogin(currentId, currentRole)
      }
      else{
        handleCheckRole(option.value);
        setStep(1)
      }
    }
  }, [programOptions])

  const onClickForgotLink = (e) => {
    e.preventDefault();
    setStep(3);
  }

  const handleProgramLogin = async( programId, loginAs ) =>{
    // let loginAs = '';
    let data = {
      role: loginAs
    }
    if(typeof (programRoles[programId]) === 'undefined' ) {
      throw new Error('Program role not found');
    }
    const organization = programRoles[programId]['organization']
    setOrganization(organization)
    const organizationId = organization['id']
    // console.log(organization)
    // return;
    // setLoading(true)
    axios.post(`/organization/${organizationId}/program/${programId}/login`, data, {
      headers: {"Authorization" : `Bearer ${accessToken}`}
    })
    .then( (res) => {
      console.log(res)
      // console.log(res.status == 200)
      if(res.status === 200)  {
        if( res.data?.program && res.data?.role)  {
          // user.programId = res.data.programId
          user.loginAs = res.data.role
          // console.log(user.loginAs)
          login({
            user,
            access_token: accessToken,
            program: res.data.program,
            rootProgram: res.data.program,
            organization: organization
          })
          let sendTo = '/'
          if( user.loginAs.name.includes('Manager'))  {
            sendTo = '/manager/home'
            var t = setTimeout(window.location = sendTo, 500);

          } else  if( user.loginAs.name === 'Participant')  {
            sendTo = '/participant/home'
            axios.get(`/organization/${organization.id}/program/${programId}/digital-media-type`, {
              headers: {"Authorization" : `Bearer ${accessToken}`}
            })
                .then(  (res) => {
                    localStorage.setItem(MEDIA_TYPES, JSON.stringify(res.data));
                    var t = setTimeout(window.location = sendTo, 500)
                });
          }
        } else  {
          alert("Invalid Program")
        }
        setLoading(false)
      }
    })
    .catch( err => {
      // console.log(err.responseText)
      console.log(err.response.data)
      // dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
      flash422(dispatch, err.response.data)
      setLoading(false)
    })
  }

  const CardFormLogin = ()  => {
    const FormLogin = () => {
      const validate = values => {

        if (!values.email && userEmail){
          values.email = userEmail;
        }
        let errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }

      const onSubmit = async values => {
        if (values.email){
          setUserEmail(values.email)
        }
        if (!values.email && userEmail){
          values.email = userEmail;
        }
        // console.log(values);
        setLoading(true)
        axios.post('/login', values)
        .then( (res) => {
          console.log(res.data)
          // console.log(res.status == 200)
          if(res.status === 200)  {
            // res.data.user.loginAs = 'Participant'
            if( !isProgramManager(res.data.user) && !isProgramParticipant(res.data.user) )  {
              alert("You are logging into Wrong Login Area")
              return
            } else {
              // if( isProgramManager(res.data.user) && isProgramParticipant(res.data.user) ) {
              //   setIsManager(true)
              //   setIsParticipant(true)
              //   // alert('Is Both');
              // } else if(isProgramManager(res.data.user)) {
              //   setIsManager(true)
              //   // alert('Is Manager');
              // } else if(isProgramParticipant(res.data.user)) {
              //   // alert('Is Participant');
              //   setIsParticipant(true)
              // }
              setAccessToken(res.data.access_token)
              // setOrganization(res.data.user.organization)
              setUser(res.data.user)
              setProgramRoles(res.data.user.programRoles)
              // var t = setTimeout(window.location = '/participant/home', 500)
              setLoading(false)
            }
          }
        })
        .catch( err => {
          console.log(err)
          // console.log(error.response.data)
          // dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
          flash422(dispatch, err.response.data)
          setLoading(false)
        })
      };

      return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={
          {
            // email: 'manager@inimist.com',
            // email: 'hmaudson2@dyndns.org',
            // email: 'arvind.mailtoxsxx@gmail.com',
            // password: 'aaa'
          }
        }
        render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          {/* <div className="card-header">Log in to continue</div> */}
          <Field name="email">
            {({ input, meta }) => (
             <div className="mb-3">
                <label htmlFor="loginInputEmail" className="form-label">Email address</label>
                <input id="loginInputEmail" type="text" {...input} value={userEmail ? userEmail : input.value}  placeholder="Email" className="form-control" />
                {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div className="mb-3">
                <label htmlFor="loginInutPassword" className="form-label">Password</label>
                <input id="loginInutPassword" type="password" {...input} placeholder="Password" className="form-control"  />
                {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
              </div>
            )}
          </Field>
          {/* <div className="form__form-group">
            <div className="form__form-group-field">
              <Field
                name="remember_me"
                component={renderCheckBoxField}
                label="Remember me"
              />
              Remember Me
            </div>
          </div> */}
          <div className="float-end">
            <p><a href="/forgot"><small>Forgot a password?</small></a></p>
          </div>
          <TemplateButton type="submit" className="" disabled={loading} text='Sign In' />
          </form>
        )}
      />
    )}

    const FormProgram = () => {
      // console.log(user)

      if( !user ) return 'loading...'

      let loginAs = ''

      // console.log(user.programRoles)
      // const programOptions = getProgramOptions(user)

      const validate = values => {
        let errors = {};
        if( !program )
        errors.program = "Select a program";
        return errors;
      }
      
      const onSubmit = async values => {
        let programId = values.program?.value;
        // console.log(values.program)
        handleProgramLogin(programId, loginAs);
      };

      const onSelectProgram = (selectedOption) => {
        // alert(JSON.stringify(selectedOption))
        handleCheckRole(selectedOption.value);
        setProgram( selectedOption )
      };

      return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={
          {
            program
          }
        }
        render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          {programOptions.length > 1 ?
          <Field name={'program'}
              parse={
                  (value) => {
                      onSelectProgram(value)
                      return value
                  }
              }
          >
          {({ input, meta }) => (
              <div className="form__form-group">
                  <span className="form__form-group-label">Select your Reward Program</span>
                  <div className="form__form-group-field">
                      <div className="form__form-group-row">
                          <Select
                              options={programOptions}
                              clearable={false}
                              className="react-select"
                              placeholder={' --- '}
                              classNamePrefix="react-select"
                              value={program}
                              {...input}
                          />
                          {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                      </div>
                  </div>
              </div>
          )}
          </Field> :
          <div className="form__form-group">
              <span className="form__form-group-label">Your Reward Program:</span>
              <div className="form__form-group-field">
                  <div className="form__form-group-row">
                      <Input
                          readOnly={true}
                          value={program?.label}
                      />
                  </div>
              </div>
          </div>
          }
          
          <ButtonToolbar className="mt-3 d-flex justify-content-between w100">
            {isParticipant &&
              <TemplateButton
                type="submit"
                disabled={loading}
                className=""
                onClick={()=>{loginAs='participant'}}
                text="Log In"
              />
            }
            {isManager &&
              <TemplateButton
                type="submit"
                disabled={loading}
                className=""
                onClick={()=>{loginAs='manager'}}
                text="Log In as a Manager"
              />
            }
            {!isManager && isLimitedManager &&
              <TemplateButton
                type="submit"
                disabled={loading}
                className=""
                onClick={()=>{loginAs='limited_manager'}}
                text="Log In as a Manager"
              />
            }
            {!isManager && !isLimitedManager && isReadOnlyManager &&
              <TemplateButton
                type="submit"
                disabled={loading}
                className=""
                onClick={()=>{loginAs='read_only_manager'}}
                text="Log In as a Manager"
              />
            }
          </ButtonToolbar>
          </form>
        )}
      />
    )}

    return (
      <div className="card w-100">
        <div className="card-header">Sign In</div>
        <div className="card-body mt-3">
          {step === 0 && <FormLogin onSubmit /> || step === 1 && <FormProgram onSubmit />}
        </div>
      </div>
    )
  }

  const getProgramOptions = (user) => {
    let options = []
    for (const [key, value] of Object.entries(user.programRoles)) {
      options.push({label: value.name, value: value.id})
    }
    return options
  }

  const CardFormForgot = ()  => {
    return (
      <div className="card w-100">
        <div className="card-header">Forgot Password?</div>
        <div className="card-body mt-3">
          <FormForgot onSubmit />
        </div>
      </div>
    )
  }

  const FormForgot = () => {
    const validate = values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
    }
    const onSubmit = async values => {
      // console.log(values);
      setLoading(true)
      axios.post('/password/forgot', values)
      .then( (res) => {
        console.log(res.data)
        // console.log(res.status == 200)
        if(res.status === 200)  {
          setLoading(false)
        }
      })
      .catch( err => {
        console.log(err)
        // console.log(error.response.data)
        // dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        flash422(dispatch, err.response.data)
        setLoading(false)
      })
    };
    return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={
        {
          email: 'arvind.mailtoxsxx@gmail.com'
        }
      }
      render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <Field name="email">
          {({ input, meta }) => (
           <div className="mb-3">
              <label htmlFor="loginInputEmail" className="form-label">Email address</label>
              <input id="loginInputEmail" type="text" {...input} placeholder="Email" className="form-control" />
              {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
            </div>
          )}
        </Field>
        <TemplateButton type="submit" className="" disabled={loading} text='Submit' />
        </form>
      )}
    />
  )}
  // const FormProgram = () => {
  //   return (
  //     <div>Form 2</div>
  //   )
  // }

  return (
    step === 0 && <CardFormLogin /> || step === 1 && <CardFormLogin /> || step === 3 && <CardFormForgot />
  )
}

export default LogInForm;
