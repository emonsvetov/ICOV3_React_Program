import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Col, Container, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { SidebarOrigin } from "../../Layout/sidebar";
import {
  VeryFirstStep,
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep,
  SeventhStep,
} from "./components/steps";
import "swiper/css";

const Survey = () => {
  const [swiper, setSwiper] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    feeling: 1,
    recommend: 1,
    satisfication: 2,
    suggestion: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    swiper?.on("slideChange", function (e) {
      setCurrentIndex(e.activeIndex);
    });
  }, [swiper]);

  return (
    <>
      <Row className="mt-4">
        <Col md={3}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>

        <Col md={9}>
          <div className="survey">
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
                  <VeryFirstStep swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide className="	">
                  <FirstStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide className="	">
                  <SecondStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <ThirdStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <FourthStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide className="	">
                  <FifthStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <SixthStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
                <SwiperSlide>
                  <SeventhStep data={data} setData={setData} swiper={swiper} />
                </SwiperSlide>
              </Swiper>
            </div>
            {currentIndex > 0 && (
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
                  <div
                    data-tip="1. Full Name"
                    onClick={() => swiper.slideTo(1)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 1 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="2. E-mail Address"
                    onClick={() => swiper.slideTo(2)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 2 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="3. Do you feel your workplace is engaging?"
                    onClick={() => swiper.slideTo(3)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 3 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="4. Would you recommend our company to a friend?"
                    onClick={() => swiper.slideTo(4)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 4 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="5. How satisfied are you with our company overall?"
                    onClick={() => swiper.slideTo(5)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 5 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="6. Do you have any suggestions how we can improve your employment
                  experience?"
                    onClick={() => swiper.slideTo(6)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 6 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                  <div
                    data-tip="7. Thank you"
                    onClick={() => swiper.slideTo(7)}
                    style={{
                      height: 20,
                      width: 20,
                      border: "1px solid white",
                    }}
                    className={`${
                      currentIndex == 7 ? "bg-primary scale-150" : "bg-success"
                    }   rounded-circle  cursor-pointer`}
                  />
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Survey;
