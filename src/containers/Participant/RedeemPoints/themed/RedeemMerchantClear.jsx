import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";

import Points from "@/containers/Layout/sidebar/Points";
import Redeem from "../components/Redeem";
import MerchantSlider  from "@/containers/Participant/Home/components/slider/MerchantSlider";

const RedeemMerchantClear = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={3}>
          <Points />
        </Col>
        <Col md={9} className="">
          <Redeem />
        </Col>
      </Row>
      <div className="mt-5">
        <h6 className="m-3">
          {t("select_a_merchant_to_redeem_your_points")}
        </h6>
        <MerchantSlider />
      </div>
    </Container>
  );
};

export default RedeemMerchantClear