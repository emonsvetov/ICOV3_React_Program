import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import MaximizeIcon from "mdi-react/ArrowTopRightBottomLeftIcon";
import RightIcon from "mdi-react/ArrowRightIcon";
import LeftIcon from "mdi-react/ArrowLeftIcon";
import ThemeIcon from "mdi-react/ThemeLightDarkIcon";
import { motion, useAnimationControls } from "framer-motion";
import Editor from "@/shared/components/form/Editor";

export const FourthStep = ({ swiper, setData, data }) => {
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
            backgroundColor: isDark ? "#FFF" : "#000",
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
              <ThemeIcon />
              {/* {isDark ? <FaMoon /> : <FaSun />} */}
            </Button>
          )}
          <h3
            style={{ textAlign: "left", color: isDark ? "#000" : "#fff" }}
            className="text-lg-left mb-4"
          >
            Let us know why you are feeling that way!
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
              <span>PREVIOUS</span>
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
              <span>SUBMIT</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ThirdStep = ({ swiper, setData, data }) => {
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
          <h3 style={{ textAlign: "left" }} className="text-lg-left mb-4">
            Email
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
            <span>PREVIOUS</span>
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
            <span>NEXT</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const SecondStep = ({ swiper, setData, data }) => {
  const controls = useAnimationControls();

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
            Name
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
                  FirstName
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
                  Last Name
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
            <span>PREVIOUS</span>
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
            <span>NEXT</span>
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
            How are you feeling today?*
          </h4>
          <Row className="feeling-wrapper mt-4 gap-4">
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative cursor-pointer ">
              <Input
                type="radio"
                className="position-absolute "
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "happy" : "",
                  })
                }
                name="feeling"
              />
              <img
                src="/img/feeling/happy.png"
                alt="happy"
                className="mx-auto w-50"
              />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                Happy
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative cursor-pointer ">
              <Input
                type="radio"
                className="position-absolute "
                name="feeling"
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "ok" : "",
                  })
                }
                style={{ top: 12, left: 12 }}
              />
              <img
                src="/img/feeling/ok.png"
                alt="ok"
                className="mx-auto w-50"
              />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                Ok{" "}
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative cursor-pointer ">
              <Input
                type="radio"
                className="position-absolute "
                name="feeling"
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "sad" : "",
                  })
                }
              />
              <img
                src="/img/feeling/sad.png"
                alt="sad"
                className="mx-auto w-50"
              />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                Sad
              </span>
            </Col>
            <Col className="d-flex flex-column align-items-center gap-2 justify-content-center border-secondary border rounded p-4 position-relative cursor-pointer ">
              <Input
                type="radio"
                className="position-absolute "
                style={{ top: 12, left: 12 }}
                onChange={(e) =>
                  setData({
                    ...data,
                    feeling: e.target.checked ? "angry" : "",
                  })
                }
                name="feeling"
              />
              <img
                src="/img/feeling/angry.png"
                alt="angry"
                className="mx-auto w-50"
              />
              <span className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                Angry
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
            <span>NEXT</span>
            <RightIcon />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
