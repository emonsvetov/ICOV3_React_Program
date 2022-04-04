import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import {ParticipantTabNavs} from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import SelectMerchantType from './components/SelectMerchantType';
import OurMerchants from './components/BrowseMerchants';
import Redeem from './components/Redeem';
import CheckoutPage from './components/CheckoutPage';

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;


export const SelectMerchants = () => {

  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
        <div className='title'>
          Redeem My Points
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
          <div className="dashboard">
              <SelectMerchantType />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export const BrowseMerchants = () => {

  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
        <div className='title'>
          Redeem My Points
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
          <div className="dashboard">
              <OurMerchants />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export const RedeemMerchant = () => {
  let params = useParams();
  let {merchantId} = params;
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
        <div className='title'>
          Redeem My Points
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
          <div className="dashboard">
              <Redeem />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export const Checkout = () => {
  let params = useParams();
  let {merchantId} = params;
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
        <div className='title'>
          Redeem My Points
        </div>
      </div>
      <Container>
          <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
          <div className="dashboard">
              <CheckoutPage />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

