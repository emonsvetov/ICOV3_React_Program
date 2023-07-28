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
import { getTransferMonies, postTransferMonies } from "@/services/program/transferMonies";
import TransferMoniesConfirm from './TransferMoniesConfirm';
import MoneyTransferTemplate from './MoneyTransferTemplate';
import { isEmpty } from "@/shared/helpers";

const TransferMoneyForm = ({
  toggle:parentToggle,
  program,
  rootProgram,
  btnLabel = "Transfer Money",
}) => {

  const dispatch = useDispatch();

  const toggle = () => {
    setOpen(prev => !prev)
  }

  const [isOpen, setOpen] = useState(false);

  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [amounts, setAmounts] = useState( null );

  const [pId, setpId] = useState(program.id);

  const onProgramChange = (e) => {
    console.log("On program change")
    setpId(e.target.value);
  }

  const orgId = data?.program?.organization_id ? data.program.organization_id : (program?.organization_id ? program.organization_id : null);

  useEffect(() => {
    if (rootProgram && rootProgram?.id && pId) {
      getTransferMonies(rootProgram.organization_id, pId)
        .then( response => {
            // console.log(response)
            setData(response);
            setLoading(false)
        })
        .catch( error => {
            // console.log(error)
            setLoading(false)
        })
    }
  }, [rootProgram, pId]);

  const onConfirmTransferMonies = () => {
      if( isEmpty(amounts) ) {
        console.log("Empty amount");
        return;
      }
      let amountData = {}
      for (const [key, amount] of Object.entries(amounts)) {
          if( amount !== "" ) {
              if( !isNaN(amount) ) {
                  const programId = key.replace("amounts_", "")
                  amountData[programId] = parseFloat(amount)
              }
          }
      }
      // console.log(pId);
      // console.log(amountData);
      // console.log(data);
      // console.log(orgId)
      // console.log(pId)
      // return;
      // console.log(Object.keys(data).length)
      if(Object.keys(amountData).length > 0) {
          const formData = {
              "amounts": amountData
          }
          postTransferMonies(orgId, pId, formData)
          .then( response => {
              // console.log(response)
              // setData(response);
              if( response.success )  {
                  flashSuccess(dispatch, "Monies Transfer Completed")
                  const newData = {...data, ...{balance: response.balance}}
                  // console.log(newData)
                  setData(newData)
                  setAmounts(null)
                  toggle()
                  parentToggle()
              }
              setLoading(false)
          })
          .catch( error => {
              console.log(error)
              flashError(dispatch, error)
              setLoading(false)
          })
      }
  }
  const onClickTransferMonies = values => {
    console.log(values)
    if( !isEmpty(values) )    {
      for (const [key, amount] of Object.entries(values)) {
        if( key == "amounts_" + pId ) { //skip selected program and empty fields
          delete values[key];
        }
      }
      setAmounts(values)
      toggle()
    }
  }
  const BuildProgramOptions = ({programs, depth = 0}) => {
    let optionsHtml = []
    if( programs.length > 0) {
        programs.flatMap( p => {
          optionsHtml.push(<div key={`program-optiosn-singe-${p.id}`}>
            <Row>
              <Col md="6">{p.name}</Col>
              <Col md="6">
                <Field name={`amounts_${p.id}`}>
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
          </div>)
        })
    }
    return optionsHtml
  }
  const validate = values => {
    // console.log(values)
    let errors = {}
    let total = 0
    for (const [key, amount] of Object.entries(values)) {
      // console.log(key)
      if( amount !== "" && key !== "amounts_" + pId ) { //skip selected program and empty fields
        if( isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 ) {
            errors[key] = "Please enter a valid amount"
        } else {
          total += parseFloat(amount)
        }
      }
    }
    // console.log(total)
    // console.log(data.balance)
    if( total > data.balance)  {
      errors['total'] = 'Total exceeds program balance $' + parseFloat(data.balance).toFixed(2)
    }
    return errors;
  }
  if( !data ) return 'Loading...'

  const mtProps = {
    pId, orgId
  }

  return (
    <>
      <Form
        onSubmit={onClickTransferMonies}
        validate={validate}
        initialValues={amounts}
        keepDirtyOnReinitialize
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className="form d-flex flex-column justify-content-evenly"
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <label className="text-bold">1. Select Program to transfer money from:</label>
              <SelectProgram hideLabel={true} showRefresh={false} selected={pId} onChange={onProgramChange} />
              <h6 className="my-2">Available Balance: ${parseFloat(data.balance).toFixed(2)}</h6>
            </FormGroup>
            {(parseFloat(data.balance) > 0) && 
            <>
              <label className="text-bold">2. Enter the amount to transfer to each Program</label>
              <Row>
                <Col md="6"><span>Program</span></Col>
                <Col md="6"><span> Amount to transfer</span></Col>
              </Row>
              <BuildProgramOptions programs={data.programs} key={'key-build-program-options-0'}  />
              <Field name={`total`}>
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="$"
                        type="hidden"
                        {...input}
                      />
                      {meta.touched && meta.error && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                  </Field>
              <div className="d-flex justify-content-end">
                <TemplateButton disabled={loading} type="submit" text={btnLabel} />
              </div>
            </>}

            <h5>- OR -</h5>

            <MoneyTransferTemplate {...mtProps} />
          </form>
          
        )}
      </Form>
      <TransferMoniesConfirm programs={data.programs} amounts={amounts} action={onConfirmTransferMonies} isOpen={isOpen} setOpen={setOpen} toggle={toggle} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    rootProgram: state.rootProgram,
  };
};

export default connect(mapStateToProps)(TransferMoneyForm);
