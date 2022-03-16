import React from 'react';
import Topbar from './topbar/Topbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Slider from '../../shared/components/slider';
import TabNavs from '../../shared/components/tabNavs';
import Sidebar from './sidebar';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/back.png`;

const slide_imgs = [
  "img/merchants/1.png", 
  "img/merchants/2.png", 
  "img/merchants/3.png", 
  "img/merchants/4.png", 
  "img/merchants/5.png", 
  "img/merchants/6.png", 
  "img/merchants/7.png", 
  "img/merchants/8.png", 
]

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
              <div className='mt-5'>
                <h3>Select a merchant to redeem your points</h3>
                <Slider data={slide_imgs} />
              </div>
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