import React, { useState } from "react";
import { Modal, Button, Col, Row, FormGroup } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import DatePicker from "react-datepicker";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { responsiveFontSizes } from "@material-ui/core";

const AwardScheduleDateModel = ({
  isOpen,
  setOpen,
  toggle,
  organization,
  program,
  participantsScheduleData,
}) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const onSubmit = (values) => {
    let formData = {};
    formData.scheduled_date = scheduleDate.toISOString().slice(0, 10);
    formData.budget_cascading_approval_id = [
      participantsScheduleData.cascading_id,
    ];
    console.log();
    axios
      .put(
        `/organization/${organization.id}/program/${program.id}/manage-schedule-date`,
        formData
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toggle();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let initialValue = {
    scheduled_date: new Date(
      participantsScheduleData?.scheduled_date
    ).toLocaleDateString("en-US", {}),
  };

  return (
    <Modal
      className={`program-settings modal-lg padded`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div className="right p-2">
        <div
          className="title mb-1 p-1 rounded text-white"
          style={{ backgroundColor: "grey" }}
        >
          <h3>Schedule Date</h3>
        </div>
        <Form onSubmit={onSubmit} initialValues={initialValue}>
          {({ handleSubmit, form, submitting, pristine, values }) => {
            // console.log(values)
            return (
              <form
                className="form d-flex flex-column justify-content-evenly p-2"
                onSubmit={handleSubmit}
              >
                <>
                  <Row>
                    <Col md="6">
                      <Field name="scheduled_date">
                        {({ input, meta }) => (
                          <FormGroup>
                            <DatePicker
                              dateFormat={"yyyy-MM-dd"}
                              selected={scheduleDate}
                              onChange={(date) => setScheduleDate(date)}
                            />
                            {meta.touched && meta.error && (
                              <span className="text-danger">{meta.error}</span>
                            )}
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                  </div>
                </>
              </form>
            );
          }}
        </Form>
      </div>
    </Modal>
  );
};

export default AwardScheduleDateModel;
