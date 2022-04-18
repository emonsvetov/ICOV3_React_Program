import React, {useState} from 'react';
import { ParticipantTabNavs } from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import AccountForm from './components/AccountForm'
import { Input, Col, Row,Container} from 'reactstrap';


const Account = () => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }
  return (
    <>
      <div className='mainboard'>
        <div className='title'>
          My Account
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <AccountForm />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default Account;
