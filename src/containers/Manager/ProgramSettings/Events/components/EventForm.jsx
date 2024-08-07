import React, { useState, useEffect } from "react";
import { Input, Col, Row, FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

//CustomModules

import {useDispatch, flashError, flashSuccess} from "@/shared/components/flash"
import renderSelectField from '@/shared/components/form/Select'
import {getEventTypes} from '@/services/getEventTypes'
import {getEventLedgerCodes} from '@/services/events'
import {labelizeNamedData, patch4Select, isBadgeAward, isCustomAward} from '@/shared/helpers'
import renderToggleButtonField from "@/shared/components/form/ToggleButton"
import formValidation from "@/validation/addEvent"
import TemplateButton from "@/shared/components/TemplateButton"
import Tabs from "./Tabs"
import { makeFormData } from './common'
import AwardLevelModal from './AwardLevelModal';
import {getEvent} from "@/services/program/getEvent";

const EventForm = ({
  data,
  toggle,
  program,
  setTrigger
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  let [event, setEvent] = useState(null);
  const [ledgerCodes, setLedgerCodes] = useState([]);
  const [eventTypeId, setEventTypeId] = useState( null );
  const [programAwardLevels, setProgramAwardLevels] = useState( [] );
    const [awardModalOpen, setAwardModalOpen] = useState(false);
    const [programAwardLevel, sePprogramAwardLevel] = useState({});

  const onChangeEventType = (value) => {
    setEventTypeId(value.value);
  }

  const getListLedgerCodes = (program) => {
    getEventLedgerCodes(program.organization_id, program.id)
    .then(ledgercodes => {
      setLedgerCodes(labelizeNamedData(ledgercodes, ["id", "ledger_code"]))
    })
  }

    const getProgramAwardLevels = async () => {
        const response = await axios.get(
            `/organization/${data.organization_id}/program/${program.id}/program-award-levels`,
        );
        setProgramAwardLevels(response.data);
    };

    const createItems = async (fValue) => {
        const response = await axios.post(
            `/organization/${data.organization_id}/program/${program.id}/create-award-level`, fValue);
        if (response.data.success){
            // getDataItems();
            // setAction('index');
            // setAwardLevelName('');
        }
    };

  useEffect( () => {
    if( data?.id )
    {
      setEvent(data)
      setEventTypeId(data.event_type_id);
        getProgramAwardLevels();
    }
    if( program?.id ) {
      getEventTypes(program.organization_id, program.id)
      .then( evtypes => {
        // console.log(evtypes)
        setEventTypes(labelizeNamedData(evtypes))
        setLoading(false)
      })
      getListLedgerCodes(program)
    }
  }, [data, program])

  const [isIconModalOpen, setIconModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('2');

  const onSubmit = (values) => {
    if(isCustomAward( getActiveEventTypeId() )){
      values.award_message_editable = true;
    }
    let data = makeFormData(program, values)
    let url = `/organization/${program.organization_id}/program/${values.program_id ? values.program_id : program.id}/event`
    let method = 'post'

    if(event?.id) //Is Edit
    {
      url += `/${event.id}`
      method = 'put'
    }

    setLoading(true)
    axios({
      url,
      method,
      data
    })
    .then((res) => {
      //   console.log(res)
      if (res.status == 200) {
        flashSuccess(dispatch, 'Event saved successfully!')
        setLoading(false)
        // window.location.reload()
        // setTrigger(Math.floor(Date.now() / 1000))
        toggle(null, true)
      }
    })
    .catch((err) => {
      //console.log(error.response.data);
      flashError(dispatch, err.response.data)
      setLoading(false)
    });
  };

  const toggleIconModal = () => {
    setIconModalOpen(prevState => !prevState)
  }

  const setIconPath = (icon) => {
    const path = process.env.REACT_APP_API_STORAGE_URL + "/" + icon.path;
    return path;
  }

  const onChangeAwardValue = ([field], state, { setIn, changeValue }) => {
    const v = field.target.value
    if( isNaN( v ) ) return;
    if(field.target.name === 'max_awardable_amount')
    {
      const field = state.fields["awarding_points"];
      field.change( program.factor_valuation *  v);
    }
    else if(field.target.name === 'awarding_points')
    {
      const field = state.fields["max_awardable_amount"];
      field.change(  v / program.factor_valuation );
    }
  }

  const setEventIcon = ([fieldName, fieldVal], state, {changeValue }) => {
    if(!event?.id)
    {
      // // The fields changed in fields in above resets after closing the modal. I think this is related to Two modal opened, one after another or something??
      changeValue(state, 'event_icon_id', () => fieldVal.id);
      changeValue(state, fieldName, () => fieldVal);
    } else  {
      let newEvent = {...event, ...{'event_icon_id': fieldVal.id, [fieldName]: fieldVal}}
      setEvent(newEvent)
    }

    setIconModalOpen(false);
  }

  const getActiveEventTypeId = () => {
    if( eventTypeId ) return eventTypeId
    if( event && event?.event_type_id) return event.event_type_id
  }

  if( loading ) return "loading..."

  if (event && event?.id) {
    event = patch4Select(event, 'event_type_id', eventTypes)
    event = patch4Select(event, 'ledger_code', ledgerCodes)
    event.icon = event?.icon ? event.icon : event.event_icon
    if (event?.max_awardable_amount) {
      event.awarding_points = program.factor_valuation * event.max_awardable_amount
    }
  }
    const handleDeleteAwardLevel = (award) => {
        axios.delete(`/organization/${program.organization_id}/program/${program.id}/event-award-level/${award.id}`, {data:award})
            .then((res) => {
                onClickEditEvent(event.id)
            }).catch((err) => {
        });
    };

    const handleAddAwardLevel = (award) => {
        sePprogramAwardLevel(award);
        setAwardModalOpen(true);
    };
    const handleAssignAwardLevel = () => {
        getProgramAwardLevels();
        onClickEditEvent(event.id)
        setAwardModalOpen(false);
    };

    const onClickEditEvent = (eventId) => {
        getEvent(program.organization_id, program.id, eventId).then((item) => {
            setEvent(item);
        });
    };

  return (
    <Form
      keepDirtyOnReinitialize
      mutators={{
        onChangeAwardValue,
        setEventIcon
      }}
      onSubmit={onSubmit}
      validate={(values) => formValidation.validateForm(values)}
      initialValues={event}
    >
      {({ handleSubmit, form, submitting, pristine, values }) => {
        // console.log(values.icon)
        return (
          <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Label>Event Type</Label>
                <Field
                  name="event_type_id"
                  className="react-select"
                  options={eventTypes}
                  placeholder={'Select Event Type'}
                  component={renderSelectField}
                  parse={value => {
                    onChangeEventType(value)
                    return value;
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Label>Event Name</Label>
                <Field name="name">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="Event Name"
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
              <Col md="6">
                <Label>Ledger Code</Label>
                <Field
                    name="ledger_code"
                    className="react-select"
                    options={ledgerCodes}
                    isClearable={true}
                    component={renderSelectField}
                    placeholder={''}
                />
              </Col>
            </Row>
            {!isBadgeAward( getActiveEventTypeId() ) && !isCustomAward( getActiveEventTypeId() ) && (
            <Row>
              <Col md="6">
                <Label>Max Awardable Amount</Label>
                <Field name="max_awardable_amount">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="Max Awardable Amount"
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
              <Col md="6">
                <Label>Awarding Points</Label>
                <Field name="awarding_points">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="Awarding Points"
                        onKeyUp={form.mutators.onChangeAwardValue}
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
            </Row>)}
            <Row className="mb-3">
              <Col md="9">
                <Label>Icon</Label>
                <div
                  className="border_hover_div"
                  onClick={() => setIconModalOpen(true)}
                >
                  <div className="text">
                    {values.icon ? values.icon.name : "+ Add an Icon"}
                  </div>
                  {values.icon &&
                    <div className="email_icon">
                      <img src={setIconPath(values.icon)} alt="icons" />
                    </div>}
                </div>
                <Field name="event_icon_id">
                  {({ input, meta }) => (
                    <>
                      <input
                        type="hidden"
                        {...input}
                        placeholder="Event Name"
                      />
                      {meta.touched && meta.error && <span className="text-danger">
                        {meta.error}
                      </span>}
                    </>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <FormGroup className='d-flex justify-content-between'>
                  <Label>Enable This Event</Label>
                  <Field
                      name="enable"
                      component={renderToggleButtonField}
                  />
                </FormGroup>
              </Col>
              </Row>
          { program.uses_social_wall > 0 &&
              <Row>
              <Col md="8">
                <FormGroup className='d-flex justify-content-between'>
                  <Label>Post to Social Wall</Label>
                  <Field
                    name="post_to_social_wall"
                    component={renderToggleButtonField}
                  />
                </FormGroup>
              </Col>
            </Row>
          }
          { !isCustomAward( getActiveEventTypeId() ) &&
            <Row>
              <Col md="8">
                <FormGroup className='d-flex justify-content-between'>
                  <Label>Award Message Editable</Label>
                  <Field
                    name="award_message_editable"
                    component={renderToggleButtonField}
                  />
                </FormGroup>
              </Col>
            </Row>
          }
            <Row>
              <Col md="12">
                <Label>Award Message</Label>
                <Field name="message">
                  {({ input, meta }) => (
                    <FormGroup>
                      <Input
                        placeholder="Award Message"
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
                      <h5>Event Awards Levels </h5>
                      <table className="table">
                          <thead>
                          <tr>
                              <th>Name</th>
                              <th>Award Level ID</th>
                              <th>Amount</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          {event?.eventAwardsLevel.map((award, index) => (
                              <tr key={index}>
                                  <td>{award.name}</td>
                                  <td>{award.award_level_id}</td>
                                  <td>{award.amount}</td>
                                  <td>
                                      <button type={'button'} style={{margin: 0}}
                                              onClick={() => handleDeleteAwardLevel(award)}>Delete
                                      </button>
                                  </td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </Col>
              </Row>
              <AwardLevelModal
                  isOpen={awardModalOpen}
                  toggle={() => setAwardModalOpen(false)}
                  awardLevel={programAwardLevel}
                  eventId={event?.id}
                  handleAssign={handleAssignAwardLevel}
                  organizationId = {data?.organization_id}
                  programId = {program.id}
              />
              <Row>
                  <Col md="12">
                      <h5>Awards Levels </h5>
                      <table className="table">
                          <tbody>
                          {programAwardLevels.map((award, index) => (
                              <tr key={index}>
                                  <td>{award.name}</td>
                                  <td style={{textAlign:'right'}}>
                                      <button type={'button'} style={{margin:0}} onClick={() => handleAddAwardLevel(award)} >Assign</button>
                                  </td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </Col>
              </Row>
            <div className='d-flex justify-content-end'>
              <TemplateButton disabled={loading} type='submit' text={"Save"} />
            </div>
            <Modal
              className={`modal-program-events-icons modal-lg ltr-support`}
              isOpen={isIconModalOpen}
              toggle={toggleIconModal}
            >
              <ModalBody className="modal-lg">
                <Col md={12} lg={12}>
                  <Row className="w100">
                    <Col md="6" lg="6" xl="6">
                      <h3>Insert Icon</h3>
                    </Col>
                  </Row>
                  <div className="pt-5 tabs">
                    <Tabs
                      onSelectIconOK={form.mutators.setEventIcon}
                      activeTab={activeTab}
                      onCancel={() => setIconModalOpen(false)}
                      icon={values?.icon ? values.icon : values.event_icon}
                    />
                  </div>
                </Col>
              </ModalBody>
            </Modal>
          </form>
        )
      }
      }
    </Form>
  )
}

export default EventForm;
