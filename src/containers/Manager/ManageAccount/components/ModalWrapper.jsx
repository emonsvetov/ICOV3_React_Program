import React from "react";
import { connect } from "react-redux";
import CreateInvoiceModal from "./CreateInvoiceModal";
import EditReferralModal from "./EditReferralModal";
import { useTranslation } from "react-i18next";

const MainModalWrapper = ({
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  referral,
  setReferral,
}) => {
  const { t } = useTranslation();
  const props = {
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    referral,
    setReferral,
  };
  if (!organization?.id || !program?.id) return t("loading");

  return (
    <>
      {name === "CreateInvoice" && <CreateInvoiceModal {...props} />}
      {name === "EditReferral" && <EditReferralModal {...props} />}
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
