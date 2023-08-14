import MuiButton from '@material-ui/core/Button';
import { Form, Field } from "react-final-form";
import React, { useState } from "react";
import { Col, Row} from "reactstrap";
import axios from "axios";

import TemplateButton from "@/shared/components/TemplateButton";
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash";
import { uploadTransferTemplate } from "@/services/program/transferMonies";

const TransferTemplateUpload = ({orgId, pId, toggle}) => {
  console.log(toggle)
  const dispatch = useDispatch(); //Dispatch

  const [errors, setErrors] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const onSelectCsvFile = (file) => {
    setCsvFile(file)
    setErrors([])
  }
  const onSubmit = () => {
    console.log(csvFile)
    const vErrors = validate()
    if( (vErrors.length ) > 0)  {
      console.log("Setting errors")
      setErrors(vErrors)
      return;
    }
    let data = new FormData();
    data.append('upload-file', csvFile)
    uploadTransferTemplate(orgId, pId, data)
    .then((res) => {
        console.log(res)
        if(res.status == 200 )  {
          flashSuccess(dispatch, "Transfer of monies completed.");
          toggle()
        } else {
          flashError(dispatch, 'Error occurred. Status:' + res.status);
        }
    })
    .catch((error) => {
        flashError(dispatch, error);
    });
  }
  const validate = () => {
    let errors = [];
    if ( !csvFile ) {
      console.log("Not file")
      errors.push("Csv file is required");
    }
    console.log(errors)
    return errors;
  }
  console.log(errors)
  return (
    <>
    <div><Row><Col md="6"><span className="text-bold">4. Upload completed transfer template.</span></Col><Col md="6" className="text-right">
      <Row>
        <Col md="6">
          <div className="form__form-group">
            <div className="form__form-group-field flex-column">
              <MuiButton variant="contained" component="label" style={{textTransform: 'inherit', padding:"2px 10px"}}>
                Choose File
                <input
                  hidden
                  type='file'
                  // accept='.csv'
                  id='csvFile'
                  onChange={(e) => {
                    onSelectCsvFile(e.target.files[0])
                  }}
                  value={csvFile?.name.file}
                >
                </input>
              </MuiButton>
            </div>
          </div>
        </Col>
        <Col md="6"><TemplateButton disabled={false} type="button" text={"Upload"} onClick={onSubmit} />
        
        </Col>

      </Row>
      <span className='text-small'>{csvFile?.name}</span>
      </Col></Row>
      {(errors.length > 0) && <ul className='form-error'>{errors.map( err => <li>{err}</li>) }</ul>}
      </div>
    </>
  )
}

export default TransferTemplateUpload