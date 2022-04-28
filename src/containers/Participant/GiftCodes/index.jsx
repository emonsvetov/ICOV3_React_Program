import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import {ParticipantTabNavs} from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import GiftCard from './components/GiftCard';
import giftData from './components/Mockdata.json';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-gift-codes.jpg`;

const MyGiftCodes = () => {
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
        <div className='title text-dark'>
          My Gift Codes
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
          <div className="dashboard">
           {giftData.map((item, index)=>{
             return <GiftCard key={index} data={item}/>
           })}   
              
          </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default MyGiftCodes;
