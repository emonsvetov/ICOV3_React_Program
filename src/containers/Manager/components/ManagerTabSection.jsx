import React from "react";
import { Col, Row } from "reactstrap";

import { ManagerTabNavs } from "@/shared/components/tabNavs";
import SelectProgram from "./SelectProgram";

const ManagerTabSection = () => {
  return (
    <Row>
      <Col md={4} lg={4} sm={4} xs={12} className="program-select d-flex">
        <SelectProgram showRefresh={false}  />
      </Col>
      <Col md={8} lg={8} sm={8} xs={12} className="manager-tabnavs-wrap" >
        <ManagerTabNavs />
      </Col>
    </Row>
  )
}

export default ManagerTabSection