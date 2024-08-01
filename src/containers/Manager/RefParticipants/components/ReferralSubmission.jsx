import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import TemplateButton from "@/shared/components/TemplateButton";
import { flash422, flashSuccess } from "@/shared/components/flash";
import { Form, Field } from "react-final-form";
import axios from "axios";
// import { getUser } from "@/services/program/getUser";

const ReferralSubmission = ({ template, program, programId, auth }) => {
  console.log(program)
  let [user, setUser] = useState(null);

  useEffect(() => {
    if (auth && program && programId) {
      // console.log(auth)
      if(program.id == programId){
        if(auth.programRoles[programId] && auth.programRoles[programId].roles[4]){
          setUser(auth)
        }
      }
    }
  }, [program, programId, auth]);

  const formOptions = [
    { value: 'category_referral', label: 'Referral' },
    { value: 'category_lead', label: 'Request Information' },
    { value: 'category_feedback', label: 'Feedback / Review' },
  ];

  const [selected, setSelected] = useState(formOptions[0])
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSelectChange = (selectedOption) => {
    setSelected(selectedOption)
  };

  const onSubmit = (values) => {
    setLoading(true);
    let url = `/organization/${program.organization_id}/program/${programId}`
    delete values.category_referral;
    delete values.category_lead;
    delete values.category_feedback;
    values[selected.value] = 1;
    if(user){
      values.sender_id = user.id;
      url += '/refer'
    }
    else{
      url += '/refer-participants'
    }
    axios
      .post(url, values)
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
    if (selected.value == 'category_referral') {
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

  return (
    <div className="ref-participants-body">
      <Container>
        <h2 className="title text-center">{`Submit a ${selected.label}`}</h2>
        <div className="rlp-referral-block-body">
          <div className="rlp-referral-block-left">
            <div className="rlp-options">
              <div>
                <div className="rlp-option rlp-option-1 d-flex align-center">
                  <div className="rlp-option-title">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                      height="70px" width="70px" viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill={template?.theme_color} stroke="none">
                        <path d="M2415 5106 c-27 -7 -203 -75 -390 -151 -187 -75 -422 -170 -522 -211
                          -228 -92 -267 -112 -329 -167 -68 -61 -94 -113 -200 -397 l-91 -245 -130 -6
                          c-97 -5 -142 -12 -174 -26 -46 -21 -112 -86 -132 -131 -9 -20 -13 -375 -17
                          -1472 l-5 -1445 -160 -5 c-149 -5 -162 -7 -194 -29 -66 -47 -71 -71 -71 -393
                          0 -179 4 -297 11 -315 14 -38 57 -83 96 -99 27 -12 330 -14 1856 -14 l1823 0
                          44 23 c52 26 78 59 90 113 5 21 10 152 10 289 0 138 -5 268 -10 289 -11 48
                          -36 84 -80 114 -31 20 -44 22 -186 22 l-154 0 0 1223 0 1223 134 57 133 57
                          263 0 262 0 19 -24 c42 -53 62 -56 386 -56 290 0 299 1 337 23 25 14 48 39 63
                          66 l23 44 0 673 c0 451 -4 682 -11 701 -5 15 -22 41 -37 57 -51 54 -66 56
                          -377 56 -306 0 -329 -3 -379 -53 l-23 -23 -864 122 c-475 68 -886 123 -914
                          123 -27 0 -72 -6 -100 -13z m975 -277 c470 -66 861 -122 868 -124 10 -4 12
                          -121 10 -562 l-3 -558 -275 -5 c-269 -5 -276 -6 -335 -31 -1346 -582 -1505
                          -649 -1555 -649 -181 0 -270 224 -138 347 26 25 85 52 627 289 407 178 443
                          200 498 312 24 50 28 69 28 147 0 78 -4 98 -28 146 -46 95 -143 169 -245 189
                          -34 6 -183 -1 -523 -25 -413 -30 -485 -37 -535 -56 -51 -19 -80 -43 -210 -171
                          l-152 -148 -176 0 c-107 0 -176 4 -176 10 0 20 153 417 176 457 47 82 26 71
                          689 338 536 216 527 213 570 214 17 1 415 -53 885 -120z m1560 -689 l0 -640
                          -255 0 -255 0 0 640 0 640 255 0 255 0 0 -640z m-2117 16 c21 -8 48 -22 59
                          -33 30 -27 58 -88 58 -127 0 -72 57 -66 -648 -66 l-636 0 74 75 c44 44 89 80
                          109 86 19 7 231 26 470 44 525 39 468 37 514 21z m-194 -410 c-2 -2 -153 -70
                          -336 -150 -182 -79 -353 -156 -380 -170 -62 -31 -127 -102 -161 -174 -23 -49
                          -27 -70 -27 -152 0 -87 3 -101 32 -161 39 -79 102 -140 181 -177 50 -24 69
                          -27 157 -27 l100 0 400 174 c220 95 468 202 550 238 83 36 156 67 163 70 9 4
                          12 -270 12 -1351 l0 -1356 -1365 0 -1365 0 0 1594 0 1593 21 27 20 26 1001 0
                          c551 0 999 -2 997 -4z m-2209 -3173 c0 -130 18 -172 89 -210 l44 -23 1394 0
                          c1232 0 1398 2 1430 15 86 36 112 90 113 228 l0 97 125 0 125 0 0 -255 0 -255
                          -1790 0 -1790 0 0 255 0 255 130 0 130 0 0 -107z"/>
                        <path d="M2489 2603 c-19 -21 -222 -278 -452 -570 -230 -293 -421 -533 -425
                          -533 -4 0 -52 45 -108 101 -80 80 -107 100 -130 101 -61 2 -100 -40 -90 -96 5
                          -24 42 -68 154 -179 128 -126 153 -147 180 -147 18 0 41 9 56 23 14 12 237
                          292 496 621 425 542 470 603 470 636 0 48 -33 80 -82 80 -29 0 -42 -7 -69 -37z"/>
                      </g>
                    </svg>
                    <span>Submit a: </span>
                  </div>
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
                </div>
                <div className="rlp-option rlp-option-2">
                  <div className="rlp-option-title">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                      width="70px" height="70px" viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill={template?.theme_color} stroke="none">
                        <path d="M873 5021 c-116 -40 -198 -125 -234 -243 -36 -117 -13 -237 62 -331
                          21 -26 26 -38 17 -41 -7 -2 -44 -11 -83 -20 -137 -32 -257 -110 -311 -202 -62
                          -105 -83 -266 -48 -367 22 -64 92 -140 162 -174 l57 -28 495 0 495 0 57 28
                          c70 34 140 110 162 174 35 101 14 262 -48 367 -54 92 -175 171 -311 202 -38 9
                          -76 18 -83 20 -9 3 -4 15 17 41 103 129 104 315 3 448 -94 124 -264 177 -409
                          126z m222 -120 c45 -20 99 -71 122 -116 9 -16 18 -60 21 -97 4 -59 1 -75 -22
                          -122 -58 -119 -185 -172 -307 -131 -173 59 -227 285 -99 413 78 78 182 98 285
                          53z m232 -630 c191 -53 274 -152 277 -331 1 -81 -23 -133 -83 -175 l-43 -30
                          -488 0 -488 0 -43 30 c-62 44 -84 93 -83 185 1 60 7 89 29 138 41 92 104 141
                          230 177 100 30 152 34 385 31 199 -2 234 -5 307 -25z"/>
                        <path d="M3996 5016 c-112 -47 -183 -125 -217 -238 -36 -117 -13 -237 62 -331
                          21 -26 26 -38 17 -41 -7 -2 -44 -11 -83 -20 -142 -33 -264 -115 -318 -213 -55
                          -103 -74 -260 -41 -356 22 -64 92 -140 162 -174 l57 -28 495 0 495 0 57 28
                          c70 34 140 110 162 174 35 101 14 262 -48 367 -54 92 -175 171 -311 202 -38 9
                          -76 18 -83 20 -8 2 -1 19 22 48 52 68 71 128 70 221 -1 148 -71 263 -202 327
                          -57 28 -79 33 -152 36 -72 2 -94 -1 -144 -22z m239 -115 c204 -89 188 -393
                          -24 -466 -199 -68 -388 127 -317 327 48 134 204 198 341 139z m232 -630 c191
                          -53 274 -152 277 -331 1 -81 -23 -133 -83 -175 l-43 -30 -475 -3 c-468 -3
                          -476 -2 -520 19 -87 42 -123 124 -104 240 25 154 94 227 256 274 100 30 152
                          34 385 31 199 -2 234 -5 307 -25z"/>
                        <path d="M1870 3475 c-73 -21 -99 -33 -162 -77 -113 -79 -196 -224 -218 -380
                          -12 -79 -3 -104 37 -114 50 -13 66 9 82 114 15 97 53 175 121 242 61 62 127
                          98 198 106 64 9 92 28 92 63 0 57 -54 74 -150 46z"/>
                        <path d="M3118 3473 c-41 -45 -8 -103 59 -103 164 0 343 -214 343 -409 0 -55
                          61 -80 100 -41 17 17 19 28 14 78 -29 258 -216 465 -442 488 -48 5 -60 3 -74
                          -13z"/>
                        <path d="M1950 3211 c-49 -15 -87 -40 -129 -86 -101 -109 -120 -275 -32 -275
                          37 0 52 20 62 82 15 92 76 159 159 172 38 6 70 35 70 63 0 7 -9 22 -20 33 -21
                          21 -63 25 -110 11z"/>
                        <path d="M3061 3201 c-11 -11 -21 -27 -21 -34 0 -28 32 -57 70 -63 83 -13 144
                          -80 159 -172 4 -28 14 -58 21 -67 19 -23 66 -19 84 7 21 29 20 53 -4 131 -35
                          114 -133 201 -239 214 -41 5 -52 2 -70 -16z"/>
                        <path d="M2474 3102 c-166 -59 -242 -244 -164 -398 16 -32 30 -60 30 -60 0 -1
                          -20 -7 -45 -13 -183 -46 -285 -171 -285 -349 0 -70 3 -83 33 -132 21 -37 48
                          -64 81 -85 l49 -30 371 -3 c239 -2 384 1 407 7 57 17 112 63 143 121 24 44 29
                          64 28 121 -1 179 -103 304 -285 350 -50 12 -56 19 -33 38 39 33 58 172 35 251
                          -43 144 -222 233 -365 182z m159 -116 c70 -30 115 -111 102 -187 -8 -45 -51
                          -101 -96 -125 -36 -18 -112 -18 -148 1 -70 35 -110 123 -91 195 28 103 136
                          157 233 116z m195 -474 c115 -37 167 -98 178 -209 5 -50 3 -63 -18 -93 -46
                          -69 -54 -70 -423 -70 -369 0 -377 1 -423 70 -21 30 -23 43 -18 93 13 132 89
                          200 256 227 30 5 129 7 220 5 131 -2 178 -7 228 -23z"/>
                        <path d="M1749 1959 c-18 -18 -20 -28 -15 -73 20 -148 129 -263 263 -274 47
                          -4 52 -2 69 23 16 24 16 30 3 53 -10 19 -28 29 -67 37 -84 19 -151 100 -152
                          183 0 36 -30 72 -60 72 -11 0 -30 -10 -41 -21z"/>
                        <path d="M3290 1960 c-12 -12 -20 -34 -20 -52 -1 -83 -71 -164 -157 -184 -63
                          -13 -86 -48 -59 -89 17 -25 22 -27 69 -23 134 11 243 126 263 274 5 45 3 55
                          -15 73 -26 26 -55 27 -81 1z"/>
                        <path d="M1504 1905 c-22 -22 -24 -30 -19 -77 17 -139 69 -251 161 -345 78
                          -80 183 -133 279 -141 76 -6 95 5 95 54 0 39 -11 46 -98 63 -149 30 -265 146
                          -307 306 -8 33 -15 74 -15 92 0 35 -29 73 -55 73 -9 0 -27 -11 -41 -25z"/>
                        <path d="M3546 1917 c-12 -9 -22 -41 -32 -97 -19 -110 -51 -177 -116 -246 -62
                          -66 -126 -101 -209 -116 -68 -12 -89 -28 -89 -67 0 -37 17 -51 65 -51 192 1
                          396 176 448 385 29 115 30 149 7 178 -23 30 -47 34 -74 14z"/>
                        <path d="M907 1500 c-253 -64 -366 -359 -218 -571 l39 -56 -75 -16 c-148 -32
                          -276 -115 -336 -218 -61 -103 -76 -282 -33 -376 30 -64 87 -122 152 -154 l49
                          -24 505 0 505 0 49 24 c60 30 118 85 147 143 48 91 34 282 -28 387 -61 104
                          -186 186 -334 217 l-79 17 26 34 c14 18 37 59 52 91 22 48 27 71 27 142 0 75
                          -4 93 -32 152 -39 83 -97 142 -178 179 -70 33 -172 45 -238 29z m183 -131
                          c119 -54 177 -183 138 -311 -15 -51 -77 -121 -131 -147 -59 -29 -155 -29 -214
                          0 -54 26 -116 96 -131 147 -27 89 -5 191 56 256 67 72 192 96 282 55z m205
                          -624 c193 -43 289 -139 311 -310 13 -109 -50 -209 -149 -233 -31 -8 -182 -12
                          -470 -12 -483 0 -499 2 -560 69 -50 55 -62 107 -48 199 13 86 36 134 88 183
                          65 62 157 98 306 119 95 13 439 4 522 -15z"/>
                        <path d="M4047 1500 c-108 -28 -202 -105 -250 -208 -27 -57 -32 -79 -32 -147
                          0 -92 20 -155 71 -226 l33 -46 -75 -16 c-263 -57 -406 -232 -392 -481 7 -125
                          64 -213 174 -267 l49 -24 505 0 505 0 49 24 c60 30 118 85 147 143 48 91 34
                          282 -28 387 -61 104 -186 186 -333 217 l-79 17 40 56 c163 234 6 559 -278 576
                          -37 2 -85 0 -106 -5z m183 -131 c119 -54 177 -183 138 -311 -15 -51 -77 -121
                          -131 -147 -59 -29 -155 -29 -214 0 -54 26 -116 96 -131 147 -27 89 -5 191 56
                          256 67 72 192 96 282 55z m205 -624 c195 -44 289 -136 310 -306 4 -34 2 -72
                          -5 -100 -16 -59 -81 -122 -143 -137 -64 -16 -870 -16 -934 0 -62 15 -127 78
                          -143 137 -7 28 -9 66 -5 100 24 193 138 284 398 321 96 14 440 4 522 -15z"/>
                      </g>
                    </svg>
                    <span>Get Rewarded </span>
                  </div>
                  <div className="rlp-option-body">Get reward points to be redeemed at the nation's leading retailers OR special discount offerings from the business owner</div>
                </div>
                <div className="rlp-notification">
                  <span className="rlp-notification-icon">
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="70px" height="70px" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill={template?.theme_color} stroke="none">
                    <path d="M3039 5104 c-64 -19 -141 -90 -169 -156 -48 -113 -20 -240 72 -323
                      84 -76 79 -75 677 -75 l526 0 -1192 -1192 c-1318 -1319 -1243 -1236 -1243
                      -1368 0 -206 213 -341 400 -254 48 22 213 182 1248 1217 l1192 1192 0 -526 c0
                      -598 -1 -593 75 -677 115 -128 305 -127 420 0 79 88 76 36 73 1064 l-3 909
                      -22 41 c-34 63 -66 97 -125 129 l-53 30 -915 2 c-772 2 -922 0 -961 -13z"/>
                    <path d="M705 4539 c-267 -50 -495 -221 -618 -466 -15 -28 -39 -91 -54 -140
                      l-28 -88 -3 -1525 c-2 -1045 1 -1547 8 -1594 29 -187 103 -329 245 -471 142
                      -142 284 -216 471 -245 47 -7 549 -10 1594 -8 l1525 3 88 28 c325 101 548 353
                      606 681 7 38 11 294 11 692 0 608 -1 635 -20 686 -40 107 -149 181 -266 180
                      -110 -1 -198 -55 -252 -157 l-27 -50 -5 -645 -5 -645 -23 -47 c-13 -26 -44
                      -65 -68 -87 -87 -76 33 -71 -1604 -71 -1664 0 -1531 -7 -1623 83 -95 92 -87
                      -53 -87 1622 0 1642 -5 1522 71 1609 22 24 61 55 87 68 l47 23 640 5 640 5 52
                      24 c138 62 204 231 144 367 -30 68 -94 130 -159 154 -51 19 -77 20 -695 19
                      -353 -1 -664 -5 -692 -10z"/>
                    </g>
                    </svg>
                  </span>
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
                    <Form onSubmit={onSubmit} 
                    initialValues={{
                      sender_first_name: user?.first_name,
                      sender_last_name: user?.last_name,
                      sender_email: user?.email
                    }}
                    validate={validate}
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
                              spinner={loading}
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
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.domain?.program,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(ReferralSubmission);
