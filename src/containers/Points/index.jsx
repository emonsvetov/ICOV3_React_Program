import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import TabNavs from '../../shared/components/tabNavs';
import Sidebar from '../Layout/sidebar';
import PointsSummary from './components/PointsSummary';
import PointsDetail from './components/PointsDetail';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

const MyPoints = () => {
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
      </div>
      <TabNavs />
      <Container className='mb-5'>
        <Row>
          <Col md={9}>
          <div className="dashboard">
              <PointsSummary />
              <PointsDetail />
              
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default MyPoints;
