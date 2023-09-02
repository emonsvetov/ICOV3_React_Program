import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import GiftCard from "../components/themed/GiftCardClassic";
import Sidebar from "@/containers/Layout/sidebar";

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-gift-codes.jpg`;

const MyGiftCodesClassic = ({giftCodes}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mainboard">
        <img src={IMG_BACK} alt="gift_codes_img" />
        <div className="title text-dark">{t("my_gift_codes")}</div>
      </div>
      <Container>
        <ParticipantTabNavs />
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              {giftCodes ? giftCodes.map((item, index) => {
                  // return <Themed component="GiftCard" {...{key:index, data:item}} />
                  return <GiftCard key={index} data={item} />;
                }) :
                <p className="text-center">{t("no_gift_codes")}</p>
              }
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

export default MyGiftCodesClassic