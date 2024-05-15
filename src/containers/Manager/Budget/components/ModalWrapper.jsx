import React from "react";
import { connect } from "react-redux";
import AddBudgetSetup from "./AddBudgetSetup";
import BudgetSetupInformationModal from "./EditBudgetSetup";
import { useTranslation } from "react-i18next";

const MainModalWrapper = ({
  organization,
  program,
  rootProgram,
  name,
  isOpen,
  setOpen,
  setModalName,
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
    setModalName,
    rootProgram,
  };
  if (!organization?.id || !program?.id) return t("loading");

  return (
    <>
      {name === "AddBudgetSetup" && <AddBudgetSetup {...props} />}
      {name === "BudgetSetupInformation" && (
        <BudgetSetupInformationModal {...props} id={id} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
    rootProgram: state.rootProgram,
  };
};
export default connect(mapStateToProps)(MainModalWrapper);
