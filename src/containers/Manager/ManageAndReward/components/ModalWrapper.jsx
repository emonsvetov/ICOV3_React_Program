import React from "react";
import { connect } from "react-redux";
import GiveRewardPopup from "./GiveRewardPopup";
import ResendInviteModal from "./ResendInviteModal";
import ChangeStatusModal from "./ChangeStatusModal";
import PeerAllocationPopup from "./PeerAllocationPopup";
import ParticipantViewModal from "./ParticipantViewModal";
// import SubProgramsModal from './subprogram/SubProgramsModal'
import { useTranslation } from "react-i18next";

const MainModalWrapper = ({
  user,
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  participants,
  auth,
}) => {
  const { t } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    user,
    participants,
    auth,
    name,
  };
  if (!organization?.id || !program?.id) return t("loading");
  return (
    <>
      {name === "Reward" && <GiveRewardPopup {...props} />}
      {name === "Resend Invite" && <ResendInviteModal {...props} />}
      {(name === "Deactivate" || name === "Activate") && (
        <ChangeStatusModal {...props} />
      )}
      {name === "Peer Allocation" && <PeerAllocationPopup {...props} />}
      {name === "Name" && <ParticipantViewModal {...props} />}
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
export default connect(mapStateToProps)(MainModalWrapper);
