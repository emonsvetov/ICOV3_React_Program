import React from "react";
import { Col, Row, Button } from "reactstrap";
import ModalWrapper from "./ModalWrapper";
import { connect } from "react-redux";
import BudgetTable from "./BudgetTable";

const Budget = ({ program, organization }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [modalName, setModalName] = React.useState(null);
  let props = {
    isOpen,
    setOpen,
    name: modalName,
    setModalName,
    id:null
  };

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="bg-white m-2 p-3 rounded">
      <Row className="mt-4">
        <Col md={10}>
          <div className="my-3 d-flex justify-content-between">
            <h3>Budgets list</h3>
            <Button
              onClick={() => toggle("AddBudgetSetup")}
              className="btn btn-primary"
              color="ffff"
            >
              Create New Setup
            </Button>
          </div>
        </Col>
      </Row>
      <div className="points-summary-table">
        <BudgetTable program={program} organization={organization} {...props} toggle={toggle}/>
      </div>
      <ModalWrapper {...props} toggle={toggle} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Budget);
