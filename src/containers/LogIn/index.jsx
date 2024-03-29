import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { UncontrolledCarousel } from "reactstrap";
import HomeTopbar from "../Layout/topbar/Home";
import LoginPopup from "./components/LoginPopup";
// import Signup from './components/SignupPopup';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { SliderClear, getSliderImgs, getMerchantLogos } from "../Participant/Home/components/slider";
import MerchantSlider from "../Participant/Home/components/slider/MerchantSlider";
import LogInForm from "./components/LogInForm";
import { useTranslation } from "react-i18next";
import {useSearchParams} from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const LogIn = ({ template, program }) => {
  const { t } = useTranslation();
  const [showLoginPopup, setShowPopup] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [searchParams] = useSearchParams();
  const [ssoToken, setSsoToken] = useState(searchParams.get('sso-token') || null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const popupToggle = () => {
    setShowPopup((prevState) => !prevState);
  };
  const signupToggle = () => {
    setShowSignup((prevState) => !prevState);
  };
    useEffect(()=>{
        if (ssoToken !== null && ssoToken !== undefined){
            setModal(true);
        }
    },[ssoToken])

  useEffect(()=>{
    if (ssoToken !== null && ssoToken !== undefined){
      setModal(true);
    }
  },[ssoToken])

  if (!template) return t("loading");
  // console.log(template, "------------------");

  const welcome_message  = {__html: template?.welcome_message
    ? template.welcome_message : t("welcome_message")}

  const CarouselNew = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 100,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={getSliderImgs(template).length > 1}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        arrows={false}
        transitionDuration={5000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {getSliderImgs(template).map((item, key) => {
          return (
            <div key={key} className="d-flex align-items-center justify-content-center caresoul-item w-100">
              <img alt={`slide-${key}`} src={item.src} className="w-100"/>
            </div>
          );
        })}
      </Carousel>
    );
  };

  let slide_icons = getMerchantLogos();
  return (
    <div>
      <HomeTopbar
        onClickLogin={template?.name === 'New' ? toggle : popupToggle}
        onClickSignup={signupToggle}
      />

      <CarouselNew/>
      <div className="text-center mt-5 mb-5" dangerouslySetInnerHTML={welcome_message}></div>

      <MerchantSlider program={program}  />
      
      {showLoginPopup && <LoginPopup onCancelHandler={popupToggle} />}
      {/* {showSignup && <Signup onCancelHandler={signupToggle} />} */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {t("sign-in-to-your-rewards-program")}
        </ModalHeader>
        <ModalBody>
          <LogInForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.domain?.program,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(LogIn);

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
