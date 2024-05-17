import React, { useState } from "react";
import { Col, Row, Input, FormGroup, Button } from "reactstrap";
import { Form, Field } from "react-final-form";

const ManageBudgetTable = ({ programs }) => {
  const [month, setMonth] = useState(1);
  const [amount, setAmount] = useState({});

  const handleAmountChange = (id, value) => {
    setAmount((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (values) => {
    values.amount = amount;
    console.log("amount", values);
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
                    <th>july</th>
                    <th>august</th>
                  </tr>
                </thead>
                <tbody>
                  {programs?.map((program) => (
                    <tr key={program.id}>
                      <td>{program.name}</td>
                      <td>
                        <Field name="amount">
                          {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                type="text"
                                placeholder="$ amount"
                                onChange={(event) =>
                                  handleAmountChange(
                                    program.id,
                                    event.target.value
                                  )
                                }
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </td>
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
