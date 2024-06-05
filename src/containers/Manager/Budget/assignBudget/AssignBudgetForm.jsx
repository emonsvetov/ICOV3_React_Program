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
    if (budgetCascadingPrograms) {
      setLoading(true);
      setAssignBudgetProgram(
        patchBudgetCascadingData(
          programs,
          budgetCascadingPrograms,
          isBudgetMonthly
        )
      );
      setLoading(false);
    }
  }, [budgetCascadingPrograms]);

  const onSubmit = (values) => {
    let data = {};
    data.budget_id = budgetId;
    data.budget_type = budgetProgram?.budget_types?.id;
    if (remainingAmount < 0) {
      alert("remaining amount cannot be less than as given available amount");
      return;
    }
    if (isBudgetMonthly) {
      const formattedData = Object.entries(values).map(([key, value]) => {
        const [programId, month, budgetId] = key.split("-");
        return {
          program_id: programId,
          month: month,
          budget_cascading_id: budgetId == undefined ? null : budgetId,
          amount: value == "" ? "0" : value,
        };
      });
      data.budget_amount = unpatchBudgetCascadingData(
        formattedData,
        isBudgetMonthly
      );
    } else {
      data.budget_amount = unpatchBudgetCascadingData(formData);
    }

    console.log(data);
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
          flashError(dispatch, err);
        }
      });
  };

  const flattenInitialValues = (initialValues) => {
    const flattened = {};
    if (isBudgetMonthly) {
      initialValues?.forEach((program) => {
        if (program.budget_data) {
          Object.entries(program.budget_data).forEach(
            ([month, { id, amount }]) => {
              flattened[`${program.id}-${month}-${id}`] = amount;
            }
          );
        }
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
      {assignBudgetPrograms?.length > 0 ? (
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
                          month.map((month) => {
                            const budgetData = program.budget_data
                              ? program?.budget_data[month]
                              : null;
                            const fieldName = budgetData
                              ? `${program.id}-${month}-${budgetData?.id}`
                              : `${program.id}-${month}`;
                            return (
                              <td key={month}>
                                <Field name={fieldName}>
                                  {({ input, meta }) => (
                                    <FormGroup>
                                      <Input
                                        style={{ width: "150px" }}
                                        type="text"
                                        {...input}
                                        placeholder="$ amount"
                                        onChange={(e) => {
                                          form.change(
                                            fieldName,
                                            e.target.value
                                          );
                                          handleAmountChange(
                                            program.id,
                                            e.target.value,
                                            month,
                                            budgetData?.id
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
                            );
                          })
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
