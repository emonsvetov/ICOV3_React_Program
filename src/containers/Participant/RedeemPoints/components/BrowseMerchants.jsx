import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import {useNavigate} from 'react-router-dom';

const getMerchants = () =>{
    let array = [];
    for(let i = 1 ; i<= 25; i ++){
        let item = {};
        item.logo = `/img/merchants/${i}.png`;
        item.no = i + 203675;
        array.push(item);
    }
    return array;
}

const OurMerchants = () => {
  const merchants = getMerchants();
  let navigate = useNavigate();
  return (
    <div className='browse-merchants'>
        <h5>Our Merchants</h5>
        <Row className='merchants-thumbnail'>
            {merchants.map((item, index) =>{
                return <Col md={2} className='item' key={index} onClick={() => navigate(`/participant/redeem/${item.no}`)}>
                    <img src={item.logo} />
                </Col>
            })}
        </Row>
    </div>
    
)}

export default OurMerchants;