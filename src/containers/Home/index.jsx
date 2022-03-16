import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import RewardsPanel from './components/RewardsPanel';

const Home = () => {
  return (
    <div className="dashboard">
      <div className='welcome'>
        <h1> Welcome back Jay! </h1>
        <div className='description'>
          Congratulations on earning rewards! Redeem your rewards when you earn them or save them for a "rainy day".
        </div>  
      </div>

      <RewardsPanel />
      
    </div>
)}

export default Home;
