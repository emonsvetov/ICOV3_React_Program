import React from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import CloseIcon from "mdi-react/CloseIcon";

const SuccessCreditAmount = ({
  template,
  isOpen,
  setOpen,
  toggle,
  message,
}) => {
  // const queryParams = new URLSearchParams(window.location.search);
  // const status = queryParams.get("ccdepositStatus");

  const { t } = useTranslation();
  if (!template) return t("loading");
  const IncentcoLogo = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;

  return (
    <>
      <Modal
        className={`program-settings modal-2col modal-lg`}
        isOpen={isOpen}
        toggle={() => setOpen(true)}
      >
        <div className="close cursor-pointer">
          <CloseIcon onClick={toggle} size={30} />
        </div>
        <div className="login-form-wrap flex-column align-items-center pt-4">
          <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
          <div className="card mt-4">
            <div className="card-header">{message.label}</div>
            <div className="card-body">
              <p className="pb-4">{message.message}</p>
              <div className="d-flex justify-content-between">
                {/* <TemplateButton link="/login" text="Sign in" /> */}
              </div>
            </div>
          </div>
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
