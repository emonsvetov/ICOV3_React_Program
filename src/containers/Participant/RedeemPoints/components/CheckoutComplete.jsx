import React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import GiftCardClassic from "@/containers/Participant/GiftCodes/components/themed/GiftCardClassic";
import GiftCardClear from "@/containers/Participant/GiftCodes/components/themed/GiftCardClear";

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-points.jpg`;

export const CheckoutComplete = ({ template, giftCodesRedeemed }) => {
  const { t } = useTranslation();

  const OriginCheckout = () => {
    return (
      <Container fluid>
        <h3>
            {t("checkout")}: {t("your_order_completed")}
        </h3>
        <div>
            {t("order_completed_desc_1")}
            {t("order_completed_desc_2")}
        </div>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={9}>
            <div className="dashboard">
              {giftCodesRedeemed && giftCodesRedeemed.map((item, index) => {
                  // return <Themed component="GiftCard" {...{key:index, data:item}} />
                  return <GiftCardClear key={index} data={item} />;
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  const NewCheckout = () => {
    return (
     <Container fluid>
        <h3>
            {t("checkout")}: {t("your_order_completed")}
        </h3>
        <div>
            {t("order_completed_desc_1")}
            {t("order_completed_desc_2")}
        </div>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={9}>
            <div className="dashboard">
              {giftCodesRedeemed && giftCodesRedeemed.map((item, index) => {
                  // return <Themed component="GiftCard" {...{key:index, data:item}} />
                  return <GiftCardClassic key={index} data={item} />;
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    (template?.name === "clear" && <OriginCheckout />) ||
    (template?.name === "classic" && <NewCheckout />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(CheckoutComplete);
