import React, {useState, useEffect} from 'react';
import Select from 'react-select';
//import formValidation from "@/validation/inviteParticipant"
//import { Link } from 'react-router-dom';
import { Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
//import {useDispatch, sendFlashMessage} from "@/shared/components/flash/FlashMessage";
import {useDispatch, useSelector, connect} from 'react-redux';
import {sendFlashMessage} from '@/redux/actions/flashActions';
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
//import SelectProgram from '../components/SelectProgram'
//import {setAuthProgram} from '@/containers/App/auth';
//import {getProgram} from '@/services/program/getProgram';
import { makeLabelizedOptionsFromTree } from '@/shared/helper';
import {getProgramTree} from '@/services/program/getProgramTree';


const InviteParticipant = ({auth, organization, rootProgram}) => {
  const [programOptions, setProgramOptions] = useState([])

  useEffect(() => {
    if( rootProgram && rootProgram?.id ) {
      getProgramTree(auth.organization_id, rootProgram.id)
      .then( p => {
        setProgramOptions( makeLabelizedOptionsFromTree(p) )
      })
    }
  }, [rootProgram])

  const [value, setValue] = useState(false);
  /*const onSubmit = values => {
    
  }*/
  let [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  //const programs = getProgram(organization.id,null);
  // console.log(organization)
  //const program_list =  axios.get(`/organization/${organization.id}/program?minimal=true`)
  //console.log(program_list)
  //console.log(auth);
  const onSelectProgram = (selectedOption) => {
    setProgram( selectedOption )
  };
  const onSubmit  = values  => {
  //    console.log(values)
  //  //console.log(program_list)
  //   return
    setLoading(true)
    axios.put(`/organization/${organization.id}/program/${values.program.value}/invite`, values)
    .then( (res) => {
        // console.log(res)
        if(res.status == 200)  {
           // window.location = `/organization/${organization.id}/program/${values.program_id}/invite?message=User saved successfully`
           window.location.reload()
           dispatch(sendFlashMessage('The participant has been invited to your program!', 'alert-success', 'top'))
           setLoading(false)
        }
    })
    .catch( error => {
      //console.log(error.response.data);
      dispatch(sendFlashMessage(<ApiErrorMessage errors={error.response.data} />, 'alert-danger'))
      setLoading(false)
    })
}
// console.log(programOptions)
  return (
    <div className='invite-participant'>
        <h2 className='title mb-3'>Invite Participant</h2>
        <div className="d-flex align-items-center justify-content-center">
          <SelectProgram />
        </div>
        <Form
              onSubmit={onSubmit}
              initialValues={{}}
              validate={validate}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                   <Row>  
                    <Col md="12">
                      <Field name={'program'}
                          parse={
                              (value) => {
                                  onSelectProgram(value)
                                  return value
                              }
                          }
                      >
                      {({ input, meta }) => (
                          <div className="form__form-group">
                              <span className="form__form-group-label">Select your Reward Program</span>
                              <div className="form__form-group-field">
                                  <div className="form__form-group-row">
                                      <Select
                                          options={programOptions}
                                          clearable={false}
                                          className="react-select"
                                          placeholder={' --- '}
                                          classNamePrefix="react-select"
                                          value={program}
                                          {...input}
                                      />
                                      {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                                  </div>
                              </div>
                          </div>
                      )}
                      </Field>
                    </Col>
                  </Row>
                  <Row>  
                    <Col md="12">
                        <Field name="first_name">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="First Name *"
                                type="text"
                                {...input}
                              />
                               {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>  
                    <Col md="12">
                        <Field name="last_name">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Last Name *"
                                type="text"
                                {...input}
                              />
                               {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>  
                    <Col md="12">
                        <Field name="external_id">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="External ID"
                                type="text"
                                {...input}
                              />
                               {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>  
                    <Col md="12">
                        <Field name="email">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Email Address *"
                                type="text"
                                {...input}
                              />
                               {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Field name="award_level">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                options={options}
                                clearable={true}
                                className="react-select"
                                placeholder={'Award Level'}
                                classNamePrefix="react-select"
                                parse={value => {
                                  // handleAwardLevelChange(value)
                                  return value;
                              }}
                              />
                               {meta.touched && meta.error && <span className="form-error">{meta.error}</span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-center'>
                    <Button  color='danger' type='submit'>Invite Participant</Button>
                  </div>
                </form>
              )}
        </Form>
    </div>
)}

const validate = values => {
  let errors = {};
  if( !values.program ) {
    errors.program = "Select a program";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.first_name) {
    errors.first_name = "first_name is required";
  }
  if (!values.last_name) {
    errors.last_name = "last_name is required";
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    rootProgram: state.rootProgram,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(InviteParticipant);
