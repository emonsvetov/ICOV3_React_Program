import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Col, 
    Container, 
    Row, 
    FormGroup, 
    Input
} from 'reactstrap';

import {ManagerTabNavs} from '../../../shared/components/tabNavs';

import Dashboard from './View/Dashboard';
import Leaderboard from './View/Leaderboards';
import Spirewall from './View/SpireWall';

export const Home = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col md={3} className="program-select d-flex">
            <span>For Program:</span>
            <FormGroup>
              <Input type="select" name="program" >
                <option>301166: Incentco</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <ManagerTabNavs/>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Dashboard />
    </>
   
)}

export const NSpireWall = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col md={3} className="program-select d-flex">
            <span>For Program:</span>
            <FormGroup>
              <Input type="select" name="program" >
                <option>301166: Incentco</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <ManagerTabNavs/>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Spirewall />
    </>
   
)}

export const Leaderboards = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col md={3} className="program-select d-flex">
            <span>For Program:</span>
            <FormGroup>
              <Input type="select" name="program" >
                <option>301166: Incentco</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <ManagerTabNavs/>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Leaderboard />
    </>
   
)}

