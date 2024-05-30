import React, { useEffect, useState } from "react";
import { Col, Row, Input, FormGroup, Button, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { findAssignedMonth } from "@/services/program/budget";
import axios from "axios";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";

function patchBudgetCascadingData(
  programs,
  budgetCascadingProgram,
  isBudgetMonthly
) {
  if (programs && budgetCascadingProgram) {
    if (isBudgetMonthly) {
      let result = [];
      return programs?.map((program) => {
        let item2 = budgetCascadingProgram?.find(
          (budgetCascading) => budgetCascading.program_id == program.id
        );
        if (item2) {
          let month = findAssignedMonth(
            item2?.budget_start_date,
            item2?.budget_end_date
          );
          return {
            ...program,
            budget_cascading_id: item2.id,
            amount: item2.budget_amount,
            month: month,
          };
        }
        return program;
      });
      //return result;
    }
  }
}

const AssignBudgetForm = ({
  organization,
  program,
  programs,
  budgetProgram,
  budgetId,
  handleAmountChange,
  formData,
  budgetCascadingProgram,
  month,
  setMonth,
  handleBlur,
  handleFocus,
}) => {
  const [isBudgetMonthly, setIsBudgetMonthhly] = useState(false);
  const [assignBudgetProgram, setAssignBudgetProgram] = useState([]);
  const dispatch = useDispatch();
  console.log("assignBudgetProgram", assignBudgetProgram);
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

  function unpatchBudgetCascadingData(data) {
    if (isBudgetMonthly) {
      const groupedData = data.reduce((acc, current) => {
        const { program_id, month, amount, budget_cascading_id } = current;
        const programIndex = acc.findIndex(
          (item) => item.program_id === program_id
        );
        const budgetEntry = {
          budgets_cascading_id: budget_cascading_id || null,
          year: new Date().getFullYear(),
          month,
          amount,
        };
        if (programIndex === -1) {
          acc.push({
            program_id: program_id,
            budgets: [budgetEntry],
          });
        } else {
          acc[programIndex].budgets.push(budgetEntry);
        }
        return acc;
      }, []);
      return groupedData;
    } else {
      return data;
    }
  }

  // patchBudgetCascadingData();

  useEffect(() => {
    if (programs && budgetCascadingProgram) {
      setAssignBudgetProgram(
        patchBudgetCascadingData(
          programs,
          budgetCascadingProgram,
          isBudgetMonthly
        )
      );
    }
  }, [programs, budgetCascadingProgram]);

  const onSubmit = (values) => {
    let data = {};
    data.budget_id = budgetId;
    data.budget_type = budgetProgram?.budget_types?.id;
    if (isBudgetMonthly) {
      data.budget_amount = unpatchBudgetCascadingData(formData);
    } else {
      data.budget_amount = unpatchBudgetCascadingData(formData);
      console.log("values", data);
    }
    console.log("values", data);
    let url = `/organization/${organization?.id}/program/${program?.id}/budgetprogram/${budgetId}/assign`;
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          flashSuccess(dispatch, "Budget assigned successfully");
        }
      })
      .catch((err) => {
        if (err) {
          flashError(dispatch, err.message);
        }
      });
  };

  const flattenInitialValues = (initialValues) => {
    const flattened = {};
    initialValues?.forEach((program) => {
      program?.month?.forEach((m) => {
        flattened[`${program.id}-${m}`] = program.amount;
      });
    });
    return flattened;
  };
  const initialValues = flattenInitialValues(assignBudgetProgram);
  return (
    <>
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
                  {assignBudgetProgram?.map((program) => (
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
                                      // input.onBlur(e);
                                      handleBlur(
                                        program.id,
                                        month,
                                        e.target.value
                                      );
                                    }}
                                    onFocus={(e) => {
                                      //  input.onFocus(e);
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
                        <Field name="amount">
                          {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                style={{ width: "150px" }}
                                type="text"
                                placeholder="$ amount "
                                onChange={(event) =>
                                  handleAmountChange(
                                    program.id,
                                    event.target.value
                                  )
                                }
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
    </>
  );
};

export default AssignBudgetForm;
