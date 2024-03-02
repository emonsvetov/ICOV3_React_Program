import React, { useState } from "react";
import { Col, Row, FormGroup, Container, Button } from "reactstrap";
import Select from "react-select";
import { Field, Form } from "react-final-form";
import axios from "axios";

import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
import { useTranslation } from "react-i18next";

const ImportType = () => {
  const dispatch = useDispatch();
  const [importType, setImportType] = useState("");
  const [importHeaders, setImportHeaders] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const onSelectCsvFile = (file) => {
    setCsvFile(file);
    setImportHeaders(null);
  };
  const { t } = useTranslation();

  const importTypeOptions = [
    { label: "Add and Award Participant", value: "add_and_award_participant" },
    { label: "Add New Participants", value: "add_new_participants" },
  ];

  const isValidResponse = (data) => {
    if (!data.hasOwnProperty("CSVheaders")) return false;
    if (!data.hasOwnProperty("fieldsToMap")) return false;
    // Add more validation here
    return true;
  };

  const onSubmit = async (formData) => {
    if (!formData) {
      console.log("error file not found", formData);
      return;
    }
    console.log(formData);
    const file = formData?.csv[0];
    const importType = formData?.import_type;
    try {
      if (file && importType) {
        console.log(file);
        flashSuccess(dispatch, "Csv Imported successfully!");
      } else {
        flashError(dispatch("No Csv file selected."));
      }
    } catch (error) {
      flashError(dispatch(error.message));
    }
  };

  return (
    <>
      <div className="users">
        <Container>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <div className="form__form-group-field">
                      <label className="my-2 mr-3">Import Type: </label>
                      <Field
                        name="import_type"
                        component="select"
                        className="p-1 border-secondary rounded"
                      >
                        {importTypeOptions.map((type) => (
                          <option
                            className="p-2 text-center bg-light"
                            value={type.value}
                          >
                            {type.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="my-3 d-flex justify-content-between">
                    <div className="d-flex">
                      <label className="my-2 mr-3">CSV File: </label>
                      <Field
                        className="p-1 border-secondary bg-light rounded"
                        name="csv"
                        component="input"
                        type="file"
                        accept=".csv"
                      />
                    </div>
                    <div>
                      <Button color="primary" type="submit">
                        Import
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </form>
            )}
          />
        </Container>
      </div>
    </>
  );
};

export default ImportType;
