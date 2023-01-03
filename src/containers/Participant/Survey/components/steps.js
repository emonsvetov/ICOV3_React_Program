import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import MaximizeIcon from "mdi-react/ArrowTopRightBottomLeftIcon";
import RightIcon from "mdi-react/ArrowRightIcon";
import LeftIcon from "mdi-react/ArrowLeftIcon";
import { motion, useAnimationControls } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SeventhStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    console.log("data : last step", data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <div className="d-flex flex-column">
        <div
          className=" shadow position-relative"
          style={{
            width: 940,
            height: "auto",
            backgroundColor: "#fff",
            padding: 40,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <legend>{t("thank_you_survey")}</legend>
        </div>

        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={() => swiper.slideTo(6)}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            style={{ width: "100%", textAlign: "right" }}
            onClick={() => handleSubmit()}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("submit")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SixthStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  const handleNext = () => {
    if (data.suggestion == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(7);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(5);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("suggestion_survey")}*
          </h4>
          <Row>
            <Col>
              <div
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                <Input
                  className="second__input"
                  // style={{ height: 50 }}
                  id="suggestion"
                  name="suggestion"
                  type="textarea"
                  rows="6"
                  onChange={(e) =>
                    setData({ ...data, suggestion: e.target.value })
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const FifthStep = ({ swiper, setData, data }) => {
  const controls = useAnimationControls();
  const { t } = useTranslation();
  const handleNext = () => {
    if (data.satisfication == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(6);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(4);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("satisfy_survey")}*
          </h4>
          <Row>
            <Col>
              <FormGroup
                onChange={(e) =>
                  setData({ ...data, satisfication: e.target.value })
                }
              >
                {/* <legend>How satisfied are you with our company overall?</legend> */}
                <FormGroup check>
                  <Label check>
                    <Input
                      name="satisfication"
                      value="2"
                      defaultChecked={data?.satisfication == 2}
                      type="radio"
                    />
                    {t("very_satisfied")}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="satisfication"
                      value="1"
                      defaultChecked={data?.satisfication == 1}
                      type="radio"
                    />
                    {t("satisfied")}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="satisfication"
                      value="0"
                      defaultChecked={data?.satisfication == 0}
                      type="radio"
                    />
                    {t("undecided")}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="satisfication"
                      value="-1"
                      defaultChecked={data?.satisfication == -1}
                      type="radio"
                    />
                    {t("unsatisfied")}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="satisfication"
                      value="-2"
                      defaultChecked={data?.satisfication == -2}
                      type="radio"
                    />
                    {t("very_unsatisfied")}
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const FourthStep = ({ swiper, setData, data }) => {
  const controls = useAnimationControls();
  const { t } = useTranslation();
  const handleNext = () => {
    if (data.recommend == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(5);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(3);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("recommend_survey")}*
          </h4>
          <Row>
            <Col>
              <FormGroup
                tag="fieldset"
                onChange={(e) =>
                  setData({ ...data, recommend: e.target.value })
                }
              >
                {/* <legend>Would you recommend our company to a friend?</legend> */}
                <FormGroup check>
                  <Label check>
                    <Input
                      name="recommend"
                      value="1"
                      defaultChecked={data?.recommend == 1}
                      type="radio"
                    />
                    {t("yes")}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="recommend"
                      value="0"
                      defaultChecked={data?.recommend == 0}
                      type="radio"
                    />
                    {t("no")}
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const ThirdStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();
  const options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];
  const StatusOptions = () =>
    options.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      );
    });

  const handleNext = () => {
    console.log("data.feeling", data.feeling);
    if (data.feeling == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(4);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(2);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("engaging_survey")}*
          </h4>
          <Row>
            <Col>
              <FormGroup>
                {/* <legend>Do you feel your workspace engaging?</legend> */}
                <Input
                  type="select"
                  defaultValue={data?.feeling}
                  name="feeling"
                  onChange={(e) =>
                    setData({ ...data, feeling: e.target.value })
                  }
                >
                  <StatusOptions />
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const SecondStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  const handleNext = () => {
    if (
      data.email == "" ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(data.email)
    ) {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(3);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("email_address")}*
          </h4>
          <Row>
            <Col>
              <div
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                <Input
                  className="second__input"
                  style={{ height: 50 }}
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <Label
                  className={`${
                    data.email === "" ? null : "label"
                  } second__label`}
                  for="email"
                >
                  example@example.com
                </Label>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="bg-dark d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const FirstStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  const handleNext = () => {
    if (data.name == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(2);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("full_name")}:*
          </h4>
          <Row>
            <Col>
              <div
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                <Input
                  className="second__input"
                  style={{ height: 50 }}
                  id="name"
                  name="name"
                  value={data.name}
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Label
                  className={`${
                    data.firstName === "" ? null : "label"
                  } second__label`}
                  for="name"
                >
                  {t("full_name")}
                </Label>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-dark " style={{ borderRadius: "0 0 10px 10px" }}>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "right" }}
            color="dark btn-block w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const VeryFirstStep = ({ swiper }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  const handleNext = () => {
    swiper.slideTo(1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div animate={controls} className="d-flex flex-column">
        <div
          className="bg-white shadow "
          style={{
            maxHeight: 300,
            width: 940,
            padding: 30,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <h3 style={{ textAlign: "center" }} className="text-lg-left mb-4">
            {t("customer_feedback_survey")}
          </h3>
          <Row>
            <Col>
              <div
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                {t("let_us_know_experience")}
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-dark " style={{ borderRadius: "0 0 10px 10px" }}>
          <Button
            onClick={handleNext}
            style={{ width: "100%", textAlign: "center" }}
            color="dark btn-block w-full text-left py-3 px-3 d-flex justify-content-center align-items-center gap-2"
          >
            <span className="text-uppercase">{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
