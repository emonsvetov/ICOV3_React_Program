import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
// import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import {login} from '../../App/auth';
import {isProgramManager, isProgramParticipant, hasRoleInProgram} from "@/shared/helper"
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import Select from 'react-select';
import { ButtonToolbar, Button } from 'reactstrap';
// import {getProgram} from '@/services/program/getProgram';

const axios = require('axios');

const LogInForm = () => {

  const dispatch = useDispatch()
  // const organization = getOrganization()

  const [step, setStep] = useState(0);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState(null);
  let [accessToken, setAccessToken] = useState(null);
  let [program, setProgram] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect( () => {
    // setUser(getAuthUser())
  }, [])

  const FormLogin = () => {
    const validate = values => {
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
            setStep(1)
            setUser(res.data.user)
            setOrganization(res.data.user.organization)
            setAccessToken(res.data.access_token)
            // var t = setTimeout(window.location = '/participant/home', 500)
            setLoading(false)
          }
        }
      })
      .catch( err => {
        console.log(err)
        // console.log(error.response.data)
        dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
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
          email: 'hmaudson2@dyndns.org',
          // email: 'arvind.mailtoxsxx@gmail.com',
          password: 'aaa'
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
        <Button type="submit" className="btn btn-primary red" disabled={loading}>Log In</Button>
        </form>
      )}
    />
  )}

  const getProgramOptions = (user) => {
    let options = []
    for (const [key, value] of Object.entries(user.programRoles)) {
      options.push({label: value.name, value: value.id})
    }
    return options
  }

  const FormProgram = () => {

    // console.log(user)

    if( !user ) return 'loading...'

    let loginAs = ''

    // console.log(user.programRoles)
    const programOptions = getProgramOptions(user)

    const validate = values => {
      let errors = {};
      if( !program )  
      errors.program = "Select a program";
      return errors;
    }
    const onSubmit = async values => {
      let data = {
        role: loginAs
      }
      // console.log(data);
      // return;
      // setLoading(true)
      axios.post(`/organization/${organization.id}/program/${program.value}/login`, data, {
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
            if( user.loginAs.name === 'Manager')  {
              sendTo = '/manager/home'
            } else  if( user.loginAs.name === 'Participant')  {
              sendTo = '/participant/home'
            } 
            var t = setTimeout(window.location = sendTo, 500)
          } else  {
            alert("Invalid Program")
          }
          setLoading(false)
        }
      })
      .catch( err => {
        console.log(err.responseText)
        // console.log(error.response.data)
        dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        setLoading(false)
      })
    };

    const onSelectProgram = (selectedOption) => {
      // alert(JSON.stringify(selectedOption))
      setIsParticipant(false)
      setIsManager(false)
      if(hasRoleInProgram('Participant', selectedOption.value, user)) {
        setIsParticipant(true)
      }
      if(hasRoleInProgram('Manager', selectedOption.value, user)) {
        setIsManager(true)
      }
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
        </Field>
        <ButtonToolbar className="mt-3 d-flex justify-content-between w100">
          {isParticipant && <Button type="submit" disabled={loading} className="btn btn-primary red" onClick={()=>{loginAs='participant'}}>Log In</Button>}
          {isManager && <Button type="submit" disabled={loading} className="btn btn-primary red" onClick={()=>{loginAs='manager'}}>Log In as a Manager</Button>}
        </ButtonToolbar>
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
    step === 0 && <FormLogin /> || step === 1 && <FormProgram />
  )
}

export default LogInForm;
