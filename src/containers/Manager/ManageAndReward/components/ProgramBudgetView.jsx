import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import axios from "axios";

const ProgramBudgetView = ({ organization, program }) => {
  const [currentBudget, setCurrentBudget] = useState(null);

  useEffect(() => {
    if (organization?.id && program?.id) {
      axios
        .get(
          `organization/${organization.id}/program/${program.id}/budgetprogram/currentbudget`
        )
        .then((response) => {
          setCurrentBudget(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organization, program]);

  return (
    <div className="bg-white p-2 rounded">
      {program.use_cascading_approvals > 0 && (
        <div>
          <Link to="#">
            <b style={{ fontSize: "18px", marginLeft: "25px", color: "blue" }}>
              Number of Awards to approve: 0
            </b>
          </Link>
        </div>
      )}
      {program.budget_summary > 0 && (
        <div>
          <Row>
            <div className="d-flex flex-md-row">
              <h6 className="d-inline">Monthly</h6>
              <div className="ms-4 d-flex flex-md-row w-100">
                {currentBudget?.current_month_budget.length > 0 ? (
                  currentBudget?.current_month_budget?.map((budget) => {
                    return (
                      <>
                        <Col>Budget: ${budget.budget_amount}</Col>
                        <Col>
                          Awaiting: ${budget.budget_awaiting_approval || 0}
                        </Col>
                        <Col>Remaining: ${budget.budget_amount_remaining}</Col>
                        <Col>
                          Award Distributed: ${budget.budget_amount_remaining}
                        </Col>
                      </>
                    );
                  })
                ) : (
                  <p>No budget available for current month</p>
                )}
              </div>
            </div>
          </Row>
          <Row>
            <div className="d-flex flex-md-row">
              <h6>Yearly</h6>
              <div
                className="ms-4 d-flex flex-md-row w-100"
                style={{ paddingLeft: "15px" }}
              >
                {currentBudget?.current_year_budget.length > 0 ? (
                  currentBudget?.current_year_budget?.map((budget) => {
                    return (
                      <>
                        <Col>Budget: ${budget.budget_amount}</Col>
                        <Col>
                          Awaiting: ${budget.budget_awaiting_approval || 0}
                        </Col>
                        <Col>Remaining: ${budget.budget_amount_remaining}</Col>
                        <Col>
                          Award Distributed: ${budget.budget_amount_remaining} || 0
                        </Col>
                      </>
                    );
                  })
                ) : (
                  <p>No budget available for current yearly</p>
                )}
              </div>
            </div>
          </Row>
        </div>
      )}
      {
        <Row>
          <Col>
            <div className="d-flex gap-5">
              <h6 className="d-inline">Awards Pending: $0</h6>
              <h6 className="d-inline">Awards Schedule: $0</h6>
            </div>
          </Col>
        </Row>
      }
    </div>
  );
};

export default ProgramBudgetView;
