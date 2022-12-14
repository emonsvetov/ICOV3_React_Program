import React from "react";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import GiftCard from "./components/GiftCard";
import giftData from "./components/Mockdata.json";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-gift-codes.jpg`;

const MyGiftCodes = ({ template }) => {
  const { t, i18n } = useTranslation();
  const isOriginTheme = template?.type == "origin";
  const MyGiftCodesOrigin = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin />
          </Col>
          <Col md={7} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              {t("my_gift_codes")}
            </h3>
          </Col>
        </Row>
      </Container>
    );
  };

  const MyGiftCodesNew = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} />
          <div className="title text-dark">My Gift Codes</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                {giftData.map((item, index) => {
                  return <GiftCard key={index} data={item} />;
                })}
              </div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    (!isOriginTheme && <MyGiftCodesNew />) ||
    (isOriginTheme && <MyGiftCodesOrigin />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(MyGiftCodes);
