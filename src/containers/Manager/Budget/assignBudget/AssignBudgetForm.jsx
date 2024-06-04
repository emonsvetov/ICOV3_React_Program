import React, { useEffect, useState } from "react";
import { Col, Row, Input, FormGroup, Button } from "reactstrap";
import { Form, Field } from "react-final-form";
import {
  findAssignedMonth,
  patchBudgetCascadingData,
  unpatchBudgetCascadingData,
} from "@/services/program/budget";
import axios from "axios";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";

const AssignBudgetForm = ({
  organization,
  program,
  programs,
  budgetProgram,
  budgetId,
  handleAmountChange,
  formData,
  budgetCascadingPrograms,
  month,
  setMonth,
  handleBlur,
  handleFocus,
  remainingAmount,
}) => {
  const [isBudgetMonthly, setIsBudgetMonthhly] = useState(false);
  const [assignBudgetPrograms, setAssignBudgetProgram] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (budgetProgram && budgetProgram?.budget_types?.name === "monthly") {
      setIsBudgetMonthhly(true);
      setMonth(
        findAssignedMonth(
          budgetProgram?.budget_start_date,
          budgetProgram?.budget_end_date
        )
      );
    }
  }, [budgetProgram]);

  useEffect(() => {
    if (programs && budgetCascadingPrograms) {
      setLoading(true);
      setAssignBudgetProgram(
        patchBudgetCascadingData(
          programs,
          budgetCascadingPrograms,
          isBudgetMonthly,
          budgetProgram
        )
      );
      setLoading(false);
    }
  }, [programs, budgetCascadingPrograms]);

  const onSubmit = (values) => {
    let data = {};
    data.budget_id = budgetId;
    data.budget_type = budgetProgram?.budget_types?.id;
    data.remaining_amount = remainingAmount;
    if (remainingAmount < 0) {
      alert("remaining amount cannot be less than as given available amount");
      return;
    }
    if (isBudgetMonthly) {
      data.budget_amount = unpatchBudgetCascadingData(
        formData,
        isBudgetMonthly
      );
    } else {
      data.budget_amount = unpatchBudgetCascadingData(formData);
    }
    console.log(data);
    // let url = `/organization/${organization?.id}/program/${program?.id}/budgetprogram/${budgetId}/assign`;
    // axios
    //   .post(url, data)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       flashSuccess(dispatch, "Budget assigned successfully");
    //     }
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       flashError(dispatch, err);
    //     }
    //   });
  };

  const flattenInitialValues = (initialValues) => {
    const flattened = {};
    if (isBudgetMonthly) {
      initialValues?.forEach((program) => {
        program?.month?.forEach((m) => {
          flattened[`${program.id}-${m}`] = program.amount;
        });
      });
      return flattened;
    } else {
      initialValues?.map((program) => {
        flattened[`${program.id}-amount`] = program.amount;
      });
      return flattened;
    }
  };

  const initialValues = flattenInitialValues(assignBudgetPrograms);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {programs && assignBudgetPrograms ? (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div style={{ overflowY: "auto", maxHeight: "250px" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Program</th>
                      {isBudgetMonthly ? (
                        month.map((m) => <th key={m}>{m}</th>)
                      ) : (
                        <th>Budget Amount</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {assignBudgetPrograms?.map((program) => (
                      <tr key={program.id}>
                        <td>{program.name}</td>
                        {isBudgetMonthly ? (
                          month.map((month) => (
                            <td key={month}>
                              <Field name={`${program.id}-${month}`}>
                                {({ input, meta }) => (
                                  <FormGroup>
                                    <Input
                                      style={{ width: "150px" }}
                                      type="text"
                                      {...input}
                                      placeholder="$ amount"
                                      onChange={(e) => {
                                        form.change(
                                          `${program.id}-${month}`,
                                          e.target.value
                                        );
                                        handleAmountChange(
                                          program.id,
                                          e.target.value,
                                          month,
                                          program.budget_cascading_id
                                        );
                                      }}
                                      onBlur={(e) => {
                                        handleBlur(
                                          program.id,
                                          month,
                                          e.target.value
                                        );
                                      }}
                                      onFocus={(e) => {
                                        handleFocus(
                                          program.id,
                                          month,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </FormGroup>
                                )}
                              </Field>
                            </td>
                          ))
                        ) : (
                          <Field name={`${program.id}-amount`}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  style={{ width: "150px" }}
                                  type="text"
                                  placeholder="$ amount "
                                  {...input}
                                  onChange={(event) => {
                                    form.change(
                                      `${program.id}-amount`,
                                      event.target.value
                                    );
                                    handleAmountChange(
                                      program.id,
                                      parseFloat(event.target.value),
                                      isBudgetMonthly,
                                      program.budget_cascading_id
                                    );
                                  }}
                                  onBlur={(e) =>
                                    handleBlur(
                                      program.id,
                                      isBudgetMonthly,
                                      e.target.value
                                    )
                                  }
                                  onFocus={(e) =>
                                    handleFocus(
                                      program.id,
                                      isBudgetMonthly,
                                      e.target.value
                                    )
                                  }
                                />
                              </FormGroup>
                            )}
                          </Field>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Row className="d-flex justify-content-end">
                <Col>
                  {" "}
                  <Button type="submit" size="sm">
                    Assign Budget
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Form>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default AssignBudgetForm;
