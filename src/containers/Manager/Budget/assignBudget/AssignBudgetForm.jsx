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
  budgetTypes,
}) => {
  const [assignBudgetPrograms, setAssignBudgetProgram] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      budgetProgram &&
      (budgetTypes == "monthly" || budgetTypes == "monthly_rollover")
    ) {
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
      programs?.flatMap((program) => {
        setAssignBudgetProgram(
          patchBudgetCascadingData(
            [program, ...program.children],
            budgetCascadingPrograms,
            budgetTypes
          )
        );
      });
      setLoading(false);
    }
  }, [programs, budgetCascadingPrograms]);

  const onSubmit = (values) => {
    let data = {};
    data.budget_id = budgetId;
    data.budget_type = budgetProgram?.budget_types?.id;
    if (remainingAmount < 0) {
      alert("remaining amount cannot be less than as given available amount");
      return;
    }
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
      data.budget_amount = unpatchBudgetCascadingData(values, budgetTypes);
    } else {
      data.budget_amount = unpatchBudgetCascadingData(values, budgetTypes);
    }

    console.log(data);
    let url = `/organization/${organization?.id}/program/${program?.id}/budgetprogram/${budgetId}/assign`;
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          flashSuccess(dispatch, "Budget assigned successfully");
          window.location.reload();
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
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
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
        if (program?.budget_data) {
          flattened[`${program.id}-${program?.budget_data?.id}-amount`] =
            program?.budget_data?.amount;
        }
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
                      {budgetTypes == "monthly" ||
                      budgetTypes == "monthly_rollover" ? (
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
                        {budgetTypes == "monthly" ||
                        budgetTypes == "monthly_rollover" ? (
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
                          <Field
                            name={`${program.id}-${program?.budget_data?.id}-amount`}
                          >
                            {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  style={{ width: "150px" }}
                                  type="text"
                                  placeholder="$ amount "
                                  {...input}
                                  onChange={(event) => {
                                    form.change(
                                      `${program.id}-${program?.budget_data?.id}-amount`,
                                      event.target.value
                                    );
                                    handleAmountChange(
                                      program.id,
                                      parseFloat(event.target.value),
                                      budgetTypes,
                                      program.budget_cascading_id
                                    );
                                  }}
                                  onBlur={(e) =>
                                    handleBlur(
                                      program.id,
                                      budgetTypes,
                                      e.target.value
                                    )
                                  }
                                  onFocus={(e) =>
                                    handleFocus(
                                      program.id,
                                      budgetTypes,
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
