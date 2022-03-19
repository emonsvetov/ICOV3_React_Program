import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import { numFormatter } from '../../../utils/helper';
const Ava = `img/avatar/avatar.jpg`;

const leaders =[
    {name: 'Elizabeth', 'award': 65522},
    {name: 'Jay', 'award': 99500},
    {name: 'Robert', 'award': 52226}
]
const Chart = (props) => {
    const {name, award} = props.data;
    const {index} = props;
    return (
      <div className={`chart-item index-${index}`}>
          <img className='chart-avatar' src={Ava}></img>
          <strong className='text-center'>{name}</strong>
          <strong className='text-center'>{numFormatter(award)}</strong>
      </div>
        
)}

const Leaderboard = () => {
  return (
    <div className='leaderboard pt-4'>
        <h5 className='text-center'>Team Leaderboard</h5>
        <div className='charts pt-5'>
            {leaders.map((item, index) =>{
                return <Chart key={index} data={item} index ={index} />
            })}
        </div>
    </div>
      
)}

export default Leaderboard;