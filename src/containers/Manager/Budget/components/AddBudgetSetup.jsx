import React, { useEffect, useState } from "react";
import CloseIcon from "mdi-react/CloseIcon";
import { Form } from "react-final-form";
import BudgetSetupForm from "./BudgetSetupForm";
import { Modal } from "reactstrap";
import { getBudgetType, getDateFormat } from "@/services/program/budget";
import { labelizeNamedData } from "@/shared/helpers";
import axios from "axios";
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";

const AddBudgetSetupModal = ({ program, isOpen, setOpen, toggle }) => {
  const [budgetTypeOptions, setBudgetTypeOptions] = useState([]);
  const [budgetType, setBudgetType] = useState("select");
  const [budgetStartDate, setBudgetStartDate] = useState(new Date());
  const [budgetEndDate, setBudgetEndDate] = useState(new Date());
  const [endDateHide, setEndDateHide] = useState(false);
  let [dateFormat, setDateformat] = useState("MMMM/yyyy");
  const dispatch = useDispatch();

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
    dateFormat,
    setDateformat,
  };

  useEffect(() => {
    if (program.id && program.organization_id) {
      getBudgetType(program.organization_id, program.id).then((res) => {
        setBudgetTypeOptions(labelizeNamedData(res, ["id", "title"]));
      });
    }
  }, [program]);

  const invalidAmount = (v) => {
    return (
      typeof v == "undefined" || isNaN(parseFloat(v)) || parseFloat(v) <= 0
    );
  };

  const validate = (values) => {
    console.log("value", values);
    let errors = {};
    if (values["budget_type"] == "") {
      errors["budget_type"] = "select budget type";
    } else if (invalidAmount(values["budget_amount"])) {
      errors["budget_amount"] = "enter amount";
    } else if (values["budget_start_date"]) {
      errors["budget_start_date"] = "Budget StartDate is not correct";
    } else if (values["budget_start_date"] >= values["budget_end_date"]) {
      errors["budget_start_date"] = "Start date cannot be greater than end date.";
    } else if (values["budget_end_date"]) {
      errors["budget_end_date"] = "Date is not correct";
    }
    return errors;
  };

  const onSubmit = (values) => {
    values.budget_type_id = budgetType[0].value;
    // if (budgetStartDate && budgetEndDate ) {
    //   alert("Start date cannot be greater than end date.");
    //   return;
    // }

    values.budget_start_date = getDateFormat(budgetStartDate);
    values.budget_end_date = budgetEndDate.toISOString().slice(0, 10);
    validate(values)
    axios
      .post(
        `organization/${program.organization_id}/program/${program.id}/budgetprogram`,
        values
      )
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "Budget created successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error) {
          flashError(dispatch, error.response.data);
        }
      });

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

      <div className="right">
        <Form
          onSubmit={onSubmit}
          validate={validate}
        >
          {({ handleSubmit, form, submitting, pristine, values }) => {
            return (
              <form className="form" onSubmit={handleSubmit}>
                <BudgetSetupForm
                  {...props}
                  form={form}
                  submitting={submitting}
                  pristine={pristine}
                  values={values}
                  budgetTypeOptions={budgetTypeOptions}
                />
              </form>
            );
          }}
        </Form>
      </div>
    </Modal>
  );
};

export default AddBudgetSetupModal;
