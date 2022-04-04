import React, { useState } from 'react';
import LogInForm from './components/LogInForm';
import { UncontrolledCarousel } from 'reactstrap';
import HomeTopbar from '../Layout/topbar/Home';
import { useStore } from 'react-redux';
import LoginPopup from './components/LoginPopup';

const IncentcoLogo = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

const items = [
  {
    src: '/img/slider/slider-01.jpg',
    altText: 'Slide 1',
  },
  {
    src: '/img/slider/slider-02.jpg',
    altText: 'Slide 2',
    
  },
  {
    src: '/img/slider/slider-03.jpg',
    altText: 'Slide 3',
    
  }
];

const LogIn = () => {
  const [showLoginPopup, setShowPopup ] = useState(false);
  const popupToggle = () => {
    setShowPopup(prevState => !prevState);
  };
  return <div>
    <HomeTopbar onClickHandle = {popupToggle}/>
    <UncontrolledCarousel items={items} indicators={false} controls={false}/>
    <div className='text-center mt-4'>
      <h5>Welcome to INCENTCO's Global Solutions rewards site! When you participate in our program, you'll earn rewards for various activities.</h5>
    </div>
    {showLoginPopup && <LoginPopup onCancelHandler={popupToggle}/>}
  </div>
};

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
