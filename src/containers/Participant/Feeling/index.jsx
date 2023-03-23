import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Col, Container, Row } from "reactstrap";
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

const Feeling = () => {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({
    feeling: "",
    firstName: "",
    lastName: "",
    email: "",
    msg: "",
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
          <Sidebar />
        </Col>

        <Col md={9}>
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
                <div
                  data-tip={`1. ${t("how_feeling_today")}`}
                  onClick={() => swiper.slideTo(0)}
                  style={{
                    height: 20,
                    width: 20,
                    border: "1px solid white",
                  }}
                  className={`${
                    currentIndex == 0 ? "bg-primary scale-150" : "bg-success"
                  }   rounded-circle  cursor-pointer`}
                />
                <div
                  data-tip={`2. ${t("name")}`}
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
                  data-tip={`3. ${t("email")}`}
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
                  data-tip={`4. ${t("let_us_know")}`}
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
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Feeling;
