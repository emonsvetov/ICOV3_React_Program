import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";

import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import Sidebar from "@/containers/Layout/sidebar";
import Redeem from "../components/Redeem";
import {Img} from '@/theme'

const RedeemMerchantClassic = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mainboard">
        <Img src={'img/pages/my-points.jpg'} />
        <div className="title">{t("redeem_my_points")}</div>
      </div>
      <Container>
        <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <Redeem />
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
export default RedeemMerchantClassic