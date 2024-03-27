import { Input, Col, Row, FormGroup } from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import renderToggleButtonField from "@/shared/components/form/ToggleButton"

import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
// import formValidation from "@/validation/addReferralNotificationRecipient"
import TemplateButton from "@/shared/components/TemplateButton";
import SelectProgram from "../../components/SelectProgram";

const CreateInvoiceForm = ({ toggle, setOpen, program, btnLabel = "Save" }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pId, setpId] = useState(program.id);
  let navigate = useNavigate();

  const onProgramChange = (e) => {
    // console.log(e.target.value)
    setpId(e.target.value);
    // console.log("on program change")
  };

  const invalidAmount = (v) => {
    return (
      typeof v == "undefined" || isNaN(parseFloat(v)) || parseFloat(v) <= 0
    );
  };

  const validate = (values) => {
    let errors = {};
    // console.log(validAmount(values['amount']))
    if (invalidAmount(values["amount"])) {
      errors["amount"] = "enter amount";
    } else if (invalidAmount(values["amount_confirmation"])) {
      errors["amount_confirmation"] = "confirm amount";
    } else if (
      parseFloat(values["amount"]) !== parseFloat(values["amount_confirmation"])
    ) {
      errors["amount_confirmation"] = "amount mismatch";
    }
    return errors;
  };

  const onSubmit = (values) => {
    // console.log('data aa gya', values)
    if (!pId) {
      console.log("pId not set");
      return;
    }

    let formData = {};
    formData.amount = values?.amount;
    formData.amount_confirmation = values?.amount_confirmation;

    let url = `organization/${program.organization_id}/program/${pId}/invoice/on-demand`;

    setLoading(true);
    axios
      .post(url, formData)
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "Invoice created successfully!");
          setLoading(false);
          // window.location.reload()
          setOpen((prev) => !prev);
          navigate(`/manager/manage-account/invoice/${res.data.id}`);
        }
      })
      .catch((err) => {
        flashError(dispatch, err.response.data);
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={onSubmit} validate={validate} initialValues={{}}>
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          className="form d-flex flex-column justify-content-evenly"
          onSubmit={handleSubmit}
        >
          <Row>
            <Col md="12">
              <Field name="program">
                {({ input, meta }) => (
                  <FormGroup>
                    <SelectProgram
                      showRefresh={false}
                      selected={pId}
                      onChange={onProgramChange}
                    />
                  </FormGroup>
                )}
              </Field>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Field name="amount">
                {({ input, meta }) => (
                  <FormGroup>
                    <Input placeholder="$ Amount" type="text" {...input} />
                    {meta.touched && meta.error && (
                      <span className="text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Field name="amount_confirmation">
                {({ input, meta }) => (
                  <FormGroup>
                    <Input
                      placeholder="$ Confirm Amount"
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

export default CreateInvoiceForm;
