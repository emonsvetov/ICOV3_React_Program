import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Modal, 
  Input, 
  Col, 
  Row, 
  FormGroup, 
  FormFeedback, 
  Label, 
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';

const RewardPeerPopup = ({isOpen, setOpen, toggle, participants}) => {
  // console.log(participants)
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

  return (
    <Modal className={`modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
          
          <Card className='w-100'>
            <CardHeader tag="h3">
            
              Reward a Peer
              
              <Button className='btn btn-lg float-end' close onClick={toggle}/>
              
              </CardHeader>
            <CardBody>
              
              <Form
                onSubmit={onSubmit}
                initialValues={{}}
              >
                {({ handleSubmit, form, submitting, pristine, values }) => (
                  <form className="form flex-column justify-content-evenly" onSubmit={handleSubmit}> 
                    
                    <Row>
                      <Col md="6">
                        <Label>Give a Reward to:</Label>
                      </Col>
                      <Col md="6">
                          {participants.map((item, index) => {
                            return <div key={index}>
                              <strong>{item.name}</strong>
                            </div>
                          })}
                      </Col>
                    </Row>
                    
                    <Row>
                    <Col md="6">
                          <img alt='Event'></img>
                      </Col>
                      <Col md="6">
                          <Field name="event">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Select
                                  value={value}
                                  onChange={{}}
                                  options={[]}
                                  clearable={false}
                                  className="react-select"
                                  placeholder={'Select an Event'}
                                  classNamePrefix="react-select"
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>You can award</Label>
                      </Col>
                      <Col md="6">
                        <Label>{2}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                          <Field name="message">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Message to Participant(s)"
                                  type="textarea"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                      <Button  color='danger' type='submit'>Reward Now</Button>
                    </div>
                  </form>
                )}
              </Form>
            </CardBody>
          </Card>

          
    </Modal>
)}

export default RewardPeerPopup;
