import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import CloseIcon from "mdi-react/CloseIcon";

const SuccessCreditAmount = ({
  template,
  isOpen,
  setPaymentModelOpen,
  message,
}) => {
  const [modal, setModal] = useState(false);

  const { t } = useTranslation();
  if (!template) return t("loading");
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  const color = message.label === "Error" ? "red" : "green";
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalHeader className="d-flex justify-content-center">
          <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
        </ModalHeader>
        <ModalHeader style={{ color }} >
          {message.label === "Error" ? "Error occurred" : "Success"}
         
        </ModalHeader>
        <ModalBody> {message.message}</ModalBody>

        <div className="close cursor-pointer">
          <CloseIcon onClick={() => setPaymentModelOpen(false)} size={30} />
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(SuccessCreditAmount);
