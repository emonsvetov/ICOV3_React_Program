import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Col, Container, Form, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Sidebar from "../../Layout/sidebar";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "./components/steps";
import "swiper/css";
import { useTranslation } from "react-i18next";
import {useDispatch, flashError, flashSuccess} from "@/shared/components/flash"
import { connect } from "react-redux";
import axios from "axios";
import { isEmpty } from "@/shared/helpers";

const Feeling = ({ auth, program, organization }) => {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({
    feeling: "",
    first_name: "",
    last_name: "",
    email: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    how_feeling_today: "",
    first_name: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch()
  const steps = [ 'how_feeling_today', 'name', 'email', 'let_us_know' ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    swiper?.on("slideChange", function (e) {
      setCurrentIndex(e.activeIndex);
    });
  }, [swiper]);

  const handleSwitchSlide = (index) =>{
    setErrors(errors)
    swiper.slideTo(index);
  }

  const handleSubmit = () => {
    let url = `/organization/${program.organization_id}/program/${program.id}/feeling-survey`
    let method = 'post'
    setLoading(true)

    console.log("data : last step", data);
    if( isEmpty(errors)){
      return
    }
    axios({ url, method, data })
    .then((res) => {
      //   console.log(res)
      if (res.status == 200) {
        flashSuccess(dispatch, t('submission_received'))
        setLoading(false)
        setSubmitted(true)
      }
    })
    .catch((err) => {
      //console.log(error.response.data);
      flashError(dispatch, err.response.data)
      setLoading(false)
    });
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={3}>
          <Sidebar />
        </Col>

        <Col md={9}>
          {submitted && 
          <div className="text-center mt-5">
            <h2>{t('thank_you')}</h2>
            {t('submission_received')}
          </div>}
          {!submitted && 
          <div className="feeling">
            <div className="d-flex justify-content-center align-items-center h-100 ">
              <Swiper
                effect={"slide"}
                spaceBetween={50}
                speed={1000}
                draggable={false}
                slidesPerView={1}
                onSwiper={(swiper) => setSwiper(swiper)}
                allowTouchMove={false}
                className="mySwiper "
                // onSlideChangeTransitionEnd={(e) =>
                //   setTimeout(() => {
                //     e.el.classList.remove("animate");
                //   }, [300])
                // }
                // onBeforeTransitionStart={(e) => {
                //   e.el.classList.add("animate");
                // }}
                // onNex
              >
                <SwiperSlide className="	">
                  <FirstStep data={data} setData={setData} errors={errors} setErrors={setErrors} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide className="	">
                  <SecondStep data={data} setData={setData} errors={errors} setErrors={setErrors} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <ThirdStep data={data} setData={setData} errors={errors} setErrors={setErrors} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <FourthStep data={data} setData={setData} onSubmit={handleSubmit} errors={errors} setErrors={setErrors} swiper={swiper} loading={loading} />
                </SwiperSlide>
              </Swiper>
            </div>
            <div
              style={{ bottom: 80, zIndex: 10 }}
              className="  position-sticky "
            >
              {/* <img src="/hori-line.svg" className="mx-auto" /> */}
              <div
                style={{ maxWidth: 640, height: 2, backgroundColor: "#eee" }}
                className="w-full  mx-auto  bg-gray-400"
              />
              <div
                style={{
                  maxWidth: 640,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100%",
                }}
                className="d-flex gap-4 align-items-center justify-content-between w-full position-absolute "
              >
                <ReactTooltip place="top" type="dark" effect="float" />
                {steps.map((item, index)=>
                  <div
                    data-tip={`${index + 1}. ${t(item)}`}
                    onClick={ () => handleSwitchSlide(index)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == index ? "bg-primary scale-150" : errors[item] ? "bg-danger" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />          
                )}
                
              </div>
            </div>
          </div>
          }
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Feeling);
