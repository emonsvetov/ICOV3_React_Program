import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import StarIcon from 'mdi-react/StarFaceIcon';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';

const RewardItem = (props) => {
  const {title, content, from, timestamp } = props.data;
  return (
    <div className='reward-item d-flex justify-content-between'>
      <div className='icon' >
        <StarIcon size={40}/>
      </div>        
      <div className='d-flex flex-column'>
        <strong>{title}</strong>
        <span>{content}</span>
      </div>
      <div className='d-flex flex-column'>
        <span>From: <strong>{from}</strong></span>
        <span>{timestamp}</span>
      </div>
      <div className='red comment-btn'>
        <PlusCircleIcon/>
        comment
      </div>
    </div>
      
)}

export default RewardItem;
