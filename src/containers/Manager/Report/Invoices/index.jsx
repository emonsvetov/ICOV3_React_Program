import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Row, Col, Card, CardBody  } from 'reactstrap';
import { useParams } from "react-router-dom";
import InvoicesDataTable from "./components/InvoicesDataTable";
import ViewInvoice from './components/ViewInvoice';
import {getInvoice} from "@/services/program/getInvoice";
import axios from 'axios';
import { isEmpty } from '@/shared/helpers';

const Invoices = (props) => {

    const { invoiceId } = useParams();
    const [programs, setPrograms] = useState([]);
    const [defaultPrograms, setDefaultPrograms] = useState([]);
    const [step, setStep] = useState(0);
    const [invoice, setInvoice] = useState(null);
    const [trigger, setTrigger] = useState( 0 );

    const getData = async () => {
        const programsApiUrl = `/organization/${props.organization.id}/program/${props.program.id}/descendents?includeSelf=1&flat=1`
        if (isEmpty(programs)) {
          try {
            const response = await axios.get(programsApiUrl);
            if (response.data.length === 0) return {results: [], count: 0}
    
            const data = response.data;
    
            setPrograms(data);
            return data;
          } catch (e) {
            throw new Error(`API error:${e?.message}`);
          }
        }
    }

      useEffect(() => {
        if (props.organization) {
          getData();
        }
        if (programs.length) {
          const result = programs.map(x => x.account_holder_id)
          setDefaultPrograms(result);
        }
      }, [programs, props.organization])

    useEffect( () => {
        if( invoiceId ){
            // getInvoice(props.program?.organization_id, props.program?.id, invoiceId)
            // .then( res => {
                setInvoice({id: invoiceId})
                setStep(1)
            // })
        }
    }, [props]);

    if( invoiceId && !invoice ) return 'Loading...'

    props = {
        ...props,
        setStep,
        trigger,
        setTrigger
    }

    if (isEmpty(defaultPrograms)) {
      return <p>Loading...</p>;
    }

    return (
        <Col md={12}>
          <Card>
            <CardBody>
                { step === 0 && <InvoicesDataTable setInvoice={setInvoice} programs = {defaultPrograms} {...props}  />}
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
