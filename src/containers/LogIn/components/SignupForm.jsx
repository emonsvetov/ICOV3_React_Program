import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import {  Button } from 'reactstrap';

const axios = require('axios');

const SignupForm = () => {

  const dispatch = useDispatch()
  // const organization = getOrganization()

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState(null);
  let [accessToken, setAccessToken] = useState(null);

  useEffect( () => {
    // setUser(getAuthUser())
  }, [])

  
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
      // axios.post('/signup', values)
      // .then( (res) => {
      //   console.log(res.data)
      //   // console.log(res.status == 200)
        
      // })
      .catch( err => {
        console.log(err)
        // console.log(error.response.data)
        dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        setLoading(false)
      })
    };
    return (<>
      
      <div className='mb-3'>
        <h4 className='text-center'>Resend Invitation Request</h4>
      You must be invited to participate in this rewards program. Please check your email for your personalized invitation. If you would like us to resend your invitation, please enter your email address below and click "Resend Invitation". If your email address is not in our system, please contact your program administrator.
        </div>  
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{}}
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
          <Button type="submit" className="btn btn-primary red" disabled={loading}>Resend Invitation</Button>
          </form>
        )}
      />
    </>
  )

}

export default SignupForm;
