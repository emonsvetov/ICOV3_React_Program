import React from "react";



import { Input, FormGroup, Label } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";

export const Start = ({ nextStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <div className="survey text-center">
      <h3>Customer Feedback Survey</h3>
      <div className="my-3">
        Please let us know about your experience with our product and service
      </div>
      <TemplateButton className="" onClick={handleNext} text="NEXT" />
    </div>
  );
};

export const FullName = ({ nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <div className="survey text-center">
      <FormGroup>
        <Input
          placeholder={t("full_name")}
          onChange={(e) => handleChange(e.target.value, "name")}
          defaultValue={values?.name}
          type="text"
        />
      </FormGroup>
      <TemplateButton onClick={handleNext} className="" text="NEXT" />
    </div>
  );
};

export const Email = ({ prevStep, nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="survey text-center">
      <FormGroup>
        <Input
          placeholder={t("email_address")}
          onChange={(e) => handleChange(e.target.value, "email")}
          defaultValue={values?.email}
          type="text"
        />
      </FormGroup>

      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="marginRight5"
        onClick={handleNext}
        text="NEXT"
      />
    </div>
  );
};

export const Feeling = ({ prevStep, nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
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

  return (
    <div className="survey">
      <FormGroup>
        <legend>Do you feel your workspace engaging?</legend>
        <Input
          type="select"
          defaultValue={values?.feeling}
          name="feeling"
          onChange={(e) => handleChange(e.target.value, "feeling")}
        >
          <StatusOptions />
        </Input>
      </FormGroup>
      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="marginRight5"
        onClick={handleNext}
        text="NEXT"
      />
    </div>
  );
};

export const Recommend = ({ prevStep, nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="survey">
      <FormGroup
        tag="fieldset"
        onChange={(e) => handleChange(e.target.value, "recommend")}
      >
        <legend>Would you recommend our company to a friend?</legend>
        <FormGroup check>
          <Label check>
            <Input
              name="recommend"
              value="1"
              defaultChecked={values?.recommend == 1}
              type="radio"
            />
            Yes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              name="recommend"
              value="0"
              defaultChecked={values?.recommend == 0}
              type="radio"
            />
            No
          </Label>
        </FormGroup>
      </FormGroup>

      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="marginRight5"
        onClick={handleNext}
        text="NEXT"
      />
    </div>
  );
};

export const Satisfication = ({ prevStep, nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="survey">
      <FormGroup
        onChange={(e) => handleChange(e.target.value, "satisfication")}
      >
        <legend>How satisfied are you with our company overall?</legend>
        <FormGroup check>
          <Label check>
            <Input
              name="satisfication"
              value="2"
              defaultChecked={values?.satisfication == 2}
              type="radio"
            />
            Very Satisfied
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              name="satisfication"
              value="1"
              defaultChecked={values?.satisfication == 1}
              type="radio"
            />
            Satisfied
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              name="satisfication"
              value="0"
              defaultChecked={values?.satisfication == 0}
              type="radio"
            />
            Undecided
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              name="satisfication"
              value="-1"
              defaultChecked={values?.satisfication == -1}
              type="radio"
            />
            Unsatisfied
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              name="satisfication"
              value="-2"
              defaultChecked={values?.satisfication == -2}
              type="radio"
            />
            Very Unsatisfied
          </Label>
        </FormGroup>
      </FormGroup>

      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="marginRight5"
        onClick={handleNext}
        text="NEXT"
      />
    </div>
  );
};

export const Suggestion = ({ prevStep, nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <div className="survey">
      <FormGroup>
        <legend>
          Do you have any suggestions how we can improve your employment
          experience?
        </legend>
        <FormGroup>
          <Input
            placeholder={t("your_suggestion")}
            onChange={(e) => handleChange(e.target.value, "suggestion")}
            defaultValue={values?.suggestion}
            type="textarea"
          />
        </FormGroup>
      </FormGroup>
      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="marginRight5"
        onClick={handleNext}
        text="NEXT"
      />
    </div>
  );
};

export const Thankyou = ({ prevStep, submit }) => {
  return (
    <div className="survey">
      <legend>
        Thank you for completing this survey. You will be awarded 400 points!
      </legend>
      <TemplateButton
        className="marginRight5"
        onClick={() => prevStep()}
        text="PREVIOUS"
      />
      <TemplateButton
        className="red marginRight55"
        onClick={() => submit()}
        text="Submit"
      />
    </div>
  );
};
