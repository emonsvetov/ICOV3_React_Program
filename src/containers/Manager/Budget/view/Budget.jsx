import React, { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import ModalWrapper from "../components/ModalWrapper";
import { connect } from "react-redux";
import BudgetTable from "../components/BudgetTable";
import {
  readAssignedPositionPermissions,
  hasUserPermissions,
} from "@/services/program/budget";

const Budget = ({ program, organization, auth }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [modalName, setModalName] = React.useState(null);
  const [assignedPermissions, setAssignedPermissions] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let props = {
    isOpen,
    setOpen,
    name: modalName,
    setModalName,
    id: null,
  };

  React.useEffect(() => {
    if (organization?.id && program?.id && auth?.positionLevel) {
      setIsLoading(true);
      readAssignedPositionPermissions(
        organization.id,
        program.id,
        auth?.positionLevel?.id
      ).then((res) => {
        setAssignedPermissions(res);
        setIsLoading(false);
      });
    }
  }, [organization, program, auth]);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };
  if (isLoading) return "Loading...";
  if (auth?.positionLevel && assignedPermissions) {
    return (
      <>
        {
          <Row className="mt-4">
            <Col md={10}>
              <div className="my-3 d-flex justify-content-between">
                <h3 style={{ color: "white" }}>Budgets list</h3>
                {hasUserPermissions(assignedPermissions, [
                  "Budget Setup Create",
                ]) && (
                  <Button
                    onClick={() => toggle("AddBudgetSetup")}
                    className="btn btn-primary"
                    color="ffff"
                  >
                    Create New Setup
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        }
        {hasUserPermissions(assignedPermissions, ["Budget Read"]) ? (
          <div className="bg-white m-2 p-3 rounded">
            <div className="points-summary-table">
              <BudgetTable
                program={program}
                organization={organization}
                assignedPermissions={assignedPermissions}
                {...props}
                toggle={toggle}
              />
            </div>
          </div>
        ) : (
          "No Permissions to read Budget"
        )}
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Budget);
