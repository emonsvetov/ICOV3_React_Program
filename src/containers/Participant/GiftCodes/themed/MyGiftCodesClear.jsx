import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/containers/Layout/sidebar";
import GiftCard from "../components/themed/GiftCardClear";

const MyGiftCodesClear = ({giftCodes}) => {
  const { t } = useTranslation();
  return (
    <Container fluid>
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="">
          <h3 className="pt-1" style={{ fontSize: "16px" }}>
            {" "}
            {t("my_gift_codes")}
          </h3>
          <div className="dashboard">
            {giftCodes ? giftCodes.map((item, index) => {
              return <GiftCard key={index} data={item} />;
            }) :
              <p className="text-center">{t("no_gift_codes")}</p>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyGiftCodesClear