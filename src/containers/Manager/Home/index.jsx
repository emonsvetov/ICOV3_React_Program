import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import {ManagerTabNavs} from '../../../shared/components/tabNavs';

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
          </Col>
          <Col md={6}>
            <ManagerTabNavs/>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Container className='managerboard'>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={8}>
          </Col>
          
        </Row>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={8}>
          </Col>
        </Row>
      </Container>

    </>
   
)}

export default Home;
