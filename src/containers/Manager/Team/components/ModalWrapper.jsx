import React from "react";
import { connect } from "react-redux";
import AddTeamModal from "./AddTeamModal";
import EditTeamModal from "./EditTeamModal";
import ViewTeamModal from "./ViewTeamModal"; 
import { useTranslation } from "react-i18next";

const MainModalWrapper = ({
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  team,
  setTeam,
}) => {
  const { t } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    team,
    setTeam,
  };
  if (!organization?.id || !program?.id) return t("loading");
  return (
    <>
      {name === "AddTeam" && <AddTeamModal {...props} />}
      {name === "EditTeam" && <EditTeamModal {...props} />}
      {name === "ViewTeam" && <ViewTeamModal {...props} />}
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
