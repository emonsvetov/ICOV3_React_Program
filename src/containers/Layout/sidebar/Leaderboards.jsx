import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
const leaders =[
  {name: 'Jay Moore', 'award': 800},
  {name: 'Mary-Kate Olsen', 'award': 600},
]
const participants =[
  {name: 'Jay Moore', 'award': 800},
  {name: 'Mary-Kate Olsen', 'award': 600},
  {name: 'Jason Hembre', 'award': 400},
  {name: 'Susan Jackson', 'award': 500},
  {name: 'G W', 'award': 300},
]
const Leaderboards = () => {
  return (
    <div className='leaderboards mt-3'>
        <h3>Leaderboards</h3>
        <div className='panel leader-panel'>
          <div className='matching black fw-bold'>            
            <span>Participant</span>
            <span>Awards</span>
          </div>
          <div className='red mb-3'>            
            {leaders.map((item, index)=>{
              return <div className='matching' key={index} >
                  <span>{item.name}</span>
                  <span>{item.award}</span>
                </div>
            })}
          </div>
          <h4>Great Reviews</h4>
          <div className='matching black mt-3 fw-bold'>            
            <span>Participant</span>
            <span>Awards</span>
          </div>
          <div className='bg-warning'>            
            {participants.map((item, index)=>{
              return <div className='matching' key={index} >
                  <span>{item.name}</span>
                  <span>{item.award}</span>
                </div>
            })}
          </div>
        </div>
        
    </div>
      
)}

export default Leaderboards;
