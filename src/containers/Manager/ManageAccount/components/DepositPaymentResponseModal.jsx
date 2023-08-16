import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import CloseIcon from "mdi-react/CloseIcon";
import './style.css'

const DepositPaymentResponseModal = ({
  template,
  isOpen,
  setOpen,
  message,
}) => {

  const { t } = useTranslation();
  if (!template) return t("loading");
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  return (
    <>
      <Modal isOpen={isOpen} className={`model-authresp ${message.className}`}>
        <ModalHeader className="d-flex justify-content-center">
          <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
        </ModalHeader>
        <ModalHeader>
          {message.label}
        </ModalHeader>
        <ModalBody> 
          <div className="content pb-3">{message.message}</div>
          <p className="text-center mb-0"><a style={{textDecoration:'underline'}} onClick={() => setOpen(false)}>Close</a></p>
        </ModalBody>
        <div className="close cursor-pointer">
          <CloseIcon onClick={() => setOpen(false)} size={30} />
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

export default connect(mapStateToProps)(DepositPaymentResponseModal);
