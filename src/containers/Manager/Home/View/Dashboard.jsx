import React from 'react';
import { 
    Col, 
    Container, 
    Row, 
} from 'reactstrap';
import DetailCharItem from '../components/DetailChartItem';
import TodayItem from '../components/TodayItem';
import TopPanel from '../components/TopPanel';

import { TODAY_DATA, CHART_DATA  } from '../components/Mockdata';

const Dashboard = () => {
  
  return (
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
    
)}

export default Dashboard;
