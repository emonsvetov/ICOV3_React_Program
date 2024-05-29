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
import { months } from "@/services/program/budget";
import { flashError, useDispatch } from "@/shared/components/flash";
import SelectProgram from "../../components/SelectProgram";
import axios from "axios";

const AssignBudget = ({ organization, program, rootProgram }) => {
  const [budgetProgram, setBudgetProgram] = useState({});
  const [budgetCascadingProgram, setBudgetCascadingProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState("");
  const [month, setMonth] = useState([]);
  const [formData, setFormData] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const dispatch = useDispatch();
  const { budgetId } = useParams();

  useEffect(() => {
    if (organization && rootProgram) {
      getProgramTree(organization.id, rootProgram.id).then((p) => {
        setPrograms(p);
      });
    }
  }, [organization, rootProgram]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id && budgetId) {
      getBudgetProgram(organization.id, rootProgram.id, budgetId).then(
        (res) => {
          setBudgetProgram(res);
          setRemainingAmount(res.remaining_amount);
        }
      );
    }
  }, [organization, rootProgram, budgetId]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id && budgetId) {
      getBudgetCascadings(organization?.id, rootProgram?.id, budgetId)
        .then((res) => setBudgetCascadingProgram(res))
        .catch((err) => console.log(err));
    }
  }, [organization, rootProgram, budgetId]);

  const handleAmountChange = (
    programId,
    value,
    month,
    prevAmount = 0,
    year = new Date().getFullYear()
  ) => {
    //const amount = value || 0;
    if (budgetProgram?.budget_types?.name === "monthly") {
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
            newAmounts.push({ program_id: programId, month, amount: value });
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
          (item) => item.program_id === programId && item.month === month
        );

        if (index === -1) {
          if (value === "") {
            newAmounts.splice(index, 1);
          } else {
            newAmounts.push({
              budgets_cascading_id: null,
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

  const handleFocus = (programId, m, amount) => {
    if (budgetProgram?.budget_types?.name === "monthly") {
      setPreviousValues((prevState) => ({
        ...prevState,
        [`${programId}-${m}`]: amount,
      }));
    } else {
      setPreviousValues((prevState) => ({
        ...prevState,
        [`${programId}`]: amount,
      }));
    }
  };

  function onBlurUpdateRemainingAmount(programId, month, newValue) {
    const currentValue = newValue || 0;
    if (budgetProgram?.budget_types?.name === "monthly") {
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

  if (rootProgram && budgetId && budgetProgram) {
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
            {programs?.flatMap((program, index) => (
              <AssignBudgetForm
                organization={organization}
                program={program}
                programs={[program, ...program.children]}
                key={index}
                budgetId={budgetId}
                budgetProgram={budgetProgram}
                month={month}
                setMonth={setMonth}
                formData={formData}
                handleAmountChange={handleAmountChange}
                handleBlur={onBlurUpdateRemainingAmount}
                handleFocus={handleFocus}
              />
            ))}
            <div>
              <BudgetTemplate
                program={program}
                organization={organization}
                budgetProgram={budgetProgram}
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
