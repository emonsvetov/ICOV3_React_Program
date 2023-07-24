import React, { useState } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "reactstrap";

import SelectProgram from "../components/SelectProgram";
import Invoices from "./components/Invoices";
import { isEmpty } from "@/shared/helpers";
import ModalWrapper from "./components/ModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const ManageAccount = ({ auth, program, organization }) => {
  // console.log(auth)
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

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
              onClick={() => toggle("Transfer")}
              text="Create Multiple Invoices"
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

      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
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
