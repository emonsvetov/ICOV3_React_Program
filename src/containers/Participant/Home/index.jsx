import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import RewardsPanel from './components/RewardsPanel';
import Slider from './components/slider';
import {ParticipantTabNavs} from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/back.png`;

const slide_imgs = [
  "/img/merchants/1.png", 
  "/img/merchants/2.png", 
  "/img/merchants/3.png", 
  "/img/merchants/4.png", 
  "/img/merchants/5.png", 
  "/img/merchants/6.png", 
  "/img/merchants/7.png", 
  "/img/merchants/8.png", 
]


const Home = () => {
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
                <div className='welcome'>
                  <h1> Welcome back Jay! </h1>
                  <div className='description'>
                    xCongratulations on earning rewards! Redeem your rewards when you earn them or save them for a "rainy day".
                  </div>  
                </div>

                <RewardsPanel />
                
                <div className='mt-5'>
                  <h3>Select a merchant to redeem your points</h3>
                  <Slider data={slide_imgs} />
                </div>
                
            </div>
          </Col>
          <Col md={3} className="mt-5">
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
   
)}

export default Home;
