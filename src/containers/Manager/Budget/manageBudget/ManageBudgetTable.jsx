import React, { useEffect, useState } from "react";
import { Col, Row, Input, FormGroup, Button, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { checkMonth } from "@/services/program/budget";
import axios from "axios";

const ManageBudgetTable = ({
  organization,
  program,
  programs,
  budgetProgram,
  id,
  handleAmountChange,
  formData,
  month,
  setMonth,
  handleBlur,
  handleFocus,
}) => {
  const [isBudgetMonthly, setIsBudgetMonthhly] = useState(false);

  useEffect(() => {
    if (budgetProgram && budgetProgram?.budget_types?.name === "monthly") {
      setIsBudgetMonthhly(true);
      setMonth(
        checkMonth(
          budgetProgram?.budget_start_date,
          budgetProgram?.budget_end_date
        )
      );
    }
  }, [budgetProgram]);

  function unpatchBudgetCascadingData(data) {
    if (isBudgetMonthly) {
      const groupedData = data.reduce((acc, current) => {
        const { programId, month, amount } = current;
        const programIndex = acc.findIndex((item) => item.program === programId);
        const budgetEntry = {
          budgets_cascading_id: null,
          year: "2024",
          month,
          amount,
        };
        if (programIndex === -1) {
          acc.push({
            "program":programId,
            budgets: [budgetEntry],
          });
        } else {
          acc[programIndex].budgets.push(budgetEntry);
        }
        return acc;
      }, []);
     return groupedData
    }
  }

  const onSubmit = (values) => {
    values.budget_type = budgetProgram?.budget_types?.id;
    values.budget_amount = unpatchBudgetCascadingData(formData);
    console.log("values", values);
    let url = `/organization/${organization?.id}/program/${program?.id}/budgetprogram/${id}/assign`;
    axios
      .post(url, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
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
                  {programs?.map((program) => (
                    <tr key={program.id}>
                      <td>{program.name}</td>
                      {isBudgetMonthly ? (
                        month.map((m) => (
                          <td key={m}>
                            <Field name={`${program.id}_${month}`}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <Input
                                    style={{ width: "150px" }}
                                    type="text"
                                    placeholder="$ amount"
                                    onChange={(event) =>
                                      handleAmountChange(
                                        program.id,
                                        event.target.value,
                                        m
                                      )
                                    }
                                    onBlur={(e) =>
                                      handleBlur(program.id, m, e.target.value)
                                    }
                                    onFocus={(e) =>
                                      handleFocus(program.id, m, e.target.value)
                                    }
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
                                placeholder="$ amount"
                                onChange={(event) =>
                                  handleAmountChange(
                                    program.id,
                                    event.target.value
                                  )
                                }
                                onBlur={() => handleBlur(program.id)}
                                onFocus={() => handleFocus(program.id)}
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

export default ManageBudgetTable;
