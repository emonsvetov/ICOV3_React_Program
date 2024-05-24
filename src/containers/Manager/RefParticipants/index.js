import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import TemplateButton from "@/shared/components/TemplateButton";
import { Img } from '@/theme'
import { useParams } from "react-router-dom";
import { flash422, flashSuccess } from "@/shared/components/flash";
import { Form, Field } from "react-final-form";
import axios from "axios";

const RefParticipants = ({ auth, program, organization }) => {
  // console.log(auth)
  let params = useParams();

  const ReferralWidgetImg = `img/pages/Referrals_Image.png`;
  const formOptions = [
    { value: '1', label: 'Referral' },
    { value: '2', label: 'Request Information' },
    { value: '3', label: 'Feedback / Review' },
  ];

  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (program && organization) {

    }
  }, [program, organization, params]);

  const onSelectChange = (selectedOption) => {
    setSelected(selectedOption)
  };

  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post(
        `/organization/${organization.id}/program/${values.program.value}/invite`,
        values
      )
      .then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // window.location.reload();
          flashSuccess(
            dispatch,
            "The participant has been invited to your program!"
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        //console.log(error.response.data);
        flash422(dispatch, error.response.data);
        setLoading(false);
      });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.first_name) {
      errors.first_name = "First name is required";
    }
    if (!values.last_name) {
      errors.last_name = "Last name is required";
    }
    //referral
    if (!values.ref_email) {
      errors.ref_email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
      errors.ref_email = "Invalid email address";
    }
    if (!values.ref_first_name) {
      errors.ref_first_name = "First name is required";
    }
    if (!values.ref_last_name) {
      errors.ref_last_name = "Last name is required";
    }
    return errors;
  };

  if (!auth || !program || !organization) return "loading";

  return (
    <div className="ref-participants">
      <Container>
        {/* <Img src={ReferralWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} /> */}
        <div class="rlp-referral-block-body">
          <div class="rlp-referral-block-left">
            <div class="rlp-options">
              <div>
                <div class="rlp-option rlp-option-1 d-flex align-center">
                  <div class="rlp-option-title">Submit a: </div>
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
                  {/* <div class="custom-referral-select">
                    <input type="text" id="select_option_value" value="0" />
                      <div class="select">
                        Select One
                      </div>
                      <div class="select-option bg-white">
                        <div class="text-primary option-item bg-white" data-value="1">Referral</div>
                        <div class="text-primary option-item bg-white" data-value="2">Request Information</div>
                        <div class="text-primary option-item bg-white" data-value="3">Feedback / Review</div>
                      </div>
                  </div> */}
                </div>
                <div class="rlp-option rlp-option-2">
                  <div class="rlp-option-title">Get Rewarded</div>
                  <div class="rlp-option-body">Get reward points to be redeemed at the nation's leading retailers OR special discount offerings from the business owner</div>
                </div>
                <div class="rlp-notification">
                  <span class="rlp-notification-icon"></span>
                  <div class="rlp-notification-body">You will receive an email with a link to redeem your points and other offers!</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rlp-referral-block-right">
            <div class="rlp-referral-form">
              <div class="flex align-center justify-center h-full">
                <div>
                  {/* <div class="simply-spinner"></div>
                  <div class="formMessageWrap">
                    <div class="display-success">
                      <img src="/assets/img/correct.png?v=1561436554" alt="correct" />
                      Thank you, we received your referral!
                    </div>
                  </div> */}
                  {!selected && <div class="logo">
                    <img src="https://fasteezy.com/assets/theme/fasteezy/img/FE_bubble_glow.png" alt="glow logo" />
                  </div>}
                  {selected && <div className="ref-participants-form">
                    <h2 className="title mb-3">{selected.label}</h2>
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
                                  <Field name="first_name">
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
                                  <Field name="last_name">
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
                                  <Field name="email">
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
                            {selected.value == 1 && <Col md="6">
                              <Label className="mb-1">Referral Information</Label>
                              <Row>
                                <Col md="12">
                                  <Field name="ref_first_name">
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
                                  <Field name="ref_last_name">
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
                                  <Field name="ref_email">
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
                              <Label className="mb-1">Comments</Label>
                              <Field name="comments">
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
                              className="w-25"
                              disabled={loading}
                            />
                          </div>
                        </form>
                      )}
                    </Form>
                  </div>
                  }
                  {/* <h2 class="text-white w-full" id="section_title"></h2>
                  <form action="https://fasteezy.com/ref-participants/program/785093" method="post" accept-charset="utf-8" autocomplete="off" id="referralForm">
                    <div style="display:none">
                      <input type="hidden" name="form_token" value="e2ea924082d2a0d80fb75cde25d03349" />
                    </div>
                    <div class="form-1">
                      <div class="row">
                        <div class="simply-column">
                          <h2 class="referral-participant-title">Your Information</h2>
                          <input type="text" name="form_selector" class="text" id="form_selector" value="0" style="display: none;" />
                          <label class="required">First Name</label>
                          <input type="text" name="first_name" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                          <label class="required">Last Name</label>
                          <input type="text" name="last_name" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                          <label class="required">Email</label>
                          <input type="text" name="email" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                        </div>
                        <div class="simply-column" id="referral_information">
                          <h2 class="referral-participant-title">Referral Information</h2>
                          <label class="required">First Name</label>
                          <input type="text" name="first_name_referral" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                          <label class="required">Last Name</label>
                          <input type="text" name="last_name_referral" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                          <label class="required">Email</label>
                          <input type="text" name="email_referral" class="text" placeholder="" value="" />
                          <span class="error-red-bold"></span>
                        </div>
                      </div>
                      <label>Comments</label>
                      <textarea rows="6" cols="50" name="message"></textarea>
                      <div class="simply-signing">
                        <sup>*</sup>By signing up you agree to the Program terms of Service and our Privacy Policy
                      </div>
                      <div class="simply-submit clearfix center">
                        <input id="submit" type="submit" class="btn btn-success" style="cursor: pointer;" value="Submit" />
                      </div>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(RefParticipants);
