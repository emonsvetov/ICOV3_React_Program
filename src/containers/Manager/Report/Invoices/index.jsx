import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Row, Col, Table, Card, CardBody  } from 'reactstrap';
import { useParams } from "react-router-dom";
import InvoicesDataTable from "./components/InvoicesDataTable";
import ViewInvoice from './components/ViewInvoice';
import {getInvoice} from "@/services/program/getInvoice";

const Invoices = (props) => {

    const { invoiceId } = useParams();

    const [step, setStep] = useState(0);
    const [invoice, setInvoice] = useState(null);
    const [trigger, setTrigger] = useState( 0 );

    useEffect( () => {
        if(invoiceId){
            getInvoice(props.program.organization_id, props.program.id, invoiceId)
            .then( res => {
                setInvoice(res)
                setStep(1)
            })
        }
    }, [props]);

    if(invoiceId && !invoice) return 'Loading...'

    props = {
        ...props,
        setStep,
        trigger,
        setTrigger
    }
    return (
        <Col md={12}>
          <Card>
            <CardBody>
                { step === 0 && <InvoicesDataTable setInvoice={setInvoice} {...props}  />}
                { step === 1 &&
                <Row className="justify-content-center">
                    <Col md={8} >
                        <ViewInvoice invoice={invoice} {...props} />
                    </Col>
                </Row>}
            </CardBody>
          </Card>
        </Col>
    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Invoices);
