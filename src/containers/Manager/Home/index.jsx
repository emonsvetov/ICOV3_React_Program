import React from 'react';
import { 
    Col, 
    Container, 
    Row, 
    FormGroup, 
    Input
} from 'reactstrap';

import {ManagerTabNavs} from '../../../shared/components/tabNavs';
import SelectProgram from '../components/SelectProgram'

import Dashboard from './View/Dashboard';
import Leaderboard from './View/Leaderboards';
import Spirewall from './View/SpireWall';
import SocialWallPanel from '@/shared/components/socialWall/SocialWallPanel';
import {getAuthProgram} from '@/containers/App/auth';


export const Home = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col md={3} className="program-select d-flex">
            <SelectProgram />
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
  const program = getAuthProgram();

  return (
    <>
      {program.uses_social_wall > 0 &&
        <>
          <Container>
            <Row>
              <Col md={3} className="program-select d-flex">
                <SelectProgram/>
              </Col>
              <Col md={6}>
                <ManagerTabNavs/>
              </Col>
            </Row>
          </Container>
          <hr></hr>
          <SocialWallPanel isManager={true}/>
        </>
      }
    </>
  )
}

export const Leaderboards = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col md={3} className="program-select d-flex">
            <SelectProgram />
          </Col>
          <Col md={6}>
            <ManagerTabNavs/>
          </Col>
        </Row>
      </Container>
      <Leaderboard />
    </>
   
)}

