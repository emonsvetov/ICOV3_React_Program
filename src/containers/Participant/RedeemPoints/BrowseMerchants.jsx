import React from "react";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import Sidebar from "@/containers/Layout/sidebar";
import OurMerchants from "./components/BrowseMerchant";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-points.jpg`;

const BrowseMerchants = ({ template }) => {
  const { t } = useTranslation();
  

  const OriginBrowseMerchants = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="">
            <p className="fw-bold pb-3">{t("browse_merchant_desc")}</p>
            <OurMerchants />
          </Col>
        </Row>
      </Container>
    );
  };

  const NewBrowseMerchants = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} alt={"Redeem"} />
          <div className="title">{t("redeem_my_points")}</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <OurMerchants />
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
    (template?.name === "clear" && <OriginBrowseMerchants />) ||
    (template?.name === "classic" && <NewBrowseMerchants />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(BrowseMerchants);
