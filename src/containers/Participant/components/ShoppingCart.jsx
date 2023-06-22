import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  
  UncontrolledPopover,
  
} from "reactstrap";
import CartIcon from "mdi-react/CartIcon";


import CartBody from "./CartBody";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({ cart }) => {
  const { t } = useTranslation();
  const [points, setPoints] = useState(0);
  

  useEffect(() => {
    let amount = 0;
    cart.forEach((item) => (amount += item.gift.price * item.quantity));
    setPoints(amount);
  }, [cart]);

  return (
    <>
      <span className="cursor-pointer" id="PopoverFocus">
        <CartIcon className="redtext" />
        <strong>{t("cart")}</strong>
      </span>
      <span className="mx-3">
        {points} {t("points")}
      </span>
      <UncontrolledPopover
        placement="bottom"
        target="PopoverFocus"
        trigger="legacy"
        className="cart"
      >
        <CartBody />
      </UncontrolledPopover>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(ShoppingCart);
