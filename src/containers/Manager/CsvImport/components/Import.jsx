import React, { useEffect, useState } from "react";
import { Col, Row, FormGroup, Container, Button } from "reactstrap";
import { Field, Form } from "react-final-form";
import {
  useDispatch,
  flashError,
  flashSuccess,
  flash,
} from "@/shared/components/flash";
import axios from "axios";
import { connect } from "react-redux";
import Select from 'react-select';
import getCsvImportTypeOptions from '@/services/getCsvImportTypeOptions'

import {labelizeNamedData} from "@/shared/helpers";

import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import ImportDataTable from "./ImportDataTable";

const isValidResponse = (data) => {
  if (!data.hasOwnProperty("CSVheaders")) return false;
  if (!data.hasOwnProperty("fieldsToMap")) return false;
  // Add more validation here
  return true;
};

let config = {
  importType: {
    name: "import_type",
    label: "Select Import Type",
    options: [
      {
        label: "Events",
        value: "Events",
      },
      {
        label: "Programs",
        value: "Programs",
      },
      {
        label: "Users",
        value: "Users",
      },
    ],
    // placeholder: null
  },
  importFile: {
    name: "import_file",
    label: "Choose File",
  },
  importTypeStep2: {
    name: "import_type",
    label: "Select Import Type",
    options: [
      {
        label: "Users",
        value: "Users",
      },
    ],
    placeholder: " ----- ",
  },
  userRole: {
    name: "user_role",
    label: "Select User Role",
    options: [
      {
        label: "Participant",
        value: "Participant",
      },
      {
        label: "Manager",
        value: "Manager",
      },
    ],
    placeholder: " ----- ",
  },
};

