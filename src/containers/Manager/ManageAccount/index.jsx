import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import SelectProgram from "../components/SelectProgram";
import MoniesAvailablePostings from "./components/MoniesAvailablePostings";
import { isEmpty, toCurrency } from "@/shared/helpers";
import ModalWrapper from "./components/ModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";
import CapturePaymentRequest from "./components/CapturePaymentRequest";
import { getProgramBalance } from "@/services/program/getBalance";
import { setAuthProgram } from "@/containers/App/auth";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ManageAccount = ({ auth, program, organization }) => {
  // console.log(auth)
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  React.useEffect( () => {
    if( program && organization ) {
      if(typeof program.balance == 'undefined') {
        getProgramBalance(organization.id, program.id)
        .then( balance => {
          program.balance = balance;
          setAuthProgram(program);
          window.location.reload();
        })
      }
    }
  }, [program])

  if (!auth || !program || !organization) return t("loading");

  console.log(program)

  return (
    <div className="referral">
      <Container>
        <Row className="mt-4">
          <Col md={12}>
            <div className="my-3 d-flex justify-content-between">
              <h3>Manage Account</h3>
            </div>
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
          </Col>
        </Row>
        <p>Funds Available for Reward: <strong>{toCurrency(program.balance)}</strong></p>
        <div className="d-flex mb-3"><SelectProgram showRefresh={true}  /></div>
        
        

        <div className="points-summary-table">
          {auth && program && !isEmpty(organization) && (
            <MoniesAvailablePostings program={program} organization={organization} />
          )}
        </div>
      </Container>

      <CapturePaymentRequest />

      <div style={{ padding: "5px 20px" }}></div>
      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        toggle={toggle}
        setOpen={setOpen}
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
