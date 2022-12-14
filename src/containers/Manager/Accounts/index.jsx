import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import AccountForm from "@/shared/components/account/AccountForm";
import { useTranslation } from "react-i18next";

const ManagerAccountIndex = ({ auth, program, organization }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  if (!auth || !program || !organization) return t("loading");

  return (
    <div className="team">
      <Container>
        <Row className="mt-4">
          <Col md={10}>
            <AccountForm user={auth} />
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps)(ManagerAccountIndex);
