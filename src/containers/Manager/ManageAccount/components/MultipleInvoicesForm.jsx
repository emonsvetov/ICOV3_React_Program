import { Input, Col, Row, FormGroup, Label, Button } from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useState } from "react";
import axios from "axios";

// import renderToggleButtonField from "@/shared/components/form/ToggleButton"
// import { BuildProgramOptions } from '@/shared/helpers';
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
// import formValidation from "@/validation/addReferralNotificationRecipient"
import TemplateButton from "@/shared/components/TemplateButton";
// import { getProgram } from "@/services/program/getProgram";


// const getCachedProgramTree = (tree) => {
//   return localStorage.getItem(AUTH_SELECT_PROGRAM_TREE);
// }

const MultipleInvoiceForm = ({
 
  toggle,
  program,
  btnLabel = "Create Multipe Invoices",
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = (values) => {
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

  const BuildProgramOptions = ({programs, depth = 0}) => {
    let optionsHtml = []
    if( programs.length > 0) {
        programs.map( p => {
            optionsHtml.push(<option key={`program-option-${p.id}`} value={`${p.id}`}>{'-'.repeat(depth)} {p.name}</option>)
            if( p?.children && p.children.length > 0)   {
                depth++;
                optionsHtml.push(<BuildProgramOptions key={`program-option-group-${p.id}`} programs={p.children} depth={depth} />)
            }
        })
    }
    return optionsHtml
}



 
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
          <Input
          type="select"
          value={program.id}
          name="program"
          id="program-select"
          
        >
          <BuildProgramOptions />
        </Input>
          <Row>
            <Col md="4">
              <b>Program</b>
            </Col>
            <Col md="4">
              <b>*Amount</b>
            </Col>
            <Col md="4">
              <b>*Confirm Amount</b>
            </Col>
          </Row>

          <Row>
            <Col>:</Col>
            <Col md="4">
              <Field name="amount">
                {({ input, meta }) => (
                  <FormGroup>
                    <Input placeholder="$" type="text" {...input} />
                    {meta.touched && meta.error && (
                      <span className="text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field>
            </Col>
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
              </Field>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <TemplateButton disabled={loading} type="submit" text={btnLabel} />
          </div>
        </form>
      )}
    </Form>
  );
};

export default MultipleInvoiceForm;
