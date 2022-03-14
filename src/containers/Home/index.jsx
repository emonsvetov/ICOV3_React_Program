import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
const Home = () => {
  return (
    <Container className="dashboard">
      <div className='welcome'>
        <div className='title'>
          Welcome back Jay!
        </div>
        <div className='description'>
          Congratulations on earning rewards! Redeem your rewards when you earn them or save them for a "rainy day".
        </div>
      </div>
      <div className='points'>
          <div className='title'>
            MY POINTS
          </div>
          <div className='redeem-panel'>
            <Row className='redeem-panel-wrapper'>
              <Col md={6}>
                
                <div className='title'>
                  POINTS TO REDEEM:
                </div>
                <div className='points'>
                  56, 824
                </div>
                
              </Col>
              <Col md={6}>
                <div className='redeem'>
                  <div className='title'>
                  REDEEM MY POINTS
                  </div>
                </div>
              </Col>
            </Row>
            
          </div>
      </div>
      
      
    </Container>
)}

export default Home;
