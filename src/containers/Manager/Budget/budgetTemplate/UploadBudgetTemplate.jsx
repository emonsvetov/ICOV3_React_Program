import React, { useState } from "react";
import MuiButton from "@material-ui/core/Button";
import { Col, Row } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import axios from "axios";

const UploadBudgetTemplate = ({ organization, program, budgetProgram }) => {
  const [errors, setErrors] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  const onSelectCsvFile = (file) => {
    setCsvFile(file);
    setErrors([]);
  };

  const onSubmit = () => {
    const checkCsvFile = validate();
    if (checkCsvFile.length > 0) {
      setErrors(checkCsvFile);
    }
    // axios.post(
    //   `/organization/${organization?.id}/program/${program?.id}/budgetcacading/${budgetProgram.id}/upload-template`
    // );
    console.log(csvFile);
  };

  const validate = () => {
    let errors = [];
    if (!csvFile) {
      errors.push("Csv File is required");
    } else if (csvFile.type !== "text/csv") {
      errors.push("The file is not csv type");
    }
    return errors;
  };

  return (
    <>
      <div>
        <Row>
          <Col md="6">
            <span className="text-bold">
              4. Upload completed Budget template..
            </span>
          </Col>
          <Col md="6" className="text-right">
            <Row>
              <Col md="6">
                <div className="form__form-group">
                  <div className="form__form-group-field flex-column">
                    <MuiButton
                      variant="contained"
                      component="label"
                      style={{
                        textTransform: "inherit",
                        padding: "2px 10px",
                      }}
                    >
                      Choose File
                      <input
                        hidden
                        type="file"
                        // accept='.csv'
                        id="csvFile"
                        onChange={(e) => onSelectCsvFile(e.target.files[0])}
                        value={csvFile?.name.file}
                      ></input>
                    </MuiButton>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <TemplateButton
                  disabled={false}
                  type="button"
                  text={"Upload"}
                  onClick={onSubmit}
                />
              </Col>
            </Row>
            <span className="text-small">{csvFile?.name}</span>
          </Col>
        </Row>
        {errors.length > 0 && (
          <ul className="form-error">
            {errors.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UploadBudgetTemplate;
