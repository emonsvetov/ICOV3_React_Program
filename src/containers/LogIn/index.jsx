import React, { useState } from "react";
import { connect } from "react-redux";
import { UncontrolledCarousel } from "reactstrap";
import HomeTopbar from "../Layout/topbar/Home";
import LoginPopup from "./components/LoginPopup";
// import Signup from './components/SignupPopup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { SliderOrigin } from "../Participant/Home/components/slider";
import LogInForm from "./components/LogInForm";
import { useTranslation } from "react-i18next";

const getSlideIcons = () => {
  let icons = [];
  for (let i = 1; i < 9; i++) {
    icons.push(`${process.env.PUBLIC_URL}/new/img/merchants/${i}.png`);
  }
  return icons;
};
const getOriginSlideImgs = (template) => {
  let imgs = [];
  let count = 4;
  if (template.slider_01 || template.slider_02 || template.slider_03){
    count = 3;
  }
  for (let i = 1; i <= count; i++) {
    let img_src = template[`slider_0${i}`]
        ? `${process.env.REACT_APP_API_STORAGE_URL}/`+template[`slider_0${i}`]
        : template.name === 'New' ? `${process.env.PUBLIC_URL}/new/img/slider/slider-02.jpg`
        : `${process.env.PUBLIC_URL}/original/img/slider/slider-0${i}.jpg`;
    imgs.push({
      src: img_src,
      altText: `Slide ${i}`,
    });
  }
  return imgs;
};

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

const LogIn = ({ template }) => {
  const { t } = useTranslation();
  const [showLoginPopup, setShowPopup] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const popupToggle = () => {
    setShowPopup((prevState) => !prevState);
  };
  const signupToggle = () => {
    setShowSignup((prevState) => !prevState);
  };

  if (!template) return t("loading");
  console.log(template, "------------------");

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
            items: 2,
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
            items: 2,
            partialVisibilityGutter: 30,
          },
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
        {slide_icons.map((item, key) => {
          return (
            <div key={key} className={`home-merchant-wrapper item-${key % 2}`}>
              <img alt={`slide-${key}`} src={item} />
            </div>
          );
        })}
      </Carousel>
    );
  };
  const items = [
    {
      src: template.slider_01
        ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.slider_01}`
        : `${process.env.PUBLIC_URL}/new/img/slider/slider-01.jpg`,
      altText: "Slide 1",
    },
    {
      src: template.slider_02
        ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.slider_02}`
        : `${process.env.PUBLIC_URL}/new/img/slider/slider-02.jpg`,
      altText: "Slide 2",
    },
    {
      src: template.slider_03
        ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.slider_03}`
        : `${process.env.PUBLIC_URL}/new/img/slider/slider-03.jpg`,
      altText: "Slide 3",
    },
  ];

  const items_origin = getOriginSlideImgs(template);

  let slide_icons = getSlideIcons();
  return (
    <div>
      <HomeTopbar
        onClickLogin={template?.name === 'New' ? toggle : popupToggle}
        onClickSignup={signupToggle}
      />
      <UncontrolledCarousel
        items={template ? items_origin : items}
        indicators={false}
        controls={false}
      />
      <div className="text-center mt-5 mb-5">
        <strong>
          {template?.welcome_message
            ? template.welcome_message.replace(/<\/?[^>]+(>|$)/g, "")
            : t("welcome_message")}
        </strong>
      </div>

      {(template && <SliderOrigin data={slide_icons} />) ||
        (!template && <CarouselNew />)}
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
    // domain: state.domain,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(LogIn);

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
