import { Input, Col, Row, FormGroup, Label } from "reactstrap";
import { Field } from "react-final-form";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import TemplateButton from "@/shared/components/TemplateButton";

const BudgetSetupForm = ({
  budgetTypeOptions,
  btnLabel = "Save",
  disable = false,
  budgetType,
  setBudgetType,
  budgetStartDate,
  setBudgetStartDate,
  budgetEndDate,
  setBudgetEndDate,
}) => {
  const [loading, setLoading] = useState(false);
  const [formatDate, setDateFormat] = useState("yyyy");
  const [endDateVisible, setEndDateVisible] = useState(false);

  const currentYear = new Date();
  const maxDate = new Date("2024-12-31");
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  useEffect(() => {
    handleDateFormat(budgetType);
  }, [budgetType]);

  function handleDateFormat(Btype) {
    // setBudgetStartDate(new Date());
    // setBudgetEndDate(new Date());
    if (Btype.label === "Monthly") {
      setDateFormat("MMMM/yyyy");
    } else if (Btype.label === "Monthly Rollover") {
      setDateFormat("MMMM/yyyy");
    } else if (Btype.label === "Specific Period") {
      setDateFormat("yyyy-MM-dd");
    } else if (Btype.label === "Yearly") {
      setDateFormat("yyyy");
    }
  }

  function onChangeBudgetType(type) {
    if (type) {
      setBudgetType(type);
      if (
        type.label === "Monthly" ||
        type.label === "Monthly Rollover" ||
        type.label === "Specific Period"
      ) {
        setEndDateVisible(true);
      } else {
        let currentDate = new Date();
        setBudgetStartDate(new Date(currentDate.getFullYear(), 1));
        setEndDateVisible(false);
      }
    }
  }

  function onStartChange(date) {
    if (date && budgetType.label === "Monthly") {
      setBudgetStartDate(date);
    } else if (date && budgetType.label === "Yearly") {
      setBudgetStartDate(date);
      setBudgetEndDate(
        new Date(date.getFullYear(), 11, 31).toISOString().slice(0, 10)
      );
    } else {
      setBudgetStartDate(date);
    }
  }

  const onEndDateChange = (value) => {
    if (value && budgetType.label === "Monthly") {
      setBudgetEndDate(value);
    } else {
      setBudgetEndDate(value);
    }
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Field name="budget_type">
            {({ input, meta }) => (
              <FormGroup>
                <Label>*Budget Type</Label>
                <Select
                  options={budgetTypeOptions}
                  clearable={true}
                  value={budgetType}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(option) => onChangeBudgetType(option)}
                  defaultValue="select"
                  isDisabled={disable}
                />
                {meta.touched && meta.error && (
                  <span className="form-error">{meta.error}</span>
                )}
              </FormGroup>
            )}
          </Field>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Field name="budget_amount">
            {({ input, meta }) => (
              <FormGroup>
                <Label>*Budget Amount</Label>
                <Input placeholder="$ Amount" type="text" {...input} />
                {meta.touched && meta.error && (
                  <span className="text-danger">{meta.error}</span>
                )}
              </FormGroup>
            )}
          </Field>
        </Col>
      </Row>
      <Row className={budgetType.label === "select" ? "d-none" : ""}>
        <Col md="12">
          <Field name="budget_start_date">
            {({ input, meta }) => (
              <FormGroup>
                <div className="d-flex gap-1">
                  <Label>*Budget Start Date : </Label>
                  <DatePicker
                    style={{ color: "blue" }}
                    dateFormat={formatDate}
                    selected={budgetStartDate}
                    onChange={onStartChange}
                    minDate={currentYear}
                    showMonthYearPicker={
                      budgetType.label === "Monthly" ||
                      budgetType.label === "Monthly Rollover"
                    }
                    showYearPicker={budgetType.label === "Yearly"}
                    maxDate={maxDate}
                    disabled={disable}
                  />
                </div>
              </FormGroup>
            )}
          </Field>
        </Col>
      </Row>
      {endDateVisible && (
        <Row>
          <Col md="12">
            <Field name="budget_end_date">
              {({ input, meta }) => (
                <FormGroup>
                  <div className="d-flex gap-1">
                    <Label>*Budget Amount : </Label>
                    <DatePicker
                      placeholderText="select End date"
                      selected={budgetEndDate}
                      onChange={onEndDateChange}
                      dateFormat={formatDate}
                      showMonthYearPicker={
                        budgetType.label === "Monthly" ||
                        budgetType.label === "Monthly Rollover"
                      }
                      showYearPicker={budgetType === "Yearly"}
                      minDate={currentYear}
                      maxDate={maxDate}
                      disabled={disable}
                    />
                  </div>
                </FormGroup>
              )}
            </Field>
          </Col>
        </Row>
      )}

      <div className="d-flex justify-content-end">
        <TemplateButton disabled={loading} type="submit" text={btnLabel} />
      </div>
    </>
  );
};

export default BudgetSetupForm;
