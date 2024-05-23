import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import BudgetTemplate from "../media/BudgetTemplate";
import { getProgramTree } from "@/services/program/getProgramTree";
import ManageBudgetTable from "./ManageBudgetTable";
import { useParams } from "react-router-dom";
import { getBudgetProgram } from "@/services/program/budget";

const ManageBudget = ({ organization, rootProgram }) => {
  const [programs, setPrograms] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState("");
  const [month, setMonth] = useState([]);
  const [formData, setFormData] = useState({});
  const [previousValues, setPreviousValues] = useState({});
  const [budgetProgram, setBudgetProgram] = useState({});

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

  const handleAmountChange = (programId, value, month) => {
    const numericValue = value || 0;
    setFormData((prevState) => {
      const updatedProgramData = {
        ...prevState[programId],
        [month]: numericValue,
      };

      const newFormData = {
        ...prevState,
        [programId]: updatedProgramData,
      };

      return newFormData;
    });
  };

  const handleFocus = (programId, m) => {
    setPreviousValues((prevState) => ({
      ...prevState,
      [`${programId}-${m}`]: formData[programId]?.[m] || 0,
    }));
  };

  const updateRemainingAmount = (bId, m) => {
    const prevValue = previousValues[`${bId}-${m}`] || 0;
    const currentValue = formData[bId]?.[m] || 0;
    const valueDifference = currentValue - prevValue;

    setRemainingAmount((prevAmount) => prevAmount - valueDifference);
    setPreviousValues((prevState) => {
      const { [`${bId}-${m}`]: removed, ...rest } = prevState;
      return rest;
    });
  };

  if (rootProgram && id && budgetProgram) {
    return (
      <div className="m-1 bg-light p-3 rounded">
        {/* <span onClick={()=>setName("EditSetup")}>Back</span> */}
        <div>
          <h4>Manage Budget</h4>
        </div>
        <table className="w-100 table table-striped report-table">
          <tr>
            <th>Total Budget:</th>
            <th>
              <span>{budgetProgram?.budget_amount}</span>
            </th>
          </tr>
          <tr>
            <th>Available To Allocate: </th>
            <th>
              <span
                className={remainingAmount < 0 ? "text-danger" : "text-black"}
              >
                {remainingAmount}
              </span>
            </th>
          </tr>
          <tr>
            <th>Budget Type:</th>
            <th>
              <span>{budgetProgram?.budget_types?.title}</span>
            </th>
          </tr>
          <tr>
            <th>Start Date:</th>
            <th>
              <span>{budgetProgram?.budget_start_date}</span>
            </th>
          </tr>
          <tr>
            <th>End Date:</th>
            <th>
              <span>{budgetProgram?.budget_end_date}</span>
            </th>
          </tr>
        </table>
        <div className="mt-5">
          {programs?.flatMap((program, index) => (
            <ManageBudgetTable
              programs={[program, ...program.children]}
              key={index}
              id={id}
              budgetProgram={budgetProgram}
              month={month}
              setMonth={setMonth}
              formData={formData}
              handleAmountChange={handleAmountChange}
              handleBlur={updateRemainingAmount}
              handleFocus={handleFocus}
            />
          ))}
          <div>
            <BudgetTemplate />
          </div>
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    rootProgram: state.rootProgram,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(ManageBudget);
