import React from 'react';
import { 
    Col, 
    Container, 
    Row, 
    FormGroup, 
    Input
} from 'reactstrap';
import DetailCharItem from './components/DetailChartItem';
import TodayItem from './components/TodayItem';
import TopPanel from './components/TopPanel';

import {ManagerTabNavs} from '../../../shared/components/tabNavs';
import { TODAY_DATA, CHART_DATA  } from './components/Mockdata';
import SelectProgram from '../components/SelectProgram'

const Home = () => {
  
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
      <Container className='managerboard'>
        <Row>
          {TODAY_DATA.map((item, index) =>{
            return <Col md={4} key={index}>
                <TodayItem data={item} index={index}/>
              </Col>
          })}
        </Row>
        <Row className='mt-5'>
          <Col md={4}>
            <TopPanel type={0}/>
          </Col>
          <Col md={8}>
            <DetailCharItem type={0} data={CHART_DATA[0]}/>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col md={4}>
            <TopPanel type={1}/>
          </Col>
          <Col md={8}>
            <DetailCharItem type={1} data={CHART_DATA[1]}/>
          </Col>
        </Row>
      </Container>
    </>
   
)}

export default Home;
