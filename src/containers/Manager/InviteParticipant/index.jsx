import React, {useState} from 'react';
import Select from 'react-select';
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

const InviteParticipant = ({auth, organization}) => {
  const [value, setValue] = useState(false);
  /*const onSubmit = values => {
    
  }*/
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  //const programs = getProgram(organization.id,null);
  console.log(organization)
  //const program_list =  axios.get(`/organization/${organization.id}/program?minimal=true`)
  //console.log(program_list)
  //console.log(auth);
  const onSubmit  = values  => {
     console.log(values)
   //console.log(program_list)
    // return
    setLoading(true)
    axios.put(`/organization/${organization.id}/program/${values.program_id}/invite`, values)
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
  return (
    <div className='invite-participant'>
        <h2 className='title'>Invite Participant</h2>
        <Form
              onSubmit={onSubmit}
              
              initialValues={{}}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                   
                   
                   <Row>  
                    <Col md="12">
                        <Field name="program_id">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Program id *"
                                type="text"
                                {...input}
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                            </FormGroup>
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
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
                                value={value}
                                onChange={{}}
                                options={[]}
                                clearable={false}
                                className="react-select"
                                placeholder={'Award Level'}
                                classNamePrefix="react-select"
                              />
                                  {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
     organization: state.organization,
  };
};
export default connect(mapStateToProps)(InviteParticipant);
