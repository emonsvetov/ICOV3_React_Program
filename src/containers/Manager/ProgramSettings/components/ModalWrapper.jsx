import React from "react";
import { connect } from "react-redux";
import AddEventPopup from "./AddEventPopup";
import AddGoalPlanPopup from "./AddGoalPlanPopup";
import EditEventModal from "./EditEventModal";
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
}) => {
  const { t, i18n } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    event,
    setEvent,
  };
  // console.log(leaderboard, '-----------')
  if (!organization?.id || !program?.id) return t("loading");

  return (
    <>
      {name === "AddEvent" && <AddEventPopup {...props} />}
      {name === "EditEvent" && <EditEventModal {...props} />}
      {name === "AddGoal" && <AddGoalPlanPopup {...props} />}
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
