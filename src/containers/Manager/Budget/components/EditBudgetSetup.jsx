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
import BudgetSetupForm from "./BudgetSetupForm";
import { getBudgetType, getBudgetProgram, getDateFormat } from "@/services/program/budget";

//const AddEventImg = `/img/pages/addEvent.png`;


const EditBudgetSetupModal = ({
  program,
  isOpen,
  setOpen,
  toggle,
  organization,
  id,
}) => {
  const [budgetProgram, setBudgetProgram] = useState(null);
  const [budgetTypeOptions, setBudgetTypeOptions] = useState([]);
  const [budgetType, setBudgetType] = useState([]);
  const [budgetStartDate, setBudgetStartDate] = useState(new Date());
  const [budgetEndDate, setBudgetEndDate] = useState(new Date());
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
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
    disable,
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
        }
      });
      getBudgetType(program.organization_id, program.id).then((res) => {
        setBudgetTypeOptions(labelizeNamedData(res, ["id", "title"]));
      });
    }
  }, [organization, program, id]);

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
          setOpen((prevState) => !prevState);
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
      {!loading ? (
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
            <Button
              className="ms-2"
              onClick={() => navigate(`manage-setup/${id}`)}
            >
              Manage Budget for Programs
            </Button>
            <Button className="ms-2">Close this Budget</Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default EditBudgetSetupModal;
