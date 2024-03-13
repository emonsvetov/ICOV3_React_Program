import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Modal,
  Input,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Form, Field } from "react-final-form";
import { getEvents } from "@/services/program/getEvents";
import { getEvent } from "@/services/program/getEvent";
import EVENT_TYPES from "@/shared/json/eventTypes.json";
import {
  labelizeNamedData,
  flashDispatch,
  flashMessage,
} from "@/shared/helpers";
import formValidation from "@/validation/givePeer2PeerReward";
import { connect } from "react-redux";
import axios from "axios";
import { getSocialWallPostTypeEvent } from "@/services/program/getSocialWallPostTypes";
import { createSocialWallPost } from "@/redux/actions/socialWallPostActions";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import Slider from "@material-ui/core/Slider";
import { useTranslation } from "react-i18next";

const RewardPeerPopup = ({
  isOpen,
  setOpen,
  toggle,
  participants,
  program,
  organization,
  pointBalance,
  auth,
}) => {
  const { t } = useTranslation();
  const dispatch = flashDispatch();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const p2p = EVENT_TYPES.find((type) => type.name === "peer2peer")?.value;
  const p2pBadge = EVENT_TYPES.find(
    (type) => type.name === "peer2peer badge"
  )?.value;
  const [sliderValue, setSliderValue] = useState(program.factor_valuation);

  const sliderHandler = (event, newValue) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
    }
  };

  const onSubmit = (values) => {
    // console.log(JSON.stringify( values ))
    var formData = {
      event_id: values.event_id,
      message: values.message,
      user_id: participants.map((p) => p.id),
      override_cash_value:
        event && event.event_type && event.event_type.type === p2p
          ? sliderValue
          : null,
    };

    formData.override_cash_value = formData.override_cash_value / program.factor_valuation
    setSaving(true)
    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/award/`,
        formData
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch(flashMessage(t("award_success"), "alert-success", "top"));

          // Post to Social Wall
          if (program.uses_social_wall) {
            let resultObject = res.data;

            getSocialWallPostTypeEvent(organization.id, program.id).then(
              (socialWallPostTypeEvent) => {
                Object.keys(resultObject).map((key) => {
                  let resultData = resultObject[key];

                  let socialWallPostData = {
                    social_wall_post_type_id: socialWallPostTypeEvent.id,
                    social_wall_post_id: null,
                    event_xml_data_id: resultData.event_xml_data_id,
                    program_id: program.id,
                    organization_id: organization.id,
                    awarder_program_id: null,
                    sender_user_account_holder_id: auth.account_holder_id,
                    receiver_user_account_holder_id:
                      resultData.userAccountHolderId,
                  };
                  // console.log(socialWallPostData);
                  dispatch(
                    createSocialWallPost(
                      organization.id,
                      program.id,
                      socialWallPostData
                    )
                  );
                });
              }
            );
          }
          // setSaving(false)
          window.location.reload();
        }
      })
      .catch((err) => {
        // console.log(err.response.data);
        dispatch(
          flashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setSaving(false);
      });
  };

  const onChangeEvent = (selectedOption) => {
    getEvent(organization.id, program.id, selectedOption.value).then((item) => {
      setEvent(item);
      setSliderValue(1);
    });
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    let type = [p2p, p2pBadge];
    getEvents(organization.id, program.id, { type: type }).then((items) => {
      if (mounted) {
        if (items.length > 0) {
          setEvents(labelizeNamedData(items));
          setEvent(items.shift());
        }
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, []);

  if (loading) return t("loading");

  let initialValues = {};
  let eventIconSrc = `${process.env.PUBLIC_URL}/img/award-event-icon.png`

  const peerBalance = pointBalance?.peerBalance ? pointBalance.peerBalance : 0;
  let max_awardable_points = peerBalance * program.factor_valuation;

  if (event) {
    // console.log(p2p);
    // console.log(event);
    
    if( event?.icon?.id )
    {
      eventIconSrc = `${process.env.REACT_APP_API_STORAGE_URL}/${event.icon.path}`
    }

    const max_awardable_amount = event.max_awardable_amount ? event.max_awardable_amount : 0;
    if( max_awardable_amount < peerBalance ) {
      max_awardable_points = max_awardable_amount * program.factor_valuation;
    }
    

    initialValues = {
      ...initialValues,
      ...{
        event_id: event.id,
        awarding_points: max_awardable_points,
        message: event.message,
        email_template_id: 1,
      },
    };
  }

  return (
    <Modal
      className={`modal-2col modal-lg`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <Card className="w-100">
        <CardHeader tag="h3">
          {t("reward_a_peer")}
          <Button
            className="btn btn-lg float-end"
            style={{ float: "right" }}
            close
            onClick={toggle}
          />
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={(values) => formValidation.validateForm(values)}
          >
            {({ handleSubmit, form, submitting, pristine, values }) => {
              return (
                <form
                  className="form flex-column justify-content-evenly"
                  onSubmit={handleSubmit}
                >
                  <Row>
                    <Col md="6">
                      <Label>{t("reward_to")}:</Label>
                    </Col>
                    <Col md="6">
                      {participants.map((item, index) => {
                        return (
                          <div key={index}>
                            <strong>{item.name}</strong>
                          </div>
                        );
                      })}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <img alt="Event" src={eventIconSrc} style={{maxHeight:40}}></img>
                    </Col>
                    <Col md="6">
                      <Field name="event_id">
                        {({ input, meta }) => (
                          <FormGroup>
                            <Select
                              onChange={onChangeEvent}
                              options={events}
                              clearable={false}
                              className="react-select"
                              placeholder={t("select_an_event")}
                              classNamePrefix="react-select"
                              value={event ? labelizeNamedData([event]) : null}
                            />
                            {meta.touched && meta.error && (
                              <span className="text-danger">{meta.error}</span>
                            )}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  {event &&
                    event.event_type &&
                    event.event_type.type === p2p && (
                      <>
                        <Row>
                          <Col md="6">
                            <Label>{t('points')}</Label>
                          </Col>
                          <Col md="6">
                            <Field name="awarding_points">
                              {({ input, meta }) => {
                                return <strong>{sliderValue}</strong>;
                              }}
                            </Field>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <Label>
                              {t("custom_cash_value_per_participant")}
                            </Label>
                          </Col>
                          <Col md="6">
                            <Field name="override_cash_value">
                              {({ input, meta }) => (
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
                                    step={program.factor_valuation}
                                    // marks
                                    min={0}
                                    max={max_awardable_points}
                                    name={input.name}
                                  />
                                  {meta.touched && meta.error && (
                                    <span className="text-danger">
                                      {meta.error}
                                    </span>
                                  )}
                                </FormGroup>
                              )}
                            </Field>
                          </Col>
                        </Row>
                      </>
                    )}
                  <Row>
                    <Col md="6">
                      <Label>{t("you_can_award")}</Label>
                    </Col>
                    <Col md="6">
                      <Label>{max_awardable_points.toLocaleString()}</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Field name="message">
                        {({ input, meta }) => (
                          <FormGroup>
                            <Input
                              placeholder={t("message_to_participant")}
                              type="textarea"
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="text-danger">{meta.error}</span>
                            )}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button color="danger" type="submit" disabled={saving}>
                      {t("reward_now")}
                    </Button>
                  </div>
                </form>
              );
            }}
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    pointBalance: state.pointBalance,
  };
};

export default connect(mapStateToProps)(RewardPeerPopup);
