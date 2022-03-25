import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import RedeemIcon from 'mdi-react/HandHeartIcon';

//type 0: awards or redemptions
//      1: active participants                                                                                                                    

const TodayItem = (props) => {
  const {title, today, ytd, mtd } = props.data;
  const {index} = props;
  return (
    <div className={`rounded-panel today-panel index-${index} d-flex flex-column`}>
      <h4>{title}</h4>
      <Row className='mb-2'>
        <Col md={6}>
          <div className='d-flex'>
            <RedeemIcon size={50} className="award-icon"/>
            <div className='d-flex flex-column'>
              <h3 className='color m-0'>{today.value.toLocaleString()}</h3>
              <span>{today.unit}</span>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex flex-column'>
            <h3 className='m-0'>{today.award}</h3>
            <span>{today.awardText}</span>
        </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className='d-flex flex-column ytd'>
            <strong>YTD</strong>
            <span>{ytd.value.toLocaleString()}</span>
            <span>{ytd.amount?.toFixed(2)}</span>
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex flex-column mtd'>
            <strong>MTD</strong>
            <span>{mtd.value.toLocaleString()}</span>
            <span>{mtd.amount?.toFixed(2)}</span>
          </div>
        </Col>
      </Row>
      
    </div>
      
)}

export default TodayItem;
