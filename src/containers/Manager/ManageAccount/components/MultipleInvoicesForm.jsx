import { Input, Col, Row, FormGroup } from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { AUTH_SELECT_PROGRAM_TREE } from "@/containers/App/auth";
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";

import TemplateButton from "@/shared/components/TemplateButton";
import { getProgramTree } from "@/services/program/getProgramTree";



const getCachedProgramTree = (tree) => {
  return localStorage.getItem(AUTH_SELECT_PROGRAM_TREE);
}



const MultipleInvoiceForm = ({
  rootProgram,
  toggle,
  auth,
  program,
  btnLabel = "Create Multipe Invoices",
}) => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  // console.log('AA gya data',options);

  useEffect(() => {
    const cachedTree = getCachedProgramTree()
    if( cachedTree ) {
      setOptions(JSON.parse(cachedTree));
    } else {
      if (rootProgram && rootProgram?.id) {
        getProgramTree(auth.organization_id, rootProgram.id).then((p) => {
         
          setOptions(p);
        });
      }
    }
  }, [rootProgram]);
  const onSubmit = (values) => {
    console.log(values, "done");
    // // console.log('edit')
    let formData = {};
    formData.amount = values?.amount;
    formData.amount_confirmation = values?.amount_confirmation;

    console.log(formData);

    let url = `organization/${program.organization_id}/program/${program.id}/invoice/on-demand`;
    setLoading(true);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          flashSuccess(dispatch, "Multiple invoiced created successfully!");
          setLoading(false);
          window.location.reload();
          toggle();
        }
      })
      .catch((err) => {
        flashError(dispatch, err.response.data);
        setLoading(false);
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      // validate={(values) => formValidation.validateForm(values)}
    >
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          className="form d-flex flex-column justify-content-evenly"
          onSubmit={handleSubmit}
        >
          <Row>
                <Col md="4">Program</Col>
          
                <Col md="4">Amount</Col>
            
                <Col md="4">Confirm Amount</Col>
              </Row>
          {options.map((program) => (
            <div>
              <Row>
                <Col md="4">{program.name}</Col>
                <Col md="4">
                <Field name="amount">
                {({ input, meta }) => (
                  <FormGroup>
                    <Input
                      placeholder="$"
                      type="text"
                      {...input}
                    />
                    {meta.touched && meta.error && (
                      <span className="text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field></Col>
              <Col md="4">
                <Field name="amount_confirmation">
                {({ input, meta }) => (
                  <FormGroup>
                    <Input
                      placeholder="$"
                      type="text"
                      {...input}
                    />
                    {meta.touched && meta.error && (
                      <span className="text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field></Col>
              </Row>
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <TemplateButton disabled={loading} type="submit" text={btnLabel} />
          </div>
        </form>
      )}
    </Form>
  );
};

export default MultipleInvoiceForm;
