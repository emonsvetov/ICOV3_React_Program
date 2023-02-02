import React from "react";
import { Modal } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import GoalPlanForm from "./GoalPlanForm";
import {Img} from '@/theme'

const EditGoalPlanModal = ({
  program,
  isOpen,
  setOpen,
  toggle,
  goalplan,
}) => {
  let props = {
    program,
    goalplan,
    setOpen
  };
  return (
    <Modal
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div className="left">
        <div className="title mb-5">
          <h3>Edit Goal Plan</h3>
          <span>
            Edit Goal Plan here.
          </span>
        </div>
        <Img src="img/pages/addGoalPlan.png" className="edit-goalplan" />
      </div>
      <div className="right">
        <GoalPlanForm {...props} />
      </div>
    </Modal>
  );
};

export default EditGoalPlanModal;