const Import = ({ organization, program }) => {
  const [loading, setLoading] = useState(false);
  const [typeOptionsLoading, setTypeOptionsLoading] = useState(true);
  const [importType, setImportType] = useState("Users"); //extend it later
  const [csvImportType, setCsvImportType] = useState("award_users"); //extend it later
  const [csvImportTypeOptions, setCsvImportTypeOptions] = useState([]); //extend it later
  const [importHeaders, setImportHeaders] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [saveSettings, setSaveSettings] = useState(false);

  useEffect( () => {
    if( organization?.id )  
    {
      if( step == 0 ) {
        getCsvImportTypeOptions(organization.id, importType)
        .then( res => {
          let tmpCsvImportTypeOptions = labelizeNamedData(res, ['type', 'name'])
          tmpCsvImportTypeOptions = tmpCsvImportTypeOptions.map(obj => {
            if( obj.value === 'award_users' || obj.value === 'add_and_award_users') return obj;
            obj.disabled = true
            return obj
          })
          setCsvImportTypeOptions( tmpCsvImportTypeOptions )
          setTypeOptionsLoading(false)
        })
      }
    }
  }, [organization, step])

  const dispatch = useDispatch();

  const reset = () => {
    setStep(1);
    setCsvFile(null);
    setImportHeaders(null);
    setImportType("");
    setError(null);
    setProcessing(false);
    setSaveSettings(false);
  };
  const onclickBack = () => {
    setStep(step - 1);
  };
  const onclickNext = () => {
    setStep(step + 1);
  };
  const onSelectCsvFile = (file) => {
    console.log("On select fiel");
    setCsvFile(file);
  };

  // const csvImportTypeOptions = [
  //   { label: "Award Participants", value: "award_users" },
  // ];

  const validate = (values) => {
    let errors = {};
    if (step === 1) {
      if (!importType) {
        errors.import_type = "Please select import type";
      }
      if (!csvFile) {
        errors.import_file = "Csv file is required";
      }
    } else if (step === 2) {
      // if(values.hasOwnProperty('fieldsToMap'))
      // {
      //   errors['fieldsToMap']['ProgramID'] = 'Some error';
      // }
      // console.log(errors)
    }
    // alert(JSON.stringify(values))
    return errors;
  };

  const onSubmitStep1 = (values) => {
    let data = new FormData();
    // const prefix = importType.toLowerCase().substring(0, importType.length - 1)
    let prefix = csvImportType
      .toLowerCase()
      .substring(0, csvImportType.length - 1)
      .replace("_", "");
    // console.log(prefix)
    data.append("upload-file", csvFile);
    const url = `/organization/${organization.id}/program/${program.id}/${prefix}importheaders`;
    // console.log(url)
    axios
      .post(url, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (!isValidResponse(res.data)) {
          flashError(dispatch, "Cannot read or invalid CSV file");
          return;
        }
        console.log(res.data);
        setImportHeaders(res.data);
        setStep(2);
      })
      .catch((error) => {
        console.log(error);
        const errors = error?.response?.data?.errors;
        flashError(dispatch, errors);
      });
  };

  const onSubmitStep2 = (values) => {
    const isSaveSettings = !!values.isSaveSettings;
    let isAutoImport = false;

    console.log(values);
    console.log(importHeaders);
    console.log(values.hasOwnProperty("fieldsToMap"));
    console.log(csvFile instanceof File);
    if (
      !values ||
      !importHeaders ||
      !values.hasOwnProperty("fieldsToMap") ||
      !(csvFile instanceof File)
    ) {
      flashError(dispatch, "Invalid data found");
      setSaveSettings(false);
      return;
    }
    // console.log(values)

    const formFields = values.fieldsToMap;

    let newFormFields = {};
    for (const [formRequest, headerFieldsToMap] of Object.entries(
      importHeaders.fieldsToMap
    )) {
      newFormFields[formRequest] = {};
      for (const [fieldName] of Object.entries(headerFieldsToMap)) {
        for (const [formFieldName, formFieldValue] of Object.entries(
          formFields
        )) {
          if (formFieldValue) {
            let tmpFormRequest = formFieldValue.value.slice(
              0,
              formRequest.length
            );
            let tmpFormFieldValue = formFieldValue.value.slice(
              formRequest.length
            );
            if (
              tmpFormRequest &&
              tmpFormFieldValue &&
              tmpFormFieldValue === fieldName
            ) {
              newFormFields[tmpFormRequest][fieldName] = formFieldName;
            }
          }
        }
      }
    }
    let type = "";
    let setupsFields = {};
    if (values.hasOwnProperty("setups")) {
      const setups = values["setups"];
      Object.keys(setups).map((formRequest) => {
        setupsFields[formRequest] = {};
        const fields = setups[formRequest];
        if (Object.keys(fields).length > 0) {
          Object.keys(fields).map((field) => {
            if (field === "type") {
              type = fields[field].value;
            }
            if (fields[field]) {
              setupsFields[formRequest][field] = fields[field].value;
            }
          });
        }
      });
    }

    // console.log(newFormFields)
    let data = new FormData();
    // const prefix = importType.toLowerCase().substring(0, importType.length - 1)
    let prefix = csvImportType
      .toLowerCase()
      .substring(0, csvImportType.length - 1)
      .replace("_", "");
    data.append("upload-file", csvFile);
    data.append("fieldsToMap", JSON.stringify(newFormFields));
    if (Object.keys(setupsFields).length > 0) {
      data.append("setups", JSON.stringify(setupsFields));
    }
    let url = `/organization/${organization.id}/program/${program.id}/${prefix}import`;
    if (isSaveSettings) {
      url = `/organization/${organization.id}/program/${program.id}/csv-import-setting`;
    } else if (type && type === "Add and Award Participants") {
      isAutoImport = true;
      url = `/organization/${organization.id}/program/${program.id}/user-auto-import`;
    }

    // console.log(url)
    // console.log(JSON.stringify(data))
    // return;
    axios
      .post(url, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        //   console.log(res)
        if (res.data?.csvImport) {
          flashSuccess(
            dispatch,
            "Import request added to queue. You will be notified when it is processed."
          );
          reset();
        }
        if (isSaveSettings) {
          if (res.data?.success) {
            flashSuccess(dispatch, "Settings successfully saved");
            setSaveSettings(false);
          }
        } else if (isAutoImport) {
          console.log(res.data);
          if (res.data?.csvImport) {
            flashSuccess(
              dispatch,
              "Import request added to queue. You will be notified when it is processed."
            );
            // reset();
          }
        }
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        setError(errors);
        setSaveSettings(false);
        //   alert(JSON.stringify(errors))
        flashError(
          dispatch,
          "There were errors. Scroll down the page to view."
        );
      });
    // return newFormFields;
  };

  const onSubmit = (values) => {
    if (step === 1) {
      onSubmitStep1(values);
    } else if (step === 2) {
      onSubmitStep2(values);
    }
  };

  useEffect(() => {
    if (processing) {
      flash("processing", dispatch, "Processing...", 100000);
    }
    return () => {};
  }, [processing]);

  const onChangeCsvImportType = (selectedOption) => {
    if (selectedOption) {
      // setImportType(selectedOption.value)
      setStep(1)
    }
  }

  // console.log(step)

  return (
    <>
      <div className="manager-csv-import full-width">
        <Container>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{
              import_type: importType,
              import_file: csvFile,
            }}
          >
            {({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <div className="form__form-group-field mb-3" style={{maxWidth:400}}>
                      <Field name={'csv_import_type'}
                        parse={
                          (value) => {
                            onChangeCsvImportType(value)
                            return value
                          }
                        }
                      >
                        {({ input, meta }) => (
                          <div className="form__form-group">
                            <h4 className='mb-4'>{"Csv Import Type"}</h4>
                            <div className="form__form-group-field">
                              <div className="form__form-group-row">
                                <Select
                                  options={csvImportTypeOptions}
                                  isClearable={false}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  isLoading={typeOptionsLoading}
                                  isOptionDisabled={(option) => option.disabled}
                                  {...input}
                                />
                                {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                    </div>
                    {step === 1 && (
                      <>
                        <FormStep1
                          {...{
                            config,
                            setStep,
                            csvFile,
                            onSelectCsvFile,
                            onclickBack,
                            onclickNext,
                            importHeaders,
                          }}
                        />
                        <div className="points-summary-table">
                          <ImportDataTable />
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <FormStep2
                        {...{
                          config,
                          setStep,
                          csvFile,
                          onclickBack,
                          importHeaders,
                          isValidResponse,
                          setSaveSettings,
                          saveSettings,
                          handleSubmit,
                        }}
                      />
                    )}
                    {error && <ErrorComponentRaw error={error} />}
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </form>
            )}
          </Form>
        </Container>
      </div>
    </>
  );
};
const ErrorComponentRaw = ({ error }) => {
  return (
    <div className="">
      <h4 className="mb-2">Import Errors</h4>
      <div className="p-3 text-danger">{JSON.stringify(error)}</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Import);
