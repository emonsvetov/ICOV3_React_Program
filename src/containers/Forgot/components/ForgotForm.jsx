import React from 'react';
import { validEmail } from '@/shared/helper';
import { Form, Field } from 'react-final-form';
import TemplateButton from "@/shared/components/TemplateButton"
import {ApiErrorMessage} from "@/shared/components/flash"

const ForgotForm = ( {onSubmit, loading, errors} ) => {

  // useEffect(() => {
  // });

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!validEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  }

  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const onSubmit = async values => {
  //   await sleep(400);
  //   window.location = '/forgot/checkemail'
  // }

  return (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    >
    {({ handleSubmit, form, submitting, pristine, values }) => (
    <form className="form" onSubmit={handleSubmit}>

      <div className="card-header">Forgot Password?</div>

      <div className="card-body">

        <p className="py-2">Please enter the email address you use to sign in</p>

        {errors && <ApiErrorMessage errors={errors} showLabel={false} />}

        <Field name="email">
          {({ input, meta }) => (
            <div className="mb-3">
              <label htmlFor="loginInputEmail" className="form-label">Email address</label>
              <input id="loginInputEmail" type="text" {...input} placeholder="Email" className="form-control" />
              {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
            </div>
          )}
        </Field>

        <div className="d-flex justify-content-between">
          <TemplateButton type="submit" disabled={loading} text='Continue' />
          <TemplateButton link="/login" text='Back to Sign in' color='outline-secondary' className='border-1' />
        </div>
      </div>
      </form>
    )}
  </Form>
)}

export default ForgotForm;
