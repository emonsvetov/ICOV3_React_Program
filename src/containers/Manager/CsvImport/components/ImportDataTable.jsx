import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { TABLE_COLUMNS } from "./column";
import { IMPORT_DATA } from "./MOCK_DATA";
import { connect } from "react-redux";




const ImportCsvTable = ({ organization, program, programs }) => {

  const [isLoading, setIsLoading] = useState(false);

  const download = async (filterValues) => {
    // const response = await "Api"
    // console.log(response)
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
      <div className="table react-table report-table">
        {isLoading && <p>Loading...</p>}

        <table className="table table-striped report-table">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((head) => (
                <th key={head.accessor}>{head.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="table table--bordered">
            {IMPORT_DATA.map((item) => (
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.event_name}</td>
                <td>{item.dollarAmountOverride}</td>
                <td>{item.refferrer}</td>
                <td>{item.notes}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <Col>
              <Row>
              <label>Download Import Template</label>
              <Button>Download</Button>
              </Row>
            </Col>
          </tfoot>
        </table>
      </div>
      </Container>
    </>
  );
};



const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(ImportCsvTable);
