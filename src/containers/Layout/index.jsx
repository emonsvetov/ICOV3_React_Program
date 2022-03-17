import React from 'react';
import Topbar from './topbar/Topbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import TabNavs from '../../shared/components/tabNavs';
import Sidebar from './sidebar';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/back.png`;

const PageLayout = () => (
  <main>
      <Topbar />
      <div className='mainboard'>
        <img src={IMG_BACK}/>
      </div>
      <TabNavs />
      <Container className='mb-5'>
        <Row>
          <Col md={9}>
              <Outlet /> 
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
      <Footer />
    
  </main>
);


export default PageLayout;