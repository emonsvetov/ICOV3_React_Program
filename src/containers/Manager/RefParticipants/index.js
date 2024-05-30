import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, FormGroup, Input, Label, Navbar, NavbarBrand, Row } from "reactstrap";
import Select from "react-select";
import TemplateButton from "@/shared/components/TemplateButton";
import { Img } from '@/theme'
import { useParams } from "react-router-dom";
import { flash422, flashSuccess } from "@/shared/components/flash";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { MerchantSlider } from "@/containers/Participant/Home/components/slider";

const RefParticipants = ({ template, program}) => {
  // console.log(auth)
  let params = useParams();

  const formOptions = [
    { value: 'category_referral', label: 'Referral' },
    { value: 'category_lead', label: 'Request Information' },
    { value: 'category_feedback', label: 'Feedback / Review' },
  ];

  const [selected, setSelected] = useState({ value: 'category_referral', label: 'Referral' })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSelectChange = (selectedOption) => {
    setSelected(selectedOption)
  };

  const onSubmit = (values) => {
    setLoading(true);
    let url = `/organization/${program.organization_id}/program/${program.id}/refer-participants`
    delete values.category_referral;
    delete values.category_lead;
    delete values.category_feedback;
    values[selected.value] = 1;
    // values.sender_id = user.id;
    axios
      .post( url,values )
      .then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // window.location.reload();
          flashSuccess(
            dispatch,
            "Thank you, we received your submission!"
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        //console.log(error.response.data);
        flash422(dispatch, error?.response?.data || error.message);
        setLoading(false);
      });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.sender_email) {
      errors.sender_email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.sender_email)) {
      errors.sender_email = "Invalid email address";
    }
    if (!values.sender_first_name) {
      errors.sender_first_name = "First name is required";
    }
    if (!values.sender_last_name) {
      errors.sender_last_name = "Last name is required";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    //referral
    if(selected.value == 'category_referral'){
      if (!values.recipient_email) {
        errors.recipient_email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.recipient_email)) {
        errors.recipient_email = "Invalid email address";
      }
      if (!values.recipient_first_name) {
        errors.recipient_first_name = "First name is required";
      }
      if (!values.recipient_last_name) {
        errors.recipient_last_name = "Last name is required";
      }
    }
    return errors;
  };

  if (!template) return "loading";
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;

  return (
    <div className="ref-participants">
      <div className="topbar home">
        <div className="topbar__wrapper">
          <Navbar color="" expand="md" fixed="" light>
            <div className="navbar-top_row">
              <div className="navbar-brand-logowrap">
                <NavbarBrand href="/">
                  <img src={Brand}  alt="Brand"/>
                </NavbarBrand>
              </div>
            </div>
          </Navbar>
        </div>
      </div>
      <div className="ref-participants-body">
        <Container>
          <div className="rlp-referral-block-body">
            <div className="rlp-referral-block-left">
              <div className="rlp-options">
                <div>
                  <div className="rlp-option rlp-option-1 d-flex align-center">
                    <div className="rlp-option-title">Submit a: </div>
                    <Select
                      options={formOptions}
                      clearable={false}
                      className="react-select w-50"
                      classNamePrefix="react-select"
                      placeholder="Select One"
                      // touchUi={false}
                      // {...input}
                      // ref={inputRef}
                      value={selected}
                      onChange={(selectedOption) => onSelectChange(selectedOption)}
                    />
                    {/* <div className="custom-referral-select">
                      <input type="text" id="select_option_value" value="0" />
                        <div className="select">
                          Select One
                        </div>
                        <div className="select-option bg-white">
                          <div className="text-primary option-item bg-white" data-value="1">Referral</div>
                          <div className="text-primary option-item bg-white" data-value="2">Request Information</div>
                          <div className="text-primary option-item bg-white" data-value="3">Feedback / Review</div>
                        </div>
                    </div> */}
                  </div>
                  <div className="rlp-option rlp-option-2">
                    <div className="rlp-option-title">Get Rewarded</div>
                    <div className="rlp-option-body">Get reward points to be redeemed at the nation's leading retailers OR special discount offerings from the business owner</div>
                  </div>
                  <div className="rlp-notification">
                    <span className="rlp-notification-icon"></span>
                    <div className="rlp-notification-body">You will receive an email with a link to redeem your points and other offers!</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rlp-referral-block-right">
              <div className="rlp-referral-form">
                <div className="flex align-center justify-center h-full">
                  <div>
                    {/* <div className="simply-spinner"></div>
                    <div className="formMessageWrap">
                      <div className="display-success">
                        <img src="/assets/img/correct.png?v=1561436554" alt="correct" />
                        Thank you, we received your referral!
                      </div>
                    </div> */}
                    {selected && <div className="ref-participants-form">
                      <h2 className="title mb-3 text-center">{selected.label}</h2>
                      <Form onSubmit={onSubmit} initialValues={{}} validate={validate}
                      >
                        {({ handleSubmit, form, submitting, pristine, values }) => (
                          <form
                            className="form d-flex flex-column justify-content-evenly"
                            onSubmit={handleSubmit}
                          >
                            <Row>
                              <Col md="6">
                                <Label className="mb-1">Your Information</Label>
                                <Row>
                                  <Col md="12">
                                    <Field name="sender_first_name">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input
                                            placeholder="First Name *"
                                            type="text"
                                            {...input}
                                          />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <Field name="sender_last_name">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input placeholder="Last Name *" type="text" {...input} />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <Field name="sender_email">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input
                                            placeholder="Email Address *"
                                            type="text"
                                            {...input}
                                          />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                              </Col>
                              {selected.value == 'category_referral' && <Col md="6">
                                <Label className="mb-1">Referral Information</Label>
                                <Row>
                                  <Col md="12">
                                    <Field name="recipient_first_name">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input
                                            placeholder="First Name *"
                                            type="text"
                                            {...input}
                                          />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <Field name="recipient_last_name">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input placeholder="Last Name *" type="text" {...input} />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <Field name="recipient_email">
                                      {({ input, meta }) => (
                                        <FormGroup>
                                          <Input
                                            placeholder="Email Address *"
                                            type="text"
                                            {...input}
                                          />
                                          {meta.touched && meta.error && (
                                            <span className="form-error">{meta.error}</span>
                                          )}
                                        </FormGroup>
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                              </Col>}
                            </Row>

                            <Row>
                              <Col md="12">
                                <Label className="mb-1">Message *</Label>
                                <Field name="message">
                                  {({ input, meta }) => (
                                    <FormGroup>
                                      <Input
                                        placeholder=""
                                        type="textarea"
                                        {...input}
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
                            <Label>
                              *By signing up you agree to the Program terms of Service and our Privacy Policy
                            </Label>

                            <div className="d-flex justify-content-center mt-5">
                              <TemplateButton
                                type="submit"
                                text="Submit"
                                disabled={loading}
                              />
                            </div>
                          </form>
                        )}
                      </Form>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <MerchantSlider program={program}  />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.domain?.program,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(RefParticipants);
