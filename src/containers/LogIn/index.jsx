import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UncontrolledCarousel } from 'reactstrap';
import HomeTopbar from '../Layout/topbar/Home';
import LoginPopup from './components/LoginPopup';

import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

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
const getSlideImg = () => {
  let imgs = [];
  for (let i = 1 ;  i< 9; i ++){
    imgs.push(`/img/merchants/${i}.png`);
  }
  return imgs;
}


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const LogIn = ({template}) => {
  const [showLoginPopup, setShowPopup ] = useState(false);
  const popupToggle = () => {
    setShowPopup(prevState => !prevState);
  };
  let slide_imgs = getSlideImg();
  return <div>
    <HomeTopbar onClickHandle = {popupToggle}/>
    <UncontrolledCarousel items={items} indicators={false} controls={false}/>
    <div className='text-center mt-4 mb-5'>
      <h5>{template?.welcome_message ? template.welcome_message.replace(/<\/?[^>]+(>|$)/g, "") : `Welcome to INCENTCO's Global Solutions rewards site! When you participate in our program, you'll earn rewards for various activities.` }</h5>
    </div>
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={{
        desktop: {
            breakpoint: {
            max: 3000,
            min: 1024
            },
            items: 2,
            partialVisibilityGutter: 100
        },
        mobile: {
            breakpoint: {
            max: 464,
            min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: {
            max: 1024,
            min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
        }
        }}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {slide_imgs.map((item, key )=> {
                    return <div key={key} className={`home-merchant-wrapper item-${key % 2}`}>
                            <img  src={item}/>
                        </div>
                    }
                )}
    </Carousel>;

    {showLoginPopup && <LoginPopup onCancelHandler={popupToggle}/>}
  </div>
};

const mapStateToProps = (state) => {
  return {
      // domain: state.domain,
      template: state.domain?.program?.template
  };
};

export default connect(mapStateToProps)(LogIn);

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
