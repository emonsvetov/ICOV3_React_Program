import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Button, Row } from "reactstrap";
import Select from "react-select";
import store from "../../../App/store";
import { setCart } from "@/redux/actions/cartActions";
import { connect } from "react-redux";
import { getMerchant } from "@/services/program/getMerchant";
import { getMerchantRedeemable } from "@/services/program/getMerchantRedeemable";
import { getAuthCart, updateAuthCart } from "@/containers/App/auth";
import Cart from "@/containers/Participant/components/Cart";
import TemplateButton from "@/shared/components/TemplateButton";

const makeOption = (i, giftcode, factor_valuation) => {
  return {
    label: `$${parseFloat(giftcode.redemption_value, 3).toFixed(
      2
    )} Gift Code = ${giftcode.redemption_value * factor_valuation}`,
    value: i++,
  };
};

const Redeem = ({ organization, program, cart, pointBalance }) => {
  let { merchantId } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [giftcodes, setGiftcodes] = useState([]);
  const [loadingGiftcodes, setLoadingGiftcodes] = useState(true);
  const [selectedGiftcode, setSelectedGiftcode] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (organization && program && merchantId) {
      // console.log('Loading merchant')
      getMerchant(organization.id, program.id, merchantId).then((payload) => {
        setMerchant(payload);
      });
    }
  }, [organization, program, merchantId]);

  useEffect(() => {
    if (organization && program && merchantId) {
      // console.log('Loading merchant')
      getMerchantRedeemable(organization.id, program.id, merchantId).then(
        (payload) => {
          // console.log(payload)
          if (payload?.data?.length > 0) {
            setGiftcodes(payload.data);
            setLoadingGiftcodes(false);
          }
        }
      );
    }
  }, [organization, program, merchantId]);

  useEffect(() => {
    if (addedToCart) {
      let tmp = setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  }, [addedToCart]);

  useEffect(() => {
    if (organization && program && merchantId) {
      // console.log('Loading merchant')
      getMerchantRedeemable(organization.id, program.id, merchantId).then(
        (payload) => {
          // console.log(payload)
          if (payload?.data?.length > 0) {
            setGiftcodes(payload.data);
            setLoadingGiftcodes(false);
          }
        }
      );
    }
  }, [organization, program, merchantId]);

  const onChangeGiftcode = (value) => {
    // alert(JSON.stringify(value))
    setSelectedGiftcode(value);
  };
  const onClickAddToCart = () => {
    const selectedIndex = selectedGiftcode.value;
    const item = giftcodes[selectedIndex];
    item.merchant_name = merchant.name;
    item.merchant_icon = merchant.icon;
    let redemption_points = item.redemption_value * program.factor_valuation;
    if (pointBalance.points <= redemption_points) {
      alert("You do not have sufficient balance to redeem");
      return;
    }
    // console.log(item)
    AddToCart(item);
  };
  const AddToCart = (itemcart) => {
    let datacart = getAuthCart();
    let addPoints = 0;
    let $addTotal = 0;
    let addNew = true;
    let redemption_points =
      itemcart.redemption_value * program.factor_valuation;
    if (datacart) {
      if (datacart.total_points + redemption_points > pointBalance.points) {
        alert("You do not have sufficient balance to add this giftcode");
        return;
      }
      if (datacart.items.length > 0) {
        for (let i in datacart.items) {
          let item = datacart.items[i];
          if (
            item.merchant_id === itemcart.merchant_id &&
            item.sku_value === itemcart.sku_value &&
            item.redemption_value === itemcart.redemption_value
          ) {
            item.qty += 1;
            addPoints = parseInt(
              item.redemption_value * program.factor_valuation
            );
            $addTotal = parseFloat(item.redemption_value);
            addNew = false;
          }
        }
      }
    } else {
      datacart = {
        items: [],
        total_dollar: 0,
        total_points: 0,
      };
    }
    if (addNew) {
      addPoints = parseInt(
        itemcart.redemption_value * program.factor_valuation
      );
      $addTotal = parseFloat(itemcart.redemption_value);
      itemcart.qty = 1;
      datacart.items.push(itemcart);
    }
    datacart.total_points += addPoints;
    datacart.total_dollar += $addTotal;
    if (updateAuthCart(datacart)) {
      store.dispatch(setCart(datacart));
      setAddedToCart(true);
    }
  };

  const Merchant = () => {
    if (!merchant) return "Loading merchant...";
    // console.log(merchant)
    const LOGO_PUBLIC_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;
    let giftcodeOptions = [];
    if (giftcodes.length > 0) {
      giftcodeOptions = giftcodes.map((gc, i) => {
        return makeOption(i, gc, program.factor_valuation);
      });
    }
    // console.log(selectedGiftcode)
    // console.log(giftcodeOptions)
    return (
      <>
        <Row className="get-giftcode mt-3">
          <Col md={2}>
            <img src={`${LOGO_PUBLIC_URL}/${merchant.logo}`} />
          </Col>
          <Col md={10}>
            <h4>{merchant.name}</h4>
            <div className="desc">{merchant.description}</div>
            <div className="mt-3">
              <a href={`${merchant.website}`}></a>Visit Merchant Website
            </div>
            <div className="my-3 w-50">
              {loadingGiftcodes && "Loading..."}
              <Select
                options={giftcodeOptions}
                clearable={false}
                className="react-select"
                placeholder={" --- "}
                classNamePrefix="react-select"
                value={selectedGiftcode}
                onChange={onChangeGiftcode}
              />
            </div>
            <div className="w-50 direction-col">
              <TemplateButton
                type="submit"
                disabled={!selectedGiftcode}
                onClick={() => onClickAddToCart()}
                text="Add to Cart"
              />
              {/* <Button disabled={!selectedGiftcode} className='btn btn-primary red' onClick={() => onClickAddToCart()}>Add to Cart</Button> */}
              {addedToCart && (
                <span style={{ marginLeft: 5, fontSize: 13 }}>
                  Added to cart!
                </span>
              )}
            </div>
          </Col>
        </Row>
        <Row className="redemption-instructions mt-5">
          <h3>Redemptions Instructions</h3>
          <div className="redtext my-3">
            After redeeming your gift code, you will be asked for a challenge
            key. The challenge key is the pin number listed to the right of your
            gift card link. You may need to type this number in, instead of copy
            and pasting.
          </div>
          <div>{merchant.redemption_instruction}</div>
        </Row>
      </>
    );
  };

  return (
    <>
      <div className="redeem">
        <Row>
          <Col md={4}>
            <h3>Get Your Gift Code</h3>
          </Col>
          {/* <Col md={8} className="d-flex justify-content-end">
            <Cart />
          </Col> */}
        </Row>
        <Merchant />
      </div>
    </>
  );
};

export default connect((state) => ({
  cart: state.cart,
  organization: state.organization,
  pointBalance: state.pointBalance,
  program: state.program,
}))(Redeem);
