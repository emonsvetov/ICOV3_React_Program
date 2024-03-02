import React, { useState } from "react";
import SelectProgram from "../components/SelectProgram";
import { Col, Container, Row } from "reactstrap";
import ImportType from "./components/ImportType";

import ImportDataTable from "./components/ImportDataTable";



const CsvImport = () => {

  return (
    <div className="referral">
      <Container>
        <Row className="mt-4">
          <Col md={12}>
            <div className="my-3 d-flex justify-content-between">
              <h3>CSV Import</h3>
            </div>
          </Col>
          <Col md={4} className="d-flex program-select my-3">
            <SelectProgram />
          </Col>
        </Row>

        <Row >
          <Col md={12}>
            <h6 className="bg-secondary p-1 text-center ">
              Select Import Type and .csv File
            </h6>
            <div className="my-3 d-flex ">
              <ImportType />
            </div>
          </Col>
        </Row>
        <div className="points-summary-table">
        <ImportDataTable />
      </div>
      </Container>
    </div>
  );
};

export default CsvImport;
