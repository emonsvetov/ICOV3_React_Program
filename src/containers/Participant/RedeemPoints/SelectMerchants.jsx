import React from "react";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import Sidebar from "../../Layout/sidebar";
import SelectMerchantType from "./components/SelectMerchantType";
import { useTranslation } from "react-i18next";
const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-points.jpg`;

export const SelectMerchants = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mainboard">
        <img src={IMG_BACK} alt="img" />
        <div className="title">{t("redeem_my_points")}</div>
      </div>
      <Container>
        <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <SelectMerchantType />
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
