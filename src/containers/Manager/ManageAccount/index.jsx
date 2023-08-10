import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import SelectProgram from "../components/SelectProgram";
import Invoices from "./components/Invoices";
import { isEmpty } from "@/shared/helpers";
import ModalWrapper from "./components/ModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";
import SuccessCreditAmount from "./components/CreditAmountModal";

const ManageAccount = ({ auth, program, organization }) => {
  // console.log(auth)
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [isPaymentModelOpen, setPaymentModelOpen] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [message, setStatusMessage] = useState("");

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const statusAmount = () => {
    const queryParams = new URLSearchParams(window.location.search);
    let status = queryParams.get("ccdepositStatus");

    if (status === "1" || status === "5") {
      let msg = { label: "Default Label", message: "Some message here" };
      if (status === "1") {
        msg = {
          label: "Success",
          message: "Your payment was successfully processed.",
        };
      } else if (status === "5") {
        msg = { label: "Error", message: "Your payment was failed." };
      }
      setStatusMessage(msg);
      setPaymentModelOpen(true);
    }
  };

  useEffect(() => {
    statusAmount();
  }, []);

  if (!auth || !program || !organization) return t("loading");

  return (
    <div className="referral">
      <Container>
        <Row className="mt-4">
          <Col md={10}>
            <div className="my-3 d-flex justify-content-between">
              <h3>Manage Account</h3>
              <TemplateButton
                onClick={() => toggle("CreateInvoice")}
                text="Create Invoice"
              />
            </div>
            <Col md={4} className="d-flex program-select my-3">
              <SelectProgram />
            </Col>
          </Col>
        </Row>

        <div className="points-summary-table">
          <div className="buttonWrapper">
            <TemplateButton
              onClick={() => toggle("CreateInvoice")}
              text="Create an Invoice"
            />
            <TemplateButton
              onClick={() => toggle("MultipleInvoices")}
              text="Create Multiple Invoices"
            />
            <TemplateButton
              onClick={() => toggle("TransferMoney")}
              text="Transfer Money Between Programs"
            />
            <TemplateButton
              onClick={() => toggle("Pay")}
              text="Make Payment using Credit Card"
            />
          </div>
          {auth && program && !isEmpty(organization) && (
            <Invoices program={program} organization={organization} />
          )}
        </div>
      </Container>

      <SuccessCreditAmount
        message={message}
        isOpen={isPaymentModelOpen}
        setPaymentModelOpen={setPaymentModelOpen}
      />

      <div style={{ padding: "5px 20px" }}></div>
      <ModalWrapper
        name={modalName}
        isOpen={isPaymentModelOpen}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(ManageAccount);
