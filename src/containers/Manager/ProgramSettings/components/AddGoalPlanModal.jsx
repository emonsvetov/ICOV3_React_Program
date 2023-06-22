import React from "react";
import { Modal } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";

import GoalPlanForm from "./GoalPlanForm";
import {Img} from '@/theme'
const AddGoalPlanModal = ({
  program,
  isOpen,
  setOpen,
  toggle,
}) => {
  let props = {
    program,
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
          <h3>Add New Goal Plan</h3>
          <span>
            Add new Goal Plan Here.
          </span>
        </div>
        <Img src="img/pages/addGoalPlan.png" className="add-goalplan" alt="goal-plan"/>
      </div>
      <div className="right">
        <GoalPlanForm {...props} />
      </div>
    </Modal>
  );
};

export default AddGoalPlanModal;
