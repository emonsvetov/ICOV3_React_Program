import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import MaximizeIcon from "mdi-react/ArrowTopRightBottomLeftIcon";
import RightIcon from "mdi-react/ArrowRightIcon";
import LeftIcon from "mdi-react/ArrowLeftIcon";
import ThemeIcon from "mdi-react/ThemeLightDarkIcon";
import { motion, useAnimationControls } from "framer-motion";
import Editor from "@/shared/components/form/Editor";
import { useTranslation } from "react-i18next";

const IMG_ANGRY = `${process.env.PUBLIC_URL}/theme/original/img/feeling/angry.png`;
const IMG_HAPPY = `${process.env.PUBLIC_URL}/theme/original/img/feeling/happy.png`;
const IMG_OK = `${process.env.PUBLIC_URL}/theme/original/img/feeling/ok.png`;
const IMG_SAD = `${process.env.PUBLIC_URL}/theme/original/img/feeling/sad.png`;

const LightIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="20px"
        width="20px"
        viewBox="0 0 16 16"
        class="sc-aef7b723-0 bpKjzE"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.6465 0.267788C8.47504 0.0963262 8.24248 0 8 0C7.75752 0 7.52496 0.0963262 7.3535 0.267788C7.18204 0.43925 7.08571 0.671802 7.08571 0.914286V2.05714C7.08571 2.29963 7.18204 2.53218 7.3535 2.70364C7.52496 2.8751 7.75752 2.97143 8 2.97143C8.24248 2.97143 8.47504 2.8751 8.6465 2.70364C8.81796 2.53218 8.91429 2.29963 8.91429 2.05714V0.914286C8.91429 0.671802 8.81796 0.43925 8.6465 0.267788ZM8.6465 13.2964C8.47504 13.1249 8.24248 13.0286 8 13.0286C7.75752 13.0286 7.52496 13.1249 7.3535 13.2964C7.18204 13.4678 7.08571 13.7004 7.08571 13.9429V15.0857C7.08571 15.3282 7.18204 15.5608 7.3535 15.7322C7.52496 15.9037 7.75752 16 8 16C8.24248 16 8.47504 15.9037 8.6465 15.7322C8.81796 15.5608 8.91429 15.3282 8.91429 15.0857V13.9429C8.91429 13.7004 8.81796 13.4678 8.6465 13.2964ZM15.7322 8.6465C15.9037 8.47504 16 8.24248 16 8C16 7.75752 15.9037 7.52496 15.7322 7.3535C15.5608 7.18204 15.3282 7.08571 15.0857 7.08571H13.9429C13.7004 7.08571 13.4678 7.18204 13.2964 7.3535C13.1249 7.52496 13.0286 7.75752 13.0286 8C13.0286 8.24248 13.1249 8.47504 13.2964 8.6465C13.4678 8.81796 13.7004 8.91429 13.9429 8.91429H15.0857C15.3282 8.91429 15.5608 8.81796 15.7322 8.6465ZM2.70364 8.6465C2.8751 8.47504 2.97143 8.24248 2.97143 8C2.97143 7.75752 2.8751 7.52496 2.70364 7.3535C2.53218 7.18204 2.29963 7.08571 2.05714 7.08571H0.914286C0.671802 7.08571 0.43925 7.18204 0.267788 7.3535C0.0963262 7.52496 0 7.75752 0 8C0 8.24248 0.0963262 8.47504 0.267788 8.6465C0.43925 8.81796 0.671802 8.91429 0.914286 8.91429H2.05714C2.29963 8.91429 2.53218 8.81796 2.70364 8.6465ZM13.8551 2.63971C13.8092 2.52878 13.7418 2.42799 13.6569 2.34309C13.572 2.25818 13.4712 2.19083 13.3603 2.14488C13.2494 2.09893 13.1305 2.07528 13.0104 2.07528C12.8903 2.07528 12.7714 2.09893 12.6605 2.14488C12.5496 2.19083 12.4488 2.25818 12.3639 2.34309L11.5557 3.15131C11.3842 3.32278 11.2879 3.55534 11.2879 3.79783C11.2879 4.04032 11.3842 4.27288 11.5557 4.44434C11.7271 4.61581 11.9597 4.71214 12.2022 4.71214C12.4447 4.71214 12.6772 4.61581 12.8487 4.44434L13.6569 3.63611C13.7418 3.55121 13.8092 3.45042 13.8551 3.33949C13.9011 3.22856 13.9247 3.10967 13.9247 2.9896C13.9247 2.86953 13.9011 2.75064 13.8551 2.63971ZM4.64255 11.8523C4.5966 11.7413 4.52925 11.6406 4.44434 11.5557C4.35944 11.4708 4.25865 11.4034 4.14772 11.3575C4.03679 11.3115 3.9179 11.2879 3.79783 11.2879C3.67776 11.2879 3.55886 11.3115 3.44794 11.3575C3.33701 11.4034 3.23621 11.4708 3.15131 11.5557L2.34309 12.3639C2.17162 12.5354 2.07529 12.7679 2.07529 13.0104C2.07529 13.2529 2.17162 13.4854 2.34309 13.6569C2.51455 13.8284 2.74711 13.9247 2.9896 13.9247C3.23209 13.9247 3.46465 13.8284 3.63611 13.6569L4.44434 12.8487C4.52925 12.7638 4.5966 12.663 4.64255 12.5521C4.6885 12.4411 4.71215 12.3222 4.71215 12.2022C4.71215 12.0821 4.6885 11.9632 4.64255 11.8523ZM13.3603 13.8551C13.4712 13.8092 13.572 13.7418 13.6569 13.6569C13.7418 13.572 13.8092 13.4712 13.8551 13.3603C13.9011 13.2494 13.9247 13.1305 13.9247 13.0104C13.9247 12.8903 13.9011 12.7714 13.8551 12.6605C13.8092 12.5496 13.7418 12.4488 13.6569 12.3639L12.8487 11.5557C12.6772 11.3842 12.4447 11.2879 12.2022 11.2879C11.9597 11.2879 11.7271 11.3842 11.5557 11.5557C11.3842 11.7271 11.2879 11.9597 11.2879 12.2022C11.2879 12.4447 11.3842 12.6772 11.5557 12.8487L12.3639 13.6569C12.4488 13.7418 12.5496 13.8092 12.6605 13.8551C12.7714 13.9011 12.8903 13.9247 13.0104 13.9247C13.1305 13.9247 13.2494 13.9011 13.3603 13.8551ZM4.14772 4.64255C4.25865 4.5966 4.35944 4.52925 4.44434 4.44434C4.52925 4.35944 4.5966 4.25865 4.64255 4.14772C4.6885 4.03679 4.71215 3.9179 4.71215 3.79783C4.71215 3.67776 4.6885 3.55886 4.64255 3.44794C4.5966 3.33701 4.52925 3.23621 4.44434 3.15131L3.63611 2.34309C3.55121 2.25818 3.45042 2.19084 3.33949 2.14489C3.22856 2.09894 3.10967 2.07529 2.9896 2.07529C2.86953 2.07529 2.75064 2.09894 2.63971 2.14489C2.52878 2.19084 2.42799 2.25818 2.34309 2.34309C2.25818 2.42799 2.19084 2.52878 2.14489 2.63971C2.09894 2.75064 2.07529 2.86953 2.07529 2.9896C2.07529 3.10967 2.09894 3.22856 2.14489 3.33949C2.19084 3.45042 2.25818 3.55121 2.34309 3.63611L3.15131 4.44434C3.23621 4.52925 3.33701 4.5966 3.44794 4.64255C3.55886 4.6885 3.67776 4.71215 3.79783 4.71215C3.9179 4.71215 4.03679 4.6885 4.14772 4.64255ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
          fill="white"
        ></path>
      </svg>
    </>
  );
};

const DarkIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="20"
        height="20"
        viewBox="0 0 16 16"
      >
        <g fill="#444" transform="scale(0.015 0.015)">
          <path d="M788.256 709.888c-262.016 0-474.24-212.384-474.24-474.24 0-86.24 24.736-166.016 64.992-235.616-218.368 62.976-379.008 261.984-379.008 500.608 0 288.992 234.24 523.36 523.264 523.36 238.624 0 437.76-160.736 500.736-379.008-69.76 40.128-149.504 64.896-235.744 64.896z" />
        </g>
      </svg>
    </>
  );
};

export const FourthStep = ({ swiper, setData, data }) => {
  const { t } = useTranslation();
  const [isFull, setIsFull] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [value, setValue] = useState("");

  const handleSize = () => {
    setIsFull(!isFull);
  };

  useEffect(() => {
    if (!isFull) {
      setIsDark(true);
    }
  }, [isFull]);

  useEffect(() => {
    setData({ ...data, msg: value });
  }, [value]);

  const handleSubmit = () => {
    console.log("data : last step", data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <div className="d-flex flex-column">
        <div
          className=" shadow position-relative"
          style={{
            width: isFull ? "75vw" : 940,
            height: isFull ? "80vh" : "auto",
            backgroundColor: isDark ? "#FFF" : "#222531",
            padding: 40,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Button
            color="secondary"
            style={{
              borderRadius: "100%",
              top: 30,
              right: 30,
              width: 40,
              height: 40,
              padding: 0,
            }}
            onClick={handleSize}
            className="position-absolute  btn-block"
          >
            <MaximizeIcon size={25} />
          </Button>
          {isFull && (
            <Button
              color="secondary"
              style={{
                borderRadius: "100%",
                top: 30,
                right: 80,
                width: 40,
                height: 40,
                padding: 0,
              }}
              onClick={() => setIsDark(!isDark)}
              className="position-absolute  btn-block"
            >
              {/* <ThemeIcon /> */}
              {isDark ? <LightIcon /> : <DarkIcon />}
            </Button>
          )}
          <h3
            style={{ textAlign: "left", color: isDark ? "#000" : "#fff" }}
            className="text-lg-left mb-4"
          >
            {t("let_us_know")}
          </h3>
          <Row>
            <Col>
              <Editor setValue={setValue} placeholder="" />
            </Col>
          </Row>
        </div>
        {!isFull && (
          <div
            className="bg-blue d-flex"
            style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
          >
            <Button
              onClick={() => swiper.slideTo(2)}
              className="btn-blue"
              style={{
                width: "100%",
                textAlign: "right",
                borderRadius: "0 0 10px 10px",
              }}
              color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
            >
              <LeftIcon />
              <span className="text-uppercase">{t("previous")}</span>
            </Button>
            <Button
              className="btn-blue"
              style={{
                width: "100%",
                textAlign: "right",
                borderRadius: "0 0 10px 10px",
              }}
              onClick={() => handleSubmit()}
              color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
            >
              <span className="text-uppercase">{t("submit")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ThirdStep = ({ swiper, setData, data }) => {
  const controls = useAnimationControls();
  const { t } = useTranslation();

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
          <h3 style={{ textAlign: "left" }} className="text-lg-left mb-4">
            {t("email")}
          </h3>
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
          className="bg-blue d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            className="btn-blue"
            onClick={handlePrev}
            style={{
              width: "100%",
              textAlign: "right",
              borderRadius: "0 0 10px 10px",
            }}
            color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            className="btn-blue"
            onClick={handleNext}
            style={{
              width: "100%",
              textAlign: "right",
              borderRadius: "0 0 10px 10px",
            }}
            color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
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
  const controls = useAnimationControls();
  const { t } = useTranslation();
  const handleNext = () => {
    if (data.firstName == "" && data.lastName == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(2);
    }
  };

  const handlePrev = () => {
    swiper.slideTo(0);
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
          <h3 style={{ textAlign: "left" }} className="text-lg-left mb-4">
            {t("name")}
          </h3>
          <Row>
            <Col md={6}>
              <div
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                <Input
                  className="second__input"
                  style={{ height: 50 }}
                  id="fname"
                  name="fname"
                  value={data.firstName}
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
                <Label
                  className={`${
                    data.firstName === "" ? null : "label"
                  } second__label`}
                  for="fname"
                >
                  {t("first_name")}
                </Label>
              </div>
            </Col>
            <Col md={6}>
              <FormGroup
                className="position-relative w-full "
                style={{ paddingBottom: 10 }}
              >
                <Input
                  className="second__input"
                  style={{
                    height: 50,
                  }}
                  id="lname"
                  name="lname"
                  value={data.lastName === "" ? null : data.lastName}
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
                <Label
                  className={`${
                    data.lastName === "" ? null : "label"
                  } second__label`}
                  for="lname"
                >
                  {t("last_name")}
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className="bg-blue d-flex"
          style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}
        >
          <Button
            onClick={handlePrev}
            className="btn-blue"
            style={{
              width: "100%",
              textAlign: "right",
              borderRadius: "0 0 10px 10px",
            }}
            color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-start align-items-center gap-2"
          >
            <LeftIcon />
            <span className="text-uppercase">{t("previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            className="btn-blue"
            style={{
              width: "100%",
              textAlign: "right",
              borderRadius: "0 0 10px 10px",
            }}
            color="primary rounded-0  w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
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
  // const [isFull, setIsFull] = useState(false);
  // const handleSize = () => {
  //   setIsFull(!isFull);
  // };
  const controls = useAnimationControls();
  const { t } = useTranslation();
  const handleNext = () => {
    if (data.feeling == "") {
      controls.start({ x: [-10, 8, 0, 6, -4, 0, 2, -1, 0] });
    } else {
      swiper.slideTo(1);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <motion.div
        animate={controls}
        transition={{ ease: "easeInOut", type: "spring" }}
        className="d-flex flex-column"
      >
        <motion.div
          className="bg-white shadow position-relative"
          style={{
            width: 940,
            height: "auto",

            padding: 40,
            borderRadius: "10px 10px 0 0",
          }}
        >
          {/* <Button
            color="secondary"
            style={{ borderRadius: "100%", top: 30, right: 30 }}
            onClick={handleSize}
            className="position-absolute  btn-block"
          >
            <MaximizeIcon />
          </Button> */}
          <h4 style={{ textAlign: "left" }} className="">
            {t("how_feeling_today")}*
          </h4>
          <Row className="feeling-wrapper mt-4 gap-4">
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative ">
              <Input
                type="radio"
                className="position-absolute cursor-pointer "
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "happy" : "",
                  })
                }
                name="feeling"
              />
              <img src={IMG_HAPPY} alt="happy" className="mx-auto w-50" />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                {t("happy")}
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative ">
              <Input
                type="radio"
                className="position-absolute cursor-pointer "
                name="feeling"
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "ok" : "",
                  })
                }
                style={{ top: 12, left: 12 }}
              />
              <img src={IMG_OK} alt="ok" className="mx-auto w-50" />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                {t("ok")}{" "}
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative ">
              <Input
                type="radio"
                className="position-absolute cursor-pointer "
                name="feeling"
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "sad" : "",
                  })
                }
              />
              <img src={IMG_SAD} alt="sad" className="mx-auto w-50" />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                {t("sad")}
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative ">
              <Input
                type="radio"
                className="position-absolute cursor-pointer "
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "angry" : "",
                  })
                }
                name="feeling"
              />
              <img src={IMG_ANGRY} alt="angry" className="mx-auto w-50" />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                {t("angry")}
              </span>
            </Col>
          </Row>
        </motion.div>

        <div
          className="bg-blue"
          style={{
            borderRadius: "0 0 10px 10px ",
          }}
        >
          <Button
            onClick={handleNext}
            className="btn-blue"
            style={{
              width: "100%",
              textAlign: "right",
              borderRadius: "0 0 10px 10px ",
            }}
            color="btn-block w-full text-left py-3 px-3 d-flex justify-content-end align-items-center gap-2"
          >
            <span>{t("next")}</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
