import React from "react";
import { Col, Row } from "reactstrap";
import UploadBudgetTemplate from "./UploadBudgetTemplate";
import TemplateButton from "@/shared/components/TemplateButton";

const BudgetTemplate = () => {
  const downloadBudgetTemplate = () => {};

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
                onClick={downloadBudgetTemplate}
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
