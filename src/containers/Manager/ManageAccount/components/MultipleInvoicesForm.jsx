import { Input, Table, Col, Row, FormGroup, Button } from "reactstrap";
import { Form, Field } from "react-final-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import FilePdfBoxIcon from 'mdi-react/FilePdfBoxIcon';

import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";

import TemplateButton from "@/shared/components/TemplateButton";
import { getSetProgramTree } from "@/services/program/getProgramTree";

const MultipleInvoiceForm = ({
  rootProgram,
  toggle,
  auth,
  program,
  btnLabel = "Create Multiple Invoices",
}) => {
  // console.log(rootProgram)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [createdInvoices, setCreatedInvoices] = useState([]);
  // console.log('AA gya data',options);

  useEffect(() => {
    if (rootProgram && rootProgram?.id) {
      getSetProgramTree(false, rootProgram.organization_id, rootProgram.id).then(
        (p) => {
          // console.log(p)
          setPrograms(p);
        }
      );
    }
  }, [rootProgram]);

  const validatedValues = (values) => {
    if (
      typeof values["amount"] == "undefined" ||
      typeof values["amount_confirmation"] == "undefined"
    )
      return;
    let validated = [];
    values["amount"].forEach((amount, pId) => {
      if (parseFloat(amount) > 0) {
        if (typeof values["amount_confirmation"] == "undefined") {
          return;
        } else if (typeof values["amount_confirmation"][pId] == "undefined") {
          return;
        } else if (
          parseFloat(amount) !== parseFloat(values["amount_confirmation"][pId])
        ) {
          return;
        }
        validated.push({
          pId,
          amount: parseFloat(amount),
          amount_confirmation: parseFloat(values["amount_confirmation"][pId]),
        });
      }
    });
    return validated;
  };

  const onSubmitMulti = async (values) => {
    const validated = validatedValues(values);
    if (!validated.length > 0) return;
    let submitted = 0;
    let result = [];
    // console.log(validated)
    setLoading(true);
    // setCreatedInvoices([])
    for (const invoice of validated) {
      // console.log(invoice)
      const res = await submitSingleInvoice(
        {
          amount: invoice.amount,
          amount_confirmation: invoice.amount_confirmation,
        },
        invoice.pId
      );
      result.push(res);
      submitted++;
      // console.log("In loop" + submitted);
    }
    // console.log("At End: Total: " + submitted);
    // console.log(result);
    if (submitted >= validated.length) {
      flashSuccess(dispatch, `${submitted} invoices created successfully!`);
      setLoading(false);
      // setTimeout(toggle, 500);
      setCreatedInvoices(result);
      // setTimeout(() => window.location.reload(), 2000);
      // toggle();
    }
  };

  const submitSingleInvoice = async (formData, pId) => {
    // console.log(formData)
    // console.log(pId);
    // await new Promise(r => setTimeout(r, 2000));
    // return;
    // return;
    let url = `organization/${program.organization_id}/program/${pId}/invoice/on-demand`;

    return axios
      .post(url, formData)
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          return res.data;
        }
      })
      .catch((err) => {
        flashError(dispatch, err.response.data);
        setLoading(false);
      });
  };

  const BuildProgramOptions = ({ programs, depth = 0 }) => {
    let optionsHtml = [];
    if (programs.length > 0) {
      programs.map((p) => {
        // console.log(first)
        optionsHtml.push(
          <div key={`programOption-${p.id}`}>
            <Row>
              <Col md="4">{p.name}</Col>
              <Col md="4">
                <Field name={`amount[${p.id}]`}>
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
                <Field name={`amount_confirmation[${p.id}]`}>
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
            </Row>
          </div>
        );
        if (p?.children && p.children.length > 0) {
          optionsHtml.push(
            <BuildProgramOptions
              key={`program-option-group-${p.id}`}
              programs={p.children}
            />
          );
        }
      });
    }
    return optionsHtml;
  };

  const validate = (values) => {
    if (typeof values["amount"] == "undefined") return;
    let errors = { amount: [], amount_confirmation: [] };
    values["amount"].forEach((amount, pId) => {
      // console.log(pId)
      // console.log(amount)
      if (parseFloat(amount) > 0) {
        if (typeof values["amount_confirmation"] == "undefined") {
          errors["amount_confirmation"][pId] = "confirm amount";
        } else if (typeof values["amount_confirmation"][pId] == "undefined") {
          errors["amount_confirmation"][pId] = "confirm amount";
        } else if (
          parseFloat(amount) !== parseFloat(values["amount_confirmation"][pId])
        ) {
          errors["amount_confirmation"][pId] = "amount mismatch";
        }
      }
    });
    return errors;
  };

  const onClickCreateInvoices = () => {
    setCreatedInvoices([]);
  }

  const CreateInvoicesBtn = () => {
    return <div>
      <TemplateButton
        onClick={() => onClickCreateInvoices()}
        text={t('Create more invoices')}
      />
    </div>
  }

  // console.log(programs)

  if (createdInvoices?.length > 0) {
    return <>
      <MultipleInvoicesCreated invoices={createdInvoices} />
      <CreateInvoicesBtn />
    </>
  }

  return (
    <Form onSubmit={onSubmitMulti} validate={validate}>
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
          <BuildProgramOptions programs={programs} />
          <div className="d-flex justify-content-end">
            <TemplateButton disabled={loading} type="submit" text={btnLabel} />
          </div>
        </form>
      )}
    </Form>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    rootProgram: state.rootProgram,
  };
};

const MultipleInvoicesCreated = ({ invoices }) => {
  const { t } = useTranslation();
  if (!invoices) return null;
  if (invoices.length <= 0) return null;

  const onClickDownloadInvoice = (invoice) => {
    // console.log(props)
    // console.log(invoice)
    axios
      .get(
        `/organization/${invoice.program.organization_id}/program/${invoice.program_id}/invoice/${invoice.id}/download`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${invoice.invoice_number}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <p>{invoices.length} invoices created.</p>
      <div className="multiInvoiceCreateTable">
        <Table className="table table-borderless table-striped">
          <thead>
            <tr>
              <th key={`header-0`}>{t("#")}</th>
              <th key={`header-1`}>{t("Program")}</th>
              <th key={`header-2`}>{t("Invoice Number")}</th>
              <th key={`header-3`}>{t("Amount")}</th>
              <th key={`header-4`}>{t("")}</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, i) => {
              return (
                <tr key={`row-${i}`}>
                  <td>{i + 1}</td>
                  <td>{item.program.name}</td>
                  <td>{item.invoice_number}</td>
                  <td>{item.amount}</td>
                  <td>
                    <FilePdfBoxIcon className="link" onClick={()=>onClickDownloadInvoice(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(MultipleInvoiceForm);
