import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Queries } from "./components/Queries";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const ProgramRules = () => {
  const { t } = useTranslation();
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin />
        </Col>

        <Col md={7}>
          <h2 className="my-3">{t("program_rules")}</h2>
          <strong>{t("program_rules_desc")}</strong>
          <Queries />
        </Col>
      </Row>
    </Container>
  );
};

export default ProgramRules;
