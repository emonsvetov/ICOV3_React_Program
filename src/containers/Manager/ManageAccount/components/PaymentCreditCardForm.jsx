import { Input, Col, Row, FormGroup} from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
import TemplateButton from "@/shared/components/TemplateButton";
import SelectProgram from "../../components/SelectProgram";
import { isEmpty } from "@/shared/helpers";
import PaymentCreditCardStep_1 from "./PaymentCreditCardStep1Form";


const PaymentCreditCardForm = ({
  toggle: parentToggle,
  program,
  btnLabel,
}) => {
  const toggle = () => {
    setOpen(prev => !prev)
  }

  const [isOpen, setOpen] = useState(false);
  const [amount, setAmount] = useState( null );

  const [pId, setpId] = useState(program.id);

  const onProgramChange = (e) => {
    setpId(e.target.value);
  }

  const orgId = program?.organization_id ? program.organization_id : null;
  const onClickTransferMonies = values => {
    console.log(values)
    if( !isEmpty(values) )    {
      setAmount(values.amount)
      toggle()
    }
  }
 
  const validate = values => {
    let errors = {}
    if( isEmpty(values) ) {
      errors['amount'] = "Please enter an amount"
    } else if( isNaN(parseFloat(values.amount)) || parseFloat(values.amount) <= 0 ) {
        errors['amount'] = "Please enter a valid amount"
    }
    return errors;
  }
  if( !orgId ) return 'Loading...'

  const step2props = {
    amount, isOpen, setOpen, toggle, pId, orgId
  }

  // console.log(step2props)

  return (
    <>
      <Form
        onSubmit={onClickTransferMonies}
        validate={validate}
        // initialValues={amount}
        keepDirtyOnReinitialize
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className="form d-flex flex-column justify-content-evenly"
            onSubmit={handleSubmit}
          >
            <h3 className="text-bold">Credit Card Deposit</h3>
            <div className="form__form-group">
              <span className="form__form-group-label">Select Program</span>
              <div className="form__form-group-field">
                <SelectProgram label="" showRefresh={false} selected={pId} onChange={onProgramChange} />
              </div>
            </div>
            <Field name={`amount`}>
              {({ input, meta }) => (
                <div className="form__form-group">
                  <span className="form__form-group-label">*Amount</span>
                  <div className="form__form-group-field"><Input placeholder="Amount" type="text" {...input} />
                  {meta.touched && meta.error && (
                    <span className="text-danger">{meta.error}</span>
                  )}
                  </div>
                </div>
              )}
            </Field>
            <div className="d-flex justify-content-end">
              <TemplateButton type="submit" text={btnLabel} />
            </div>
          </form>
        )}
      </Form>
      <PaymentCreditCardStep_1  {...step2props} />
 
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    rootProgram: state.rootProgram,
  };
};

export default connect(mapStateToProps)(PaymentCreditCardForm);
