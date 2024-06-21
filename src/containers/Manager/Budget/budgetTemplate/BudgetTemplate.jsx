import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import UploadBudgetTemplate from "./UploadBudgetTemplate";
import TemplateButton from "@/shared/components/TemplateButton";
import { patchBudgetCascadingData } from "@/services/program/budget";

const BudgetTemplate = ({
  organization,
  program,
  programs,
  budgetProgram,
  budgetCascadingPrograms,
  budgetTypes,
  month,
}) => {
  const [budgetProgramTemplate, setBudgetProgramTemplate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getCsvData, setCsvData] = useState(null);
  const headers1 = [
    "Totatl_Budget",
    "Remaining_Budget",
    "Budget_Type",
    "Budget_Start_Date",
    "Budget_End_Date",
  ];

  const headers2 = [
    "Assign Budget to Program Id",
    "Assign Budget to program Name",
    ...month,
  ];

  useEffect(() => {
    if (programs && budgetCascadingPrograms && budgetTypes) {
      //set template data here
      setLoading(true);
      programs?.flatMap((program) => {
        setBudgetProgramTemplate(
          patchBudgetCascadingData(
            [program, ...program.children],
            budgetCascadingPrograms,
            budgetTypes
          )
        );
      });
      setLoading(false);
    }
  }, [programs, budgetCascadingPrograms, budgetTypes]);

  const convertToCSV = (headers, rows) => {
    const header = Object.values(headers).join(","); // Create the header row
    const row = rows?.map((obj) => Object.values(obj).join(",")); // Create rows
    return [header, ...row].join("\n"); // Combine header and rows
  };

  const combineCSV = (csv1, csv2) => {
    return `${csv1}\n\n${csv2}`;
  };

  function flattenData(data) {
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
      const data2 = data?.map((program) => {
        const row = [
          program.id,
          program.name,
          ...month.map((month) =>
            program.budget_data && program.budget_data[month]
              ? program.budget_data[month].amount
              : 0
          ),
        ];
        return row;
      });
      return data2;
    } else {
      const data2 = data?.map((program) => {
        const row = [
          program.id,
          program.name,
          program.budget_data ? program.budget_data.amount : 0,
        ];
        return row;
      });
      return data2;
    }
  }

  useEffect(() => {
    if (budgetProgramTemplate && budgetProgram) {
      let row1 = [
        {
          budget_total_amount: budgetProgram.budget_amount,
          remaining_amount: budgetProgram.remaining_amount,
          budget_type: budgetProgram?.budget_types?.title,
          budget_start_date: budgetProgram.budget_start_date,
          budget_end_date: budgetProgram.budget_end_date,
        },
      ];
      const csv1 = convertToCSV(headers1, row1);
      let row2 = flattenData(budgetProgramTemplate);
      const csv2 = convertToCSV(headers2, row2);
      const combinedCSV = combineCSV(csv1, csv2);
      setCsvData(combinedCSV);
    }
  }, [budgetProgramTemplate, budgetProgram]);

  const downloadAssignBudgetTemplate = () => {
    const blob = new Blob([getCsvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `assign-budget-${program.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h5>-OR-</h5>
      <div>
        <p className="text-medium">
          You may also download a budget template file in .csv format which you
          can complete and upload at a later time.
          <br />
          Note: When editing the template file, do not add or delete any columns
          or rows. You should only modify the values in the amounts column. When
          you upload the file, the budget amount replaces the assigned budget
          amounts.
        </p>
        {/* Download Budget template */}
        <div className="text-bold">
          <Row>
            <Col>3. Download Budget template.</Col>
            <Col>
              <TemplateButton
                disabled={false}
                type="button"
                text={"Download"}
                onClick={downloadAssignBudgetTemplate}
              />
            </Col>
          </Row>
        </div>
        {/* upload budget template */}
        <UploadBudgetTemplate />
      </div>
    </div>
  );
};

export default BudgetTemplate;
