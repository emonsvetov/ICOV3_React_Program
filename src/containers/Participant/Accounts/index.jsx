import React, {useState, useEffect} from 'react';
import { ParticipantTabNavs } from '@/shared/components/tabNavs';
import Sidebar from '@/containers/Layout/sidebar';
import AccountForm from '@/shared/components/account/AccountForm'
import { Input, Col, Row,Container} from 'reactstrap';
import {getAuthUser} from '@/containers/App/auth';

const Account = () => {
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const onSubmit = values => {
    
  }
  useEffect( () => {
    let user = getAuthUser();
    if(user)
      setUser(user);
  }, [])

  return (
    <>
      <Container>
          <ParticipantTabNavs />
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <AccountForm user={user}/>
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
