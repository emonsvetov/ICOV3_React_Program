import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import CloseIcon from "mdi-react/CloseIcon";
import { Modal } from "reactstrap";
import axios from "axios";
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
import { labelizeNamedData } from "@/shared/helpers";
import BudgetSetupForm from "../components/BudgetSetupForm";
import {
  getBudgetTypes,
  getBudgetProgram,
  getDateFormat,
  hasUserPermissions,
  getEndOfMonth,
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
  const [budgetStatus, setBudgetStatus] = useState(true);
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
    budgetStatus,
  };

  useEffect(() => {
    if (organization?.id && program?.id && id) {
      getBudgetProgram(organization?.id, program?.id, id).then((res) => {
        setBudgetProgram(res);
        setBudgetType(labelizeNamedData([res.budget_types], ["id", "title"]));
        setBudgetStartDate(new Date(res.budget_start_date));
        setBudgetEndDate(new Date(res.budget_end_date));
        setLoading(false);
        if (res.status == 0) {
          setBudgetStatus(false);
        }
        if (res.budget_types.name === "yearly") {
          setDisable(false);
          setEndDateHide(true);
          setDateformat("yyyy");
        } else {
          setDateformat("MMMM/yyyy");
        }
      });
      getBudgetTypes(program.organization_id, program.id).then((res) => {
        setBudgetTypeOptions(labelizeNamedData(res, ["id", "title"]));
      });
    }
  }, [organization, program, id]);

  const closeBudget = (budgetId) => {
    try {
      axios
        .post(
          `/organization/${organization.id}/program/${program.id}/budgetprogram/${budgetId}/close`
        )
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        });
    } catch (error) {
      flashError(dispatch, error.message);
    }
  };

  const invalidAmount = (v) => {
    return (
      typeof v == "undefined" || isNaN(parseFloat(v)) || parseFloat(v) <= 0
    );
  };

  const validate = (values) => {
    let errors = {};
    if (values["budget_type"] == "") {
      errors["budget_type"] = "select budget type";
    } else if (invalidAmount(values["budget_amount"])) {
      errors["budget_amount"] = "enter amount";
    } else if (values["budget_start_date"]) {
      errors["budget_start_date"] = "Budget StartDate is not correct";
    } else if (values["budget_start_date"] >= values["budget_end_date"]) {
      errors["budget_start_date"] =
        "Start date cannot be greater than end date.";
    } else if (values["budget_end_date"]) {
      errors["budget_end_date"] = "Date is not correct";
    }
    return errors;
  };

  const onSubmit = (values) => {
    let budget;
    if (Array.isArray(budgetType)) {
      values.budget_type_id = budgetType[0].value;
      budget = budgetType[0].label;
    } else {
      values.budget_type_id = budgetType.value;
      budget = budgetType.value;
    }
    let actualBudget = budgetProgram?.budget_amount;
    values.budget_start_date = getDateFormat(budgetStartDate, budgetType);
    values.budget_end_date = getEndOfMonth(budgetEndDate, budgetType);
    let newBudget = Math.abs(values.budget_amount - actualBudget);

    if (newBudget > 0 && budgetProgram?.budget_amount < values.budget_amount) {
      values.remaining_amount = budgetProgram?.remaining_amount + newBudget;
    } else if (
      values.budget_amount > budgetProgram?.budget_amount ||
      values.budget_amount < budgetProgram?.budget_amount
    ) {
      let newRemainingamount = budgetProgram?.remaining_amount - newBudget;
      if (newRemainingamount < 0) {
        alert("Remaining amount can not be negative");
        return;
      } else {
        values.remaining_amount = newRemainingamount;
      }
    }
    if (
      window.confirm(`Are you sure you want to Edit this ${budget} Budget?`)
    ) {
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
    }
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
      {!loading ? (
        <div className="right  m-3">
          <Form
            onSubmit={onSubmit}
            validate={validate}
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
            {hasUserPermissions(
              assignedPermissions,
              "Manage Budget",
              "can_setup_budget"
            ) &&
              budgetStatus &&
              program.parent_id === null && (
                <Button
                  color="warning"
                  className="ms-2"
                  onClick={() => navigate(`/manager/budget/manage-setup/${id}`)}
                >
                  Manage Budget for Programs
                </Button>
              )}
            {hasUserPermissions(
              assignedPermissions,
              "Budget Close",
              "can_setup_budget"
            ) &&
              budgetStatus && (
                <Button
                  color="danger"
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
      )}
    </Modal>
  );
};

export default BudgetSetupInfoModal;
