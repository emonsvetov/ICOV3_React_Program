import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import BudgetTemplate from "../media/BudgetTemplate";
import { getProgramTree } from "@/services/program/getProgramTree";
import ManageBudgetTable from "./ManageBudgetTable";
import { useParams } from "react-router-dom";
import { getBudgetProgram } from "@/services/program/budget";
import { months } from "@/services/program/budget";
import { flashError, useDispatch } from "@/shared/components/flash";
import SelectProgram from "../../components/SelectProgram";

const ManageBudget = ({ organization, program, rootProgram }) => {
  const [budgetProgram, setBudgetProgram] = useState({});
  const [programs, setPrograms] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState("");
  const [month, setMonth] = useState([]);
  const [formData, setFormData] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (organization && rootProgram) {
      getProgramTree(organization.id, rootProgram.id).then((p) => {
        setPrograms(p);
      });
    }
  }, [organization, rootProgram]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id && id) {
      getBudgetProgram(organization.id, rootProgram.id, id).then((res) => {
        setBudgetProgram(res);
        setRemainingAmount(res.budget_amount);
      });
    }
  }, [organization, rootProgram, id]);

  const handleAmountChange = (
    programId,
    value,
    month,
    prevAmount = 0,
    year = new Date().getFullYear()
  ) => {
    const amount = value || 0;
    setFormData((prevAmounts) => {
      let newAmounts = [...prevAmounts]
      const index = newAmounts.findIndex(
        (item) => item.programId === programId && item.month === month
      );
      let data = {
        ...prevAmounts,
        [programId]: {
          ...prevAmounts[programId],
          ["month"]: month,
          ["amount"]: value,
        },
      }
      if (index === -1) {
        newAmounts.push({ programId, month, amount: value });
      } else {
        newAmounts[index].amount = value;
      }

     // newAmounts.push(data)
      return newAmounts
    });

  };

  const handleFocus = (programId, m, amount) => {
    setPreviousValues((prevState) => ({
      ...prevState,
      [`${programId}-${m}`]: amount,
    }));
  };

  function onBlurUpdateRemainingAmount(
    programId,
    month,
    newValue,
    year = new Date().getFullYear()
  ) {
    const prevValue = previousValues[`${programId}-${month}`] || 0;
    const currentValue = newValue || 0;
    const valueDifference = currentValue - prevValue;
    setRemainingAmount((prevAmount) => prevAmount - valueDifference);
    setPreviousValues((prevState) => {
      const { [`${programId}-${month}`]: removed, ...rest } = prevState;
      return rest;
    });
  }

  if (rootProgram && id && budgetProgram) {
    return (
      <div className="m-1 bg-light p-3 rounded">
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
            <Col className={remainingAmount < 0 ? "text-danger" : "text-black"}>
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
            <ManageBudgetTable
              organization={organization}
              program={program}
              programs={[program, ...program.children]}
              key={index}
              id={id}
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
            <BudgetTemplate program={program} organization={organization} budgetProgram={budgetProgram} />
          </div>
        </div>
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

export default connect(mapStateToProps)(ManageBudget);
