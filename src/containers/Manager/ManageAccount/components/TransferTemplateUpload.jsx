import MuiButton from '@material-ui/core/Button';
import { Form, Field } from "react-final-form";
import React, { useState } from "react";
import { Col, Row} from "reactstrap";
import axios from "axios";

import TemplateButton from "@/shared/components/TemplateButton";
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash";

const TransferTemplateUpload = () => {

  const dispatch = useDispatch(); //Dispatch

  const [csvFile, setCsvFile] = useState(null);
  const onSelectCsvFile = (file) => {
    setCsvFile(file)
  }
  const onSubmit = values => {
    let data = new FormData();
    data.append('upload-file', csvFile)
    const url = `/organization/2/importheaders`
    console.log(url)
    axios
    .post(url, data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    })
    .then((res) => {
        if(res.status == 200 )  {
          flashSuccess(dispatch, "Import completed");
        }
    })
    .catch((error) => {
        console.log(error)
        flashError(dispatch, "Cannot import CSV file");
    });
  }
  const validate = (values) => {
    let errors = {};
    if (!csvFile) {
      errors.import_file = "Csv file is required";
    }
    return errors;
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        import_type: "something",
        import_file: csvFile
      }}
    >
      {({ handleSubmit, form, submitting, pristine, values }) => (
      <form className="form" onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
          <Field name="import_file">
            {({input, meta}) => (
              <div className="form__form-group">
                <div className="form__form-group-field flex-column">
                      <MuiButton variant="contained" component="label" style={{textTransform: 'inherit', padding:"2px 10px"}}>
                        Choose File
                        <input
                          hidden
                          type='file'
                          // accept='.csv'
                          id='csvFile'
                          {...input}
                          onChange={(e) => {
                            onSelectCsvFile(e.target.files[0])
                          }}
                          value={csvFile?.name.file}
                        >
                        </input>
                      </MuiButton>
                    </div>
                  {meta.touched && !csvFile && (
                    <span className="form__form-group-error">
                        {meta.error}
                    </span>
                  )}
              </div>
            )}
          </Field>
          </Col>
          <Col md="6"><TemplateButton disabled={false} type="button" text={"Upload"} />
        </Col></Row>
        <span className='text-small'>{csvFile?.name}</span>
      </form>
      )}
    </Form> 
  )
}

export default TransferTemplateUpload