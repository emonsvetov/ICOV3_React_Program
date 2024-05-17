import React, { useState, useEffect } from "react";
import { Input, FormGroup, Button, Col, Row, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import CloseIcon from "mdi-react/CloseIcon";
import { Modal } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import axios from "axios";
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
import { labelizeNamedData } from "@/shared/helpers";
import BudgetSetupForm from "../components/BudgetSetupForm";
import {
  getBudgetType,
  getBudgetProgram,
  getDateFormat,
  hasUserPermissions,
} from "@/services/program/budget";

const BudgetSetupInfoModal = ({
  program,
  isOpen,
  setOpen,
  toggle,
  organization,
  assignedPermissions,
  id,
}) => {
  const [budgetProgram, setBudgetProgram] = useState(null);
  const [budgetTypeOptions, setBudgetTypeOptions] = useState([]);
  const [budgetType, setBudgetType] = useState([]);
  const [budgetStartDate, setBudgetStartDate] = useState(new Date());
  const [budgetEndDate, setBudgetEndDate] = useState(new Date());
  const [endDateHide, setEndDateHide] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  let [dateFormat, setDateformat] = useState("MMMM/yyyy");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let props = {
    btnLabel: "Save Budget Setup",
    program,
    budgetType,
    setBudgetType,
    budgetStartDate,
    setBudgetStartDate,
    budgetEndDate,
    setBudgetEndDate,
    endDateHide,
    setEndDateHide,
    disable,
    dateFormat,
    setDateformat,
  };

  useEffect(() => {
    if (organization && program && id) {
      getBudgetProgram(organization, program, id).then((res) => {
        setBudgetProgram(res);
        setBudgetType(labelizeNamedData([res.budget_types], ["id", "title"]));
        setBudgetStartDate(new Date(res.budget_start_date));
        setBudgetEndDate(new Date(res.budget_start_date));
        setLoading(false);
        if (res.budget_types.title === "Yearly") {
          setDisable(false);
          setEndDateHide(true);
          setDateformat("yyyy");
        } else {
          setDateformat("MMMM/yyyy");
        }
      });
      getBudgetType(program.organization_id, program.id).then((res) => {
        setBudgetTypeOptions(labelizeNamedData(res, ["id", "title"]));
      });
    }
  }, [organization, program, id]);

  const closeBudget = (bId) => {
    try {
      axios
        .post(
          `/organization/${organization.id}/program/${program.id}/budgetprogram/${bId}/close`
        )
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (values) => {
    values.budget_type_id = budgetType.value;
    values.budget_start_date = getDateFormat(budgetStartDate);
    values.budget_end_date = getDateFormat(budgetEndDate);

    console.log("values", values);
    axios
      .put(
        `/organization/${organization.id}/program/${program.id}/budgetprogram/${id}`,
        values
      )
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "Budget edited successfully!");
          window.location.reload();
        }
      });
  };

  let initialValues = {
    budget_amount: budgetProgram?.budget_amount,
    budget_start_date: budgetEndDate.budget_start_date,
  };

  return (
    <Modal
      className={`program-settings modal-2col modal-lg`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div className="left">
        <div className="title mb-5">
          <h3>Budget Setup Information</h3>
        </div>
      </div>
      {hasUserPermissions(assignedPermissions, ["Budget Setup Edit"]) ? (
        !loading ? (
          <div className="right  m-3">
            <Form
              onSubmit={onSubmit}
              // validate={validate}
              initialValues={initialValues}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => {
                return (
                  <form className="form" onSubmit={handleSubmit}>
                    <BudgetSetupForm
                      {...props}
                      program={program}
                      budgetTypeOptions={budgetTypeOptions}
                      form={form}
                      submitting={submitting}
                      pristine={pristine}
                      values={values}
                    />
                  </form>
                );
              }}
            </Form>
            <div className="d-flex">
              {hasUserPermissions(assignedPermissions, ["Manage Budget"]) && (
                <Button
                  className="ms-2"
                  onClick={() => navigate(`/manager/budget/manage-setup/${id}`)}
                >
                  Manage Budget for Programs
                </Button>
              )}
              {hasUserPermissions(assignedPermissions, ["Budget Close"]) && (
                <Button
                  className="ms-2"
                  onClick={(e) => {
                    if (window.confirm("Are you sure to close this Budget?")) {
                      closeBudget(id);
                    }
                  }}
                >
                  Close this Budget
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: "20px 0px" }}>
            <p>Loading...</p>
          </div>
        )
      ) : (
        <div style={{ padding: "20px 0px" }}>
          <p>Manager has not permission</p>
        </div>
      )}
    </Modal>
  );
};

export default BudgetSetupInfoModal;
