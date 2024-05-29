import React from "react";
import { Col, Row } from "reactstrap";
import UploadBudgetTemplate from "./UploadBudgetTemplate";
import TemplateButton from "@/shared/components/TemplateButton";
import { downloadAssignBudgetTemplate as assigntemplatedownload } from "@/services/program/budget";

const BudgetTemplate = ({ organization, program, budgetProgram }) => {


  const downloadAssignBudgetTemplate = () => {
    // assigntemplatedownload(organization.id, program.id, budgetProgram.id)
    //   .then((response) => {
    //     console.log(response);
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `assign-budget-${program.id}.csv`); //or any other extension
    //     document.body.appendChild(link);
    //     link.click();
    //   })

  }

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
                onClick={() => downloadAssignBudgetTemplate()}
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
