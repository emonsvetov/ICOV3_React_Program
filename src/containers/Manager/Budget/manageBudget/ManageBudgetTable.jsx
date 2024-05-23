import React, { useEffect, useState } from "react";
import { Col, Row, Input, FormGroup, Button } from "reactstrap";
import { Form, Field } from "react-final-form";
import { LensTwoTone } from "@material-ui/icons";

const ManageBudgetTable = ({
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function checkMonth(start, end) {
    let actualMonth = months.slice(
      new Date(start).getMonth(),
      new Date(end).getMonth() + 1
    );
    setMonth(actualMonth);
  }
  useEffect(() => {
    if (budgetProgram) {
      checkMonth(
        budgetProgram?.budget_start_date,
        budgetProgram?.budget_end_date
      );
    }
  }, [budgetProgram]);
  
  const onSubmit = (values) => {
    values.budgetType = id
    values.ManageData = formData;
    console.log("values", values);
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
                    {month.map((m) => (
                      <th key={m}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programs?.map((program) => (
                    <tr key={program.id}>
                      <td>{program.name}</td>
                      {month.map((m) => (
                        <td key={m}>
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
                                      event.target.value,
                                      m
                                    )
                                  }
                                  onBlur={() => handleBlur(program.id, m)}
                                  onFocus={() => handleFocus(program.id, m)}
                                />
                              </FormGroup>
                            )}
                          </Field>
                        </td>
                      ))}
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
