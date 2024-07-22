import React from "react";
import { Modal, FormGroup, Button, Label } from "reactstrap";
import axios from "axios";
import CloseIcon from "mdi-react/CloseIcon";
import { Form, Field } from "react-final-form";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";

const AwardApprovalPopup = ({
  isOpen,
  setOpen,
  toggle,
  organization,
  program,
  auth,
  awardApprovalParticipants = [],
  statusName,
  rejection_notes,
  isShow = false,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    try {
      if (awardApprovalParticipants?.length > 0) {
        let formData = {};
        formData.budget_cascading_approval_id = awardApprovalParticipants?.map(
          (approvalParticipant) => approvalParticipant.cascading_id
        );
        formData.approved = statusName == "approved" ? 1 : 2;
        formData.rejection_note =
          statusName == "approved"
            ? `Approved by ${auth.name}`
            : values.rejection_note;
        console.log(formData);
        axios
          .put(
            `/organization/${organization?.id}/program/${program?.id}/budget-cascading-approval`,
            formData
          )
          .then((response) => {
            if (response.status === 200) {
              flashSuccess(
                dispatch,
                "Award Approval status updated successfully!"
              );
              toggle();
              window.location.reload();
            }
          })
          .catch((error) => {
            flashError(dispatch, error.message);
          });
      }
    } catch (error) {
      flashError(dispatch, error.message);
    }
  };
  const totalAmount = awardApprovalParticipants?.reduce(
    (totalAmount, award) => totalAmount + award.amount,
    0
  );

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
        <h4 className="bg-secondary rounded text-white p-2">
          Are you sure you want to Deny {awardApprovalParticipants.length}{" "}
          pending Awards?
        </h4>
        {!isShow && (
          <div>
            <div className="d-flex m-1">
              <h5>Selected Users: </h5> <span>(Name, Amount)</span>
            </div>
            <div>
              {awardApprovalParticipants?.map((participant, i) => {
                return (
                  <div key={i}>
                    <div className="m-3">
                      <ul>
                        <li>
                          {participant.recipient}, ${participant.amount}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <h6
              className="m-1 mt-2"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Total Amount: $ {totalAmount}
            </h6>
          </div>
        )}

        <Form
          onSubmit={onSubmit}
          initialValues={{ rejection_note: rejection_notes }}
        >
          {({ handleSubmit, form, submitting, pristine, values }) => {
            // console.log(values)
            return (
              <form
                className="form d-flex flex-column justify-content-evenly mt-4 p-2"
                onSubmit={handleSubmit}
              >
                {statusName === "reject" && (
                  <>
                    <Label className="text-bold">Rejection Note:</Label>
                    <Field name="rejection_note">
                      {({ input, meta }) => (
                        <FormGroup>
                          <textarea {...input} className="w-50" />
                          {meta.touched && meta.error && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </>
                )}
                <hr />
                <div className="d-flex justify-content-end">
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            );
          }}
        </Form>
      </div>
    </Modal>
  );
};

export default AwardApprovalPopup;
