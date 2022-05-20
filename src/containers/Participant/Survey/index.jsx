import React, {useState} from 'react';
import { ParticipantTabNavs } from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import {Start, FullName, Email, Feeling, Recommend, Satisfication, Suggestion, Thankyou} from './components/SurveyForm'
import { Col, Row,Container} from 'reactstrap';
import { submit } from 'redux-form';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({feeling: 1, recommend: true, satisfication: 2});
  const prevStep = () =>{
    setStep(step => step - 1);
  }
  const nextStep = () =>{
    setStep(step => step + 1);
  }
  const handleChange = (value, input) =>{
    values[input] = value;
    setValues(values);
  }
  const onSubmit = () => {
    console.log(values);
  }
  return (
    <>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              {
                step == 0 && <Start nextStep={nextStep} values={values}/>
              }
              {
                step == 1 && <FullName nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 2 && <Email prevStep={prevStep}  nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 3 && <Feeling prevStep={prevStep}  nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 4 && <Recommend prevStep={prevStep}  nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 5 && <Satisfication prevStep={prevStep}  nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 6 && <Suggestion prevStep={prevStep}  nextStep={nextStep} handleChange={handleChange} values={values}/>
              }
              {
                step == 7 && <Thankyou prevStep={prevStep}  nextStep={nextStep} submit={onSubmit} />
              }
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default Survey;
