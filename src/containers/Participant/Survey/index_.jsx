import React, { useContext, useState } from "react";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import {
  Start,
  FullName,
  Email,
  Feeling,
  Recommend,
  Satisfication,
  Suggestion,
  Thankyou,
} from "./components/SurveyForm";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";
import { themeContext } from "@/context/themeContext";

const Survey = ({ template }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    feeling: 1,
    recommend: true,
    satisfication: 2,
  });
  

  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const handleChange = (value, input) => {
    values[input] = value;
    setValues(values);
  };
  const onSubmit = () => {
    console.log(values);
  };

  const SurveyBody = ({
    nextStep,
    prevStep,
    onSubmit,
    values,
    handleChange,
  }) => {
    return (
      <div className="dashboard">
        {step == 0 && <Start nextStep={nextStep} values={values} />}
        {step == 1 && (
          <FullName
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 2 && (
          <Email
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 3 && (
          <Feeling
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 4 && (
          <Recommend
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 5 && (
          <Satisfication
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 6 && (
          <Suggestion
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        )}
        {step == 7 && (
          <Thankyou prevStep={prevStep} nextStep={nextStep} submit={onSubmit} />
        )}
      </div>
    );
  };
  const SurveyNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <SurveyBody
                nextStep={nextStep}
                prevStep={prevStep}
                onSubmit={onSubmit}
                values={values}
                handleChange={handleChange}
              ></SurveyBody>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  const SurveyOrigin = () => {
    return (
      <>
        <Row className="mt-4">
          <Col md={4}>
            <SidebarOrigin />
          </Col>
          <Col md={1}></Col>
          <Col md={6} className="">
            <div className="mb-5"></div>
            <SurveyBody
              nextStep={nextStep}
              prevStep={prevStep}
              onSubmit={onSubmit}
              values={values}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </>
    );
  };

  return (
    (template?.name === "New" && <SurveyNew />) ||
    (template?.name === "Original" && <SurveyOrigin />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Survey);
