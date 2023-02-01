import React from "react";
import { connect } from "react-redux";
import RedemptionInstruction from "./RedemptionInstruction";
import { useTranslation } from "react-i18next";

const RedemptionInstructionsModalWrapper = ({
  user,
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  merchant,
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
    merchant,
    auth,
  };
  if (!organization?.id || !program?.id) return t("loading");
  return <>{<RedemptionInstruction {...props} />}</>;
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(RedemptionInstructionsModalWrapper);
