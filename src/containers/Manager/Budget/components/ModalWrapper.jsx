import React from "react";
import { connect } from "react-redux";
import AddBudgetSetup from "./AddBudgetSetup";
import BudgetSetupInfoModal from "../view/BudgetSetupInfo";
import { useTranslation } from "react-i18next";

const MainModalWrapper = ({
  organization,
  program,
  rootProgram,
  name,
  isOpen,
  setOpen,
  setModalName,
  assignedPermissions,
  toggle,
  id,
}) => {
  const { t } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    assignedPermissions,
    setModalName,
    rootProgram,
  };
  if (!organization?.id || !program?.id) return t("loading");

  return (
    <>
      {name === "AddBudgetSetup" && <AddBudgetSetup {...props} />}
      {name === "BudgetSetupInformation" && (
        <BudgetSetupInfoModal {...props} id={id} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(MainModalWrapper);
