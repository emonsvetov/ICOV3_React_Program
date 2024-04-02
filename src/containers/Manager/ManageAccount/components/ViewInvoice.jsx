import React from "react";
import { Row, Col, Card, CardBody  } from 'reactstrap';
import ViewInvoiceComp from "@/containers/Manager/Report/Invoices/components/ViewInvoice";

const ViewInvoice = (props) => {
  return(
    <Col md={12}>
      <Card>
        <CardBody>
            <Row className="justify-content-center">
                <Col md={8} >
                  <ViewInvoiceComp {...props} />
                </Col>
            </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ViewInvoice