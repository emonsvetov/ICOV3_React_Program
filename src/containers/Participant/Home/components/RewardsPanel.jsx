import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import RewardItem from './RewardItem';
import rewardData from './Mockdata.json';

const RewardsPanel = () => {
  return (
    <div className='panel rewards-panel pt-4'>
        {rewardData.map((item, index) =>{
            return <>
            <RewardItem data = {item} key={index}/>
            <hr class="solid"></hr>        
            </>
        })}
    </div>
      
)}

export default RewardsPanel;
