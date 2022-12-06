import React, {useState} from 'react';
import { ParticipantTabNavs } from '../../../shared/components/tabNavs';
import {Sidebar} from '../../Layout/sidebar';
import LeadForm from './components/LeadForm'
import { Input, Col, Row,Container} from 'reactstrap';


const Lead = () => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }
  return (
    <>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <LeadForm />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default Lead;
