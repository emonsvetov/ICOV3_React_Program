import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
const Points = () => {
  return (
    <div className='points'>
        <h3>My Points</h3>
        <div className='panel redeem-panel'>
            <div className='mb-3'>
                <h6> Points to Redeem </h6>
                <div className='panel-group'>
                    <h4>{56852..toLocaleString()}</h4>
                    <div className='red redeem-btn'>
                        <Link to={`/participant/select-merchants`}>Redeem Points</Link>
                    </div>
                    {/* <Button className='btn-round'> Redeem Points</Button> */}
                </div>
            </div>
            <div className='point-award'>
                <h6> Peer Points to Award </h6>
                <h4> {56852..toLocaleString()}</h4>  
            </div>
        </div>
    </div>
      
)}

export default Points;
