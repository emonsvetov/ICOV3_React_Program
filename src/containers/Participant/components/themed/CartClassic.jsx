import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  UncontrolledPopover,
  PopoverBody,
  Popover,
  Container,
} from "reactstrap";
import CartIcon from "mdi-react/CartIcon";
import CloseIcon from "mdi-react/CloseIcon";
import CartItem from "../CartItem";
import TemplateButton from "@/shared/components/TemplateButton";
import { isEmpty } from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const CartClassic = ({ cart, pointBalance }) => {
  const [isOpen, setIsOpen] = useState();
  const { t } = useTranslation();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  let navigate = useNavigate();

  if (!cart || !pointBalance) return t("loading_cart");

  const isEmptyCart = isEmpty(cart) || cart.items.length <= 0;

  return (
    <div className="cart-classic cart-popover">
      <span className="cursor-pointer" id="PopoverFocus">
        <CartIcon className="redtext" />
        <strong>{t("cart")}</strong>
      </span>
      <span className="mx-3">
        {cart?.total_points ? cart.total_points : 0} {t("points")}
      </span>
      <Popover
        toggle={toggle}
        isOpen={isOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        placement="bottom"
        target="PopoverFocus"
        // trigger="legacy"
        className="cart"
      >
        <PopoverBody>
          <div className="d-flex justify-content-end">
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </div>
          {isEmptyCart && <span>{t("cart_empty")}</span>}
          {!isEmptyCart &&
            cart?.items?.map((item, index) => {
              return (
                <CartItem key={`cartitem-${index}`} index={index} item={item} />
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
                  <TemplateButton
                    type="submit"
                    onClick={() => {
                      navigate("/participant/checkout");
                    }}
                    text={t("checkout")}
                  />
                </Col>
              </Row>
            </>
          )}
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default connect((state) => ({
  cart: state.cart,
  pointBalance: state.pointBalance,
  program: state.program,
}))(CartClassic);
