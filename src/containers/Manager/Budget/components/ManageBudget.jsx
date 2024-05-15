import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import BudgetTemplate from "./BudgetTemplate";
import { getProgramTree } from "@/services/program/getProgramTree";
import ManageBudgetTable from "./ManageBudgetTable";

const ManageBudget = ({ organization, rootProgram }) => {
  const [programs, setPrograms] = useState([]);
  console.log("programs", programs);
  useEffect(() => {
    if (organization && rootProgram) {
      getProgramTree(organization.id, rootProgram.id).then((p) => {
        console.log("p", p);
        setPrograms(p);
      });
    }
  }, [organization, rootProgram]);

  return (
    <div className="m-1 bg-light p-3 rounded">
      {/* <span onClick={()=>setName("EditSetup")}>Back</span> */}
      <div>
        <h4>Manage Budget</h4>
      </div>
      <Row>
        <Col>Available To Allocate: </Col>
      </Row>
      <Row>
        <Col>Budget Type:</Col>
      </Row>
      <Row>
        <Col>Start Date:</Col>
      </Row>
      <Row>
        <Col>End Date:</Col>
      </Row>
      <div className="mt-5">
        {programs.flatMap((program) => (
          <ManageBudgetTable programs={[program, ...program.children]} />
        ))}
        <div>
          <BudgetTemplate />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    rootProgram: state.rootProgram,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(ManageBudget);
