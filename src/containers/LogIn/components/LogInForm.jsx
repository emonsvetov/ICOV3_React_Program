import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
// import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import {login, getOrganization} from '../../App/auth';
import {isProgramManager, isParticipant} from "@/shared/helper"
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import Select from 'react-select';
import { ButtonToolbar, Button } from 'reactstrap';

const axios = require('axios');

const LogInForm = () => {

  const dispatch = useDispatch()
  const organization = getOrganization()

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState(null);
  let [accessToken, setAccessToken] = useState(null);
  let [program, setProgram] = useState(null);

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
          login(res.data)
          if(isProgramManager(res.data.user) && isParticipant(res.data.user))  {
            setUser(res.data.user)
            setAccessToken(res.data.access_token)
            setStep(1)
          }
          // var t = setTimeout(window.location = '/participant/home', 500)
          setLoading(false)
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
          email: 'panda.kk1114@gmail.com',
          password: '123456'
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
    for (const [key, value] of Object.entries(user.program_roles)) {
      options.push({label: value.name, value: value.id})
    }
    return options
  }

  const FormProgram = () => {

    console.log(user)

    if( !user ) return 'loading...'

    let loginAs = ''

    // console.log(user.program_roles)
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
          if( res.data?.program_id)  {
            user.program_id = res.data.program_id
            if( res.data?.manager === true) {
              // alert("Manager")
              user.loginAs = 'Manager'
              // login(res.data)
            } else if( res.data?.participant === true ) {
              // alert("Participant")
              user.loginAs = 'Participant'
            }
            login({
              user,
              access_token: accessToken
            })
            var t = setTimeout(window.location = '/', 500)
          } else  {
            alert("Invalid Program")
          }
          setLoading(false)
        }
      })
      .catch( err => {
        console.log(err)
        // console.log(error.response.data)
        dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        setLoading(false)
      })
    };
    const onSelectProgram = (selectedOption) => {
      // alert(JSON.stringify(selectedOption))
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
          <Button type="submit" disabled={loading} className="btn btn-primary red" onClick={()=>{loginAs='participant'}}>Log In</Button>
          <Button type="submit" disabled={loading} className="btn btn-primary red" onClick={()=>{loginAs='program_manager'}}>Log In as a Manager</Button>
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
