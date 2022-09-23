import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import {
  Modal,
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
import {Form, Field} from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import {getEvents} from '@/services/program/getEvents'
import {getEvent} from '@/services/program/getEvent'
import EVENT_TYPES from "@/shared/json/eventTypes.json";
import {labelizeNamedData, patch4Select, flashDispatch, flashMessage} from '@/shared/helper'
import formValidation from "@/validation/givePeer2PeerReward"
import {connect} from "react-redux";
import axios from "axios";
import TemplateButton from "@/shared/components/TemplateButton"
import {getSocialWallPostTypeEvent} from '@/services/program/getSocialWallPostTypes'
import {createSocialWallPost} from '@/redux/actions/socialWallPostActions';
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import Slider from '@material-ui/core/Slider';

const RewardPeerPopup = ({isOpen, setOpen, toggle, participants, program, organization, myPoints, auth}) => {
  const dispatch = flashDispatch();
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const p2p = EVENT_TYPES.find(type => type.name === 'peer2peer')?.value;
  const p2pBadge = EVENT_TYPES.find(type => type.name === 'peer2peer badge')?.value;
  const [sliderValue, setSliderValue] = useState(1);

  const sliderHandler = (event, newValue) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
    }
  };

  const onSubmit = values => {
    // console.log(JSON.stringify( values ))
    var formData = {
      event_id: values.event_id,
      message: values.message,
      user_id: participants.map(p => p.id),
      email_template_id: event.email_template_id ? event.email_template_id : 1, // TODO email template
      override_cash_value: event && event.event_type && event.event_type.type === p2p ? sliderValue : null,
    }

    axios
      .post(`/organization/${organization.id}/program/${program.id}/award/`, formData)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          dispatch(flashMessage('Participants Awarded successfully!', 'alert-success', 'top'))

          // Post to Social Wall
          if (program.uses_social_wall) {
            let resultObject = res.data;

            getSocialWallPostTypeEvent(organization.id, program.id)
              .then(socialWallPostTypeEvent => {
                Object.keys(resultObject).map((key) => {
                  let resultData = resultObject[key]

                  let socialWallPostData = {
                    'social_wall_post_type_id': socialWallPostTypeEvent.id,
                    'social_wall_post_id': null,
                    'event_xml_data_id': resultData.event_xml_data_id,
                    'program_id': program.id,
                    'organization_id': organization.id,
                    'awarder_program_id': null,
                    'sender_user_account_holder_id': auth.account_holder_id,
                    'receiver_user_account_holder_id': resultData.userAccountHolderId,
                  }
                  // console.log(socialWallPostData);
                  dispatch(createSocialWallPost(organization.id, program.id, socialWallPostData))
                })
              })
          }
          // setSaving(false)
          window.location.reload()
        }
      })
      .catch((err) => {
        //console.log(error.response.data);
        dispatch(flashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        setSaving(false)
      });


  }

  const onChangeEvent = (selectedOption) => {
    getEvent(organization.id, program.id, selectedOption.value)
      .then(item => {
        setEvent(item)
        setSliderValue(1);
      })
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true)
    let type = [p2p, p2pBadge];
    getEvents(organization.id, program.id, {type: type})
      .then(items => {
        if (mounted) {
          if (items.length > 0) {
            setEvents(labelizeNamedData(items))
            setEvent(items.shift());
          }
          setLoading(false)
        }
      })
    return () => mounted = false;
  }, [])

  if (loading) return 'Loading...'

  let initialValues = {}

  if (event) {
    // console.log(p2p);
    // console.log(event);
    initialValues = {
      ...initialValues,
      ...{
        event_id: event.id,
        awarding_points: program.factor_valuation * event.max_awardable_amount,
        message: event.message,
        email_template_id: 1
      }
    }
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
            initialValues={initialValues}
            validate={(values) => formValidation.validateForm(values)}
          >
            {({handleSubmit, form, submitting, pristine, values}) => {
              return (
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
                      <Field name="event_id">
                        {({input, meta}) => (
                          <FormGroup>
                            <Select
                              onChange={onChangeEvent}
                              options={events}
                              clearable={false}
                              className="react-select"
                              placeholder={'Select an Event'}
                              classNamePrefix="react-select"
                              value={event ? labelizeNamedData([event]) : null}
                            />
                            {meta.touched && meta.error && <span className="text-danger">{meta.error}</span>}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  {event && event.event_type && event.event_type.type === p2p &&
                    <>
                      <Row>
                        <Col md="6">
                          <Label>Points</Label>
                        </Col>
                        <Col md="6">
                          <Field name="awarding_points">
                            {({input, meta}) => {
                              return (
                                <strong>{sliderValue}</strong>
                              )
                            }}
                          </Field>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Label>Custom Cash Value per Particiapnt</Label>
                        </Col>
                        <Col md="6">
                          <Field name="override_cash_value">
                            {({input, meta}) => (
                              <FormGroup>
                                {/*<Input*/}
                                {/*  placeholder={`Enter an amount < $${event.max_awardable_amount}`}*/}
                                {/*  type="text"*/}
                                {/*  onKeyUp={form.mutators.onChangeAwardValue}*/}
                                {/*  {...input}*/}
                                {/*/>*/}
                                <Slider
                                  onChange={sliderHandler}
                                  aria-label="Temperature"
                                  defaultValue={input.value}
                                  // getAriaValueText="asd"
                                  valueLabelDisplay="auto"
                                  step={1}
                                  // marks
                                  min={1}
                                  max={event.max_awardable_amount * program.factor_valuation}
                                  name={input.name}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                  {meta.error}
                              </span>}
                              </FormGroup>
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </>
                  }
                  <Row>
                    <Col md="6">
                      <Label>You can award</Label>
                    </Col>
                    <Col md="6">
                      <Label>{myPoints.peerBalance.toLocaleString()}</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Field name="message">
                        {({input, meta}) => (
                          <FormGroup>
                            <Input
                              placeholder="Message to Participant(s)"
                              type="textarea"
                              {...input}
                            />
                            {meta.touched && meta.error && <span className="text-danger">{meta.error}</span>}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-end'>
                    <Button color='danger' type='submit'>Reward Now</Button>
                  </div>
                </form>
              )
            }}
          </Form>
        </CardBody>
      </Card>


    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    myPoints: state.pointBalance
  };
};

export default connect(mapStateToProps)(RewardPeerPopup);
