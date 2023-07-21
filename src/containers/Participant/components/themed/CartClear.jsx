import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import CartItemOrigin from "../CartItemOrigin";
import { isEmpty } from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const CartClear = ({ cart, pointBalance }) => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  if (!cart || !pointBalance) return t("loading_cart");
  // console.log(cart)
  // console.log(isEmpty(cart))
  const isEmptyCart = isEmpty(cart) || cart.items.length <= 0;
  // return 'Here'
  return (
    <div id="cart_menu" className="s_nav ">
      <Link to={"/participant/cart"}>
        <span className="s_icon"></span>
        <small className="s_text">{t("cart")}</small>
        <span className="s_grand_total s_main_color">
          {cart?.total_points ? cart.total_points : 0} {t("points")}
        </span>
      </Link>
      <div className="s_submenu s_cart_holder">
        {isEmptyCart && <div className="empty">{t("cart_empty")}</div>}
        {!isEmptyCart &&
          cart?.items?.map((item, index) => {
            return (
              <CartItemOrigin
                key={`cartitem-${index}`}
                index={index}
                item={item}
              />
            );
          })}
        {!isEmptyCart && (
          <>
            <hr />
            <Row>
              <Col md={9} className="d-flex justify-content-center mb-3">
                <strong>{t("total")}:</strong>
              </Col>
              <Col md={3}>
                <span>
                  {cart.total_points} {t("points")}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Button
                  className="btn btn-primary w-100 red"
                  onClick={() => {}}
                >
                  {t("view_cart")}
                </Button>
              </Col>
              <Col md="6">
                <Button
                  className="btn btn-primary w-100 red"
                  onClick={() => {
                    navigate("/participant/checkout");
                  }}
                >
                  {t("checkout")}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default connect((state) => ({
  cart: state.cart,
  pointBalance: state.pointBalance,
  program: state.program,
}))(CartClear);
