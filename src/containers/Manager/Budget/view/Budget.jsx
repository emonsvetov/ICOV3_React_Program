import React, { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import ModalWrapper from "../components/ModalWrapper";
import { connect } from "react-redux";
import BudgetTable from "../components/BudgetTable";
import SelectProgram from "../../components/SelectProgram";
import {
  readAssignedPositionPermissions,
  hasUserPermissions,
} from "@/services/program/budget";

const Budget = ({ program, organization, auth, rootProgram }) => {
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
    if (organization?.id && rootProgram?.id && auth?.positionLevel) {
      setIsLoading(true);
      readAssignedPositionPermissions(
        organization.id,
        rootProgram?.id,
        auth?.positionLevel?.id
      )
        .then((res) => {
          setAssignedPermissions(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
  }, [organization, rootProgram, program, auth]);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  if (isLoading) return "Loading...";

  return (
    <>
      {assignedPermissions.length > 0 ? (
        <>
          {
            <>
              <Row className="mt-4">
                <Col md={10}>
                  <div
                    className="my-3 d-flex justify-content-between"
                    style={{ color: "white" }}
                  >
                    <h3>Budgets list</h3>
                    {hasUserPermissions(
                      assignedPermissions,
                      "Budget Setup Create",
                      "can_setup_budget"
                    ) && (
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
              <div
                className="d-flex program-select my-3 p-2 rounded text-white"
                style={{ backgroundColor: "#3386F9" }}
              >
                <SelectProgram showRefresh={false} />
              </div>
            </>
          }
          <div className="bg-white m-2 p-3 rounded">
            <div className="points-summary-table">
              <BudgetTable
                program={program}
                organization={organization}
                rootProgram={rootProgram}
                assignedPermissions={assignedPermissions}
                {...props}
                toggle={toggle}
              />
            </div>
          </div>
          <ModalWrapper {...props} toggle={toggle} />
        </>
      ) : (
        <div style={{ padding: "20px 0px", color: "white" }}>
          <p>Manager has no permissions for Budget...</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    rootProgram: state.rootProgram
  };
};

export default connect(mapStateToProps)(Budget);
