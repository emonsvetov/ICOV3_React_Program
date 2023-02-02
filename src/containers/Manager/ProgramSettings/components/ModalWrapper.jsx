import React from "react";
import { connect } from "react-redux";
import AddGoalPlanModal from "./AddGoalPlanModal";
import EditGoalPlanModal from "./EditGoalPlanModal";
import AddEventPopup from "../Events/AddEventModal";
import EditEventModal from "../Events/EditEventModal";
import AddLeaderboardModal from "./AddLeaderboardModal";
import { useTranslation } from "react-i18next";

const ModalWrapper = ({
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  event,
  setEvent,
  goalplan,
  setGoalPlan,
  setTrigger
}) => {
  const { t } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    event,
    setEvent,
    goalplan,
    setGoalPlan,
    setTrigger
  };
  // console.log(leaderboard, '-----------')
  if (!organization?.id || !program?.id) return t("loading");

  return (
    <>
      {name === "AddEvent" && <AddEventPopup {...props} />}
      {name === "EditEvent" && <EditEventModal {...props} />}
      {name === "AddGoalPlan" && <AddGoalPlanModal {...props} />}
      {name === "EditGoalPlan" && <EditGoalPlanModal {...props} />}
      {name === "AddLeaderboard" && <AddLeaderboardModal {...props} />}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(ModalWrapper);
