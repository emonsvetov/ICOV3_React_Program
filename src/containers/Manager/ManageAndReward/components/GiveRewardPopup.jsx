import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import { Modal, Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap'
import { Form, Field } from 'react-final-form'
import CloseIcon from 'mdi-react/CloseIcon'
import {getEvents} from '@/services/program/getEvents'
import {getEvent} from '@/services/program/getEvent'
import {labelizeNamedData, patch4Select, flashDispatch, flashMessage } from '@/shared/helper'
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import axios from 'axios'
import formValidation from "@/validation/giveReward"
import {fetchEmailTemplates} from '@/services/getEmailTemplates';

const DEFAULT_MSG_PARTICIPANT = "We wanted to thank you for all your extra efforts over the last couple of days.\n\nThough your response and tireless efforts. You made a BIG Different!!\n\nWe would like to recognize those efforts with this award to reflect our appreciation.\n\nGreg, Gerry and Bruce\n\nGreg and Gerry"

const GiveRewardImg = `/img/pages/giveReward.png`;
// const Participants = [
//   'Bobrowski Robert'
// ]
const GiveRewardPopup = ({isOpen, setOpen, toggle, participants, program, organization}) => {
  const dispatch = flashDispatch()
  // console.log(participants)
  const [value, setValue] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [templateContents, setTemplateContents] = useState([]);

  const handleTemplateChange = (selected) => {
    // setCurrentTemplate(selected.value - 1)
    
  }

  const onChangeAwardValue = ([field], state, { setIn, changeValue }) => {
    const v = field.target.value
    if( isNaN( v ) ) return;
    if(field.target.name === 'override_cash_value')  
    {
      if( parseInt(v) > event.max_awardable_amount) {
        alert(`Value cannot exceed max awardable amount ${event.max_awardable_amount}`)
        state.fields["override_cash_value"].change( event.max_awardable_amount )
        return
      }
      const field = state.fields["awarding_points"];
      field.change( program.factor_valuation *  v);
    }
  }

  const onSubmit = values => {
    // console.log(JSON.stringify( values ))
    var formData = {
      event_id: values.event_id,
      notes: values.notes,
      message: values.message,
      user_id: participants.map( p => p.id),
      override_cash_value: values.override_cash_value ? values.override_cash_value : null,
      referrer: values.referrer ? values.referrer : null,
      email_template_id: values.email_template_id
    }
    // console.log(formData)
    // return
    // setSaving(true)

    axios
    .post(`/organization/${organization.id}/program/${program.id}/award`, formData)
    .then((res) => {
      //   console.log(res)
      if (res.status == 200) {
        dispatch(flashMessage('Participants Awarded successfully!', 'alert-success', 'top'))
        // setSaving(false)
        // window.location.reload()
      }
    })
    .catch((err) => {
      //console.log(error.response.data);
      dispatch(flashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
      setSaving(false)
    });

    console.log(formData)
  }

  const onChangeEvent = (selectedOption) => {
    setLoadingEvent(true)
    getEvent(organization.id, program.id, selectedOption.value)
      .then(item => {
        // console.log(item)
        setEvent(item)
        setLoadingEvent(false)
    })
  };

  useEffect( () => {
    let mounted = true;
    setLoading(true)
    getEvents(organization.id, program.id)
    .then(items => {
      if(mounted) {
        // console.log(items)
        if( items.length > 0) {
          setEvents(labelizeNamedData(items))
        }
        setLoading(false)
      }
    })
    fetchEmailTemplates('program_event')
    .then( res => {
      setEmailTemplates(labelizeNamedData(res))
      setTemplateContents(res)
    })
    return () => mounted = false;
  }, [])

  if( loading ) return 'Loading...'

  let initialValues = {
  }

  if( event ){
    // console.log(event)
    initialValues = {
      ...initialValues, 
      ...{
        event_id: event.id,
        awarding_points: program.factor_valuation * event.max_awardable_amount,
        message: DEFAULT_MSG_PARTICIPANT,
        email_template_id: 1
      }
    }
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
          <div className='close cursor-pointer'>
            <CloseIcon onClick={toggle} size={30}/>
          </div>
          <div className="left">
            <div className='title mb-5'>
              <h3>Give A Reward</h3>
              <span>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </span>
              
            </div>
            
            <img src={GiveRewardImg} className='manage'/>
          </div>
          <div className="right">
            {saving && 'Saving, please wait...'}
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={(values) => formValidation.validateForm(values)}
              mutators={{
                onChangeAwardValue
              }}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => {
                // console.log(values)
                return (
                <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                              
                  <Row>  
                    <Col md="12">
                        <Field name="event_id">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Select
                                onChange={onChangeEvent}
                                options={events}
                                clearable={false}
                                className="react-select"
                                placeholder={'Select an Event'}
                                classNamePrefix="react-select"
                              />
                              {meta.touched && meta.error && <span className="text-danger">
                                {meta.error}
                            </span>}
                            </FormGroup>
                        )}
                        </Field>
                        {loadingEvent && <span>Loading...</span>}
                    </Col>
                  </Row>
                  {event && 
                    <>
                    <Row>
                      <Col md="6">
                        <Label>Participant List to be Rewarded</Label>
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
                        <Label>Maximum Cash Value per Particiapnt</Label>
                      </Col>
                      <Col md="6">                        
                          <strong>{`$${event?.max_awardable_amount}`}</strong>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <Label>Custom Cash Value per Particiapnt</Label>
                      </Col>
                      <Col md="6">
                          <Field name="override_cash_value">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder={`Enter an amount < $${event.max_awardable_amount}`}
                                  type="text"
                                  onKeyUp={form.mutators.onChangeAwardValue}
                                  {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                  {meta.error}
                              </span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>Points per Particiapnt</Label>
                      </Col>
                      <Col md="6">
                        <Field name="awarding_points">
                          {({ input, meta }) => {
                            // console.log(input)
                            return (
                              // <Input
                              //     readOnly={true}
                              //     placeholder="Awarding Points"
                              //     onKeyUp={form.mutators.onChangeAwardValue}
                              //     type="text"
                              //     {...input}
                              // />
                              <strong>{input.value > 0 ? input.value : event.max_awardable_amount * program.factor_valuation}</strong>
                          )}}
                        </Field>
                        {/* <strong>{values?.override_cash_value ? values.override_cash_value * program.factor_valuation : event.max_awardable_amount * program.factor_valuation}</strong> */}
                        {/* <strong>{event?.point_value ? event.point_value : 0}</strong> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                          <Field name="email_template_id">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Select
                                  options={emailTemplates}
                                  initialValue = {emailTemplates[event.email_template_id - 1]} 
                                  clearable={false}
                                  className="react-select"
                                  placeholder={'Email Template'}
                                  classNamePrefix="react-select"
                                  parse={value => {
                                    handleTemplateChange(value)
                                    form.mutators.onChangeEmailTemplate(value)
                                    return value;
                                }}
                                />
                                  {meta.touched && meta.error && <span className="text-danger">
                                  {meta.error}
                              </span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                      <Col md="6">
                          <Field name="referrer">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Referrer"
                                  type="text"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <span className="text-danger">
                                {meta.error}
                            </span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>Total People Selected</Label>
                      </Col>
                      <Col md="6">                        
                          <strong>{participants.length}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>Documentation</Label>
                      </Col>
                      <Col md="6">                        
                      <Field name="doc_file">
                          {({ input, meta }) => (
                              <FormGroup>
                                <Input
                                  placeholder="Browse"
                                  type="file"
                                  {...input}
                                />
                                    {meta.touched && meta.error && <span className="text-danger">
                                {meta.error}
                            </span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>Total Award</Label>
                      </Col>
                      <Col md="6">                        
                          <strong>${participants.length * (values?.override_cash_value ? values.override_cash_value : event.max_awardable_amount) }</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Field name="notes">
                        {({ input, meta }) => (
                            <FormGroup>
                              <Input
                                placeholder="Reward Notes(optional)"
                                type="textarea"
                                {...input}
                              />
                                  {meta.touched && meta.error && <span className="text-danger">
                                {meta.error}
                            </span>}
                            </FormGroup>
                        )}
                        </Field>
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
                                    {meta.touched && meta.error && <span className="text-danger">
                                {meta.error}
                            </span>}
                              </FormGroup>
                          )}
                          </Field>
                      </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                      <Button disabled={saving} color='danger' type='submit'>Save Reward</Button>
                    </div>
                  </>}
                </form>
              )}}
            </Form>
          </div>
    </Modal>
)}

export default GiveRewardPopup;
