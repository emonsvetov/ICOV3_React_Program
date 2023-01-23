import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { onClickRemoveItem } from "@/services/cart/removeItem";
import { useTranslation } from "react-i18next";

const CartItemOrigin = ({ index, item, program }) => {
  const { t } = useTranslation();
  const giftCode = `$${parseFloat(item.redemption_value, 3).toFixed(
    2
  )} Gift Code`;
  const redemptionPoints =
    item.redemption_value * program.factor_valuation * item.qty;
  const merchant_icon_src = `${process.env.REACT_APP_API_STORAGE_URL}/${item.merchant_icon}`;
  return (
    <Row className="cart-item mb-3">
      <Col md={2}>
        <img src={merchant_icon_src} alt="merchant" />
      </Col>
      <Col md={4} className="flex-column">
        <div>
          <strong>{item.merchant_name}</strong>
        </div>
        <span>{giftCode}</span>
      </Col>
      <Col md={1}>
        <span>{`x ${item.qty}`}</span>
      </Col>
      <Col md={2}>
        <span>
          {redemptionPoints}
          {t("points")}
        </span>
      </Col>
      <Col md={1}>
        <span
          onClick={() => onClickRemoveItem(index, program.factor_valuation)}
          style={{ color: "red", fontSize: 11, fontWeight: 700 }}
        >
          X
        </span>
      </Col>
    </Row>
  );
};
export default connect((state) => ({
  program: state.program,
}))(CartItemOrigin);
