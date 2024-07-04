import React, { useState } from "react";
import { Modal, Button, Col, Row, FormGroup } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import DatePicker from "react-datepicker";
import { Form, Field } from "react-final-form";
import axios from "axios";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";

const AwardScheduleDateModel = ({
  isOpen,
  setOpen,
  toggle,
  organization,
  program,
  participantsScheduleDateData,
  togglePan,
  setManageApprovalsRefresh,
}) => {
  const [scheduleDate, setScheduleDate] = useState(
    new Date(participantsScheduleDateData?.scheduled_date)
  );
  const dispatch = useDispatch();
  new Date();
  const onSubmit = (values) => {
    let formData = {};
    let cascadingIds = [];
    cascadingIds.push(participantsScheduleDateData.cascading_id);
    let date = scheduleDate;
    formData.scheduled_date = date;
    formData.budget_cascading_approval_id = cascadingIds;

    if (window.confirm("Are you sure you want to update schedule date")) {
      axios
        .put(
          `/organization/${organization.id}/program/${program.id}/manage-schedule-date`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            flashSuccess(dispatch, "Schedule date updated successfully!");
            for (const checkbox of document.querySelectorAll(
              '.points-summary-table input[type="checkbox"]'
            )) {
              checkbox.checked = false;
            }
            setManageApprovalsRefresh(true);
            toggle();
            togglePan("2");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        {participantsScheduleDateData ? (
          <>
            <div
              className="title mb-1 p-1 rounded text-white"
              style={{ backgroundColor: "grey" }}
            >
              <h3>Schedule Date</h3>
            </div>
            <Form onSubmit={onSubmit}>
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
                                  <span className="text-danger">
                                    {meta.error}
                                  </span>
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
            </Form>{" "}
          </>
        ) : (
          "Loading"
        )}
      </div>
    </Modal>
  );
};

export default AwardScheduleDateModel;
