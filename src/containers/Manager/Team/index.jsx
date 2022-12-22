import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row, NavLink, Button } from "reactstrap";

import SelectProgram from "../components/SelectProgram";
import Teams from "./components/Teams";
import { isEmpty } from "@/shared/helper";
import ModalWrapper from "./components/ModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const Team = ({ auth, program, organization }) => {
  console.log(auth);
  const { t } = useTranslation();
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
            <div className="my-3 d-flex justify-content-between">
              <h3>Team</h3>
              <TemplateButton
                onClick={() => toggle("AddTeam")}
                text="Add teammate"
              />
            </div>
            <Col md={4} className="d-flex program-select my-3">
              <SelectProgram />
            </Col>
          </Col>
        </Row>

        <div className="points-summary-table">
          {auth && program && !isEmpty(organization) && (
            <Teams program={program} organization={organization} />
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

export default connect(mapStateToProps)(Team);
