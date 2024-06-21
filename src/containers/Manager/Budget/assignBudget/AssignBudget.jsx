import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import BudgetTemplate from "../budgetTemplate/BudgetTemplate";
import { getProgramTree } from "@/services/program/getProgramTree";
import AssignBudgetForm from "./AssignBudgetForm";
import { useParams } from "react-router-dom";
import {
  getBudgetProgram,
  getBudgetCascadings,
} from "@/services/program/budget";
import SelectProgram from "../../components/SelectProgram";
import { flashError, useDispatch } from "@/shared/components/flash";

const AssignBudget = ({ organization, program, rootProgram }) => {
  const [budgetProgram, setBudgetProgram] = useState({});
  const [budgetCascadingPrograms, setBudgetCascadingProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState("");
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [budgetTypes, setBudgetTypes] = useState("");
  const [previousValues, setPreviousValues] = useState({});
  const { budgetId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (organization && rootProgram) {
      getProgramTree(organization.id, rootProgram.id).then((p) => {
        setPrograms(p);
      });
    }
  }, [organization, rootProgram]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id && budgetId) {
      setLoading(true);
      getBudgetProgram(organization.id, rootProgram.id, budgetId).then(
        (res) => {
          setBudgetProgram(res);
          setRemainingAmount(res.remaining_amount);
          setBudgetTypes(res?.budget_types?.name);
          setLoading(false);
        }
      );
    }
  }, [organization, rootProgram, budgetId]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id && budgetId) {
      getBudgetCascadings(organization?.id, rootProgram?.id, budgetId)
        .then((res) => {
          setBudgetCascadingProgram(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [organization, rootProgram, budgetId]);

  const handleAmountChange = (programId, value, month, budget_cascading_id) => {
    //const amount = value || 0;
    if (budgetTypes === "monthly") {
      setFormData((prevAmounts) => {
        let newAmounts = [...prevAmounts];
        const index = newAmounts.findIndex(
          (item) => item.program_id === programId && item.month === month
        );
        if (index === -1) {
          if (value === "") {
            // If the input value is empty, remove the value from the array
            newAmounts.splice(index, 1);
          } else {
            newAmounts.push({
              program_id: programId,
              month,
              amount: value,
              budget_cascading_id: budget_cascading_id || null,
            });
          }
        } else {
          if (value === "") {
            // If the input value is empty, remove the value from the array
            newAmounts.splice(index, 1);
          } else {
            newAmounts[index].amount = value;
          }
        }
        return newAmounts;
      });
    } else {
      setFormData((prevAmounts) => {
        let newAmounts = [...prevAmounts];
        const index = newAmounts.findIndex(
          (item) => item.program_id === programId
        );

        if (index === -1) {
          if (value === "") {
            newAmounts.splice(index, 1);
          } else {
            newAmounts.push({
              budgets_cascading_id: budget_cascading_id || null,
              program_id: programId,
              budget_start_date: budgetProgram.budget_start_date,
              budget_end_date: budgetProgram.budget_end_date,
              amount: value,
            });
          }
        } else {
          if (value === "") {
            newAmounts.splice(index, 1);
          } else {
            newAmounts[index].amount = value;
          }
        }
        return newAmounts;
      });
    }
  };

  const handleFocus = (programId, month, amount) => {
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
      setPreviousValues((prevState) => ({
        ...prevState,
        [`${programId}-${month}`]: amount,
      }));
    } else {
      setPreviousValues((prevState) => ({
        ...prevState,
        [`${programId}`]: amount,
      }));
    }
  };

  useEffect(() => {
    if (remainingAmount < 0) {
      flashError(
        dispatch,
        "remaining amount cannot be less than as given available amount"
      );
    }
  }, [remainingAmount]);
  function onBlurUpdateRemainingAmount(programId, month, newValue) {
    const currentValue = newValue || 0;
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
      const prevValue = previousValues[`${programId}-${month}`] || 0;
      const valueDifference = currentValue - prevValue;
      setRemainingAmount((prevAmount) => prevAmount - valueDifference);
      setPreviousValues((prevState) => {
        const { [`${programId}-${month}`]: removed, ...rest } = prevState;
        return rest;
      });
    } else {
      const prevValue = previousValues[`${programId}`] || 0;
      const valueDifference = currentValue - prevValue;
      setRemainingAmount((prevAmount) => prevAmount - valueDifference);
      setPreviousValues((prevState) => {
        const { [`${programId}`]: removed, ...rest } = prevState;
        return rest;
      });
    }
  }
  if (loading) return "Loading...";
  if (budgetId && budgetProgram) {
    return (
      <div className="m-1 bg-light p-3 rounded">
        <Container>
          <div>
            <h4>Manage Budget</h4>
          </div>
          <div className="d-flex program-select my-3 p-2 rounded">
            <SelectProgram showRefresh={false} />
          </div>
          <div className=" p-2" style={{ borderStyle: "groove" }}>
            <Row>
              <Col>Total Budget:</Col>
              <Col>
                <span>{budgetProgram?.budget_amount}</span>
              </Col>
            </Row>
            <Row>
              <Col>Available To Allocate: </Col>
              <Col
                className={remainingAmount < 0 ? "text-danger" : "text-black"}
              >
                <span>{remainingAmount}</span>
              </Col>
            </Row>
            <Row>
              <Col>Budget Type:</Col>
              <Col>
                <span>{budgetProgram?.budget_types?.title}</span>
              </Col>
            </Row>
            <Row>
              <Col>Start Date:</Col>
              <Col>
                <span>{budgetProgram?.budget_start_date}</span>
              </Col>
            </Row>
            <Row>
              <Col>End Date:</Col>
              <Col>
                <span>{budgetProgram?.budget_end_date}</span>
              </Col>
            </Row>
          </div>
          <div className="mt-5">
            <AssignBudgetForm
              organization={organization}
              program={program}
              programs={programs}
              budgetId={budgetId}
              budgetProgram={budgetProgram}
              month={month}
              setMonth={setMonth}
              formData={formData}
              budgetCascadingPrograms={budgetCascadingPrograms}
              handleAmountChange={handleAmountChange}
              handleBlur={onBlurUpdateRemainingAmount}
              handleFocus={handleFocus}
              remainingAmount={remainingAmount}
              budgetTypes={budgetTypes}
            />
            <div>
              <BudgetTemplate
                program={program}
                organization={organization}
                programs={programs}
                budgetProgram={budgetProgram}
                budgetCascadingPrograms={budgetCascadingPrograms}
                budgetTypes={budgetTypes}
                month={month}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    rootProgram: state.rootProgram,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(AssignBudget);
