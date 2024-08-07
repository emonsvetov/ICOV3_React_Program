import React, { useEffect, useState } from "react";
import { Col, Table, Row } from "reactstrap";
import { CART_COLUMNS } from "./columns";
import { useTable } from "react-table";
import { connect } from "react-redux";
import axios from "axios";
import { emptyAuthCart } from "@/containers/App/auth";
import { setPointBalance } from '@/redux/actions/balanceActions';
import { clearCart } from '@/redux/actions/cartActions';
import {
  useDispatch,
  sendFlashMessage,
  ApiErrorMessage,
} from "@/shared/components/flash";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";
import {CheckoutComplete} from "@/containers/Participant/RedeemPoints/components/CheckoutComplete";
import { getAuthPoints } from "@/containers/App/auth";

const API_STORAGE_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;

const CheckoutPage = ({ cart, program, pointBalance, organization, template, dispatch }) => {
  const { t } = useTranslation();
  const flashDispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [giftCodesRedeemed, setGiftCodesRedeemed] = useState([]);
  const [checkoutIsComplete, setShowCompleteCheckout] = useState(false);
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const [cartObject, setCartObject] = useState({
    items: [],
    total_points: 0,
    total_dollar: 0,
  });
  const makeColumnData = (cart) => {
    // console.log(cart)
    if (!cart?.items) return [];
    let tableData = [];
    cart.items.forEach((item) => {
      let obj = {};
      obj.logo = `${API_STORAGE_URL}/${item.merchant_icon}`;
      obj.name = item.merchant_name;
      obj.giftCode = `$${parseFloat(item.redemption_value, 3).toFixed(
        2
      )} Gift Code = ${item.redemption_value * program.factor_valuation}`;
      obj.quantity = item.qty;
      obj.price = item.redemption_value * program.factor_valuation;
      obj.total = item.redemption_value * program.factor_valuation * item.qty;
      tableData.push(obj);
    });
    return tableData;
  };

  useEffect(() => {
    // console.log(cart)
    if (cart) {
      prepareCart(cart);
    }
  }, [cart]);

  const confirmOrder = () => {
    // console.log(cartObject)
    setLoading(true);
    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/checkout`,
        cartObject
      )
      .then((res) => {
        console.log('res', res);
        if (res.status === 200) {
          if (res.data?.success) {
            emptyAuthCart();
            setGiftCodesRedeemed(res.data.gift_codes_redeemed_for);
            setShowCompleteCheckout(true);


            getAuthPoints().then((updatedBalance) => {
              dispatch(setPointBalance(updatedBalance));
            });
            dispatch(clearCart());
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        // console.log(error.response.data)
        flashDispatch(
          sendFlashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setLoading(false);
      });
  };

  const prepareCart = (cartdata) => {
    // console.log(cartdata)
    if (cartdata?.items && cartdata.items.length > 0) {
      setCartIsEmpty(false);
    } else {
      setCartIsEmpty(true);
    }
    setCartObject(cartdata);
  };

  const columns = React.useMemo(() => CART_COLUMNS, []);
  const data = makeColumnData(cartObject);
  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });


  if (cartIsEmpty && !checkoutIsComplete) return t("cart_empty");
  //   console.log(data)
  return (
    <>
      {checkoutIsComplete && <CheckoutComplete template={template} giftCodesRedeemed={giftCodesRedeemed}  />}
      {!checkoutIsComplete &&
      <div className="checkout">
        {/* <Row>
            <Col md={8}>
              <h3>Checkout: Confirm Your Order</h3>
            </Col>
            <Col md={4} className="d-flex justify-content-end">
              <span className="cursor-pointer" id="PopoverFocus">
                <CartIcon className="redtext" />
                <strong>Cart</strong>
              </span>
              <span className="mx-3">{cartObject.total_points} Points</span>
              <UncontrolledPopover
                placement="bottom"
                target="PopoverFocus"
                trigger="legacy"
                className="cart"
              >
                <PopoverBody>
                  <div className="d-flex justify-content-end">
                    <CloseIcon className="cursor-pointer" />
                  </div>
                  {cartObject?.items?.map((item, index) => {
                    return (
                      <CartItem
                        key={`checkout-cartitem-${index}`}
                        index={index}
                        item={item}
                      />
                    );
                  })}
                  <hr />
                  <Row>
                    <Col md={9} className="d-flex justify-content-center mb-3">
                      <strong>Total:</strong>
                    </Col>
                    <Col md={3}>
                      <span>{cartObject.total_points} Points</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Button
                        className="btn btn-primary w-100 red"
                        onClick={() => {}}
                      >
                        View Cart
                      </Button>
                    </Col>
                    <Col md="6">
                      <TemplateButton
                        type="submit"
                        onClick={() => {
                          navigate("/participant/checkout");
                        }}
                        text="Checkout"
                      />
                    </Col>
                  </Row>
                </PopoverBody>
              </UncontrolledPopover>
            </Col>
          </Row> */}
        <div>
          <h3>
            {t("checkout")}: {t("confirm_your_order")}
          </h3>
          <span>
              {t("order_desc_1")}{" "}
            <strong>
                {cartObject.total_points} {t("points")}
              </strong>{" "}
            {t("order_desc_2")}
            </span>
        </div>
        <div className="redtext text-center text-decoration-underline">
          <strong>{t("order_desc_3")}</strong>
        </div>
        <div className="points-detail-table mt-4">
          {t("order_desc_4")}
          <Table striped borderless size="md" {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        { t(column.Header) }
                      </th>
                  ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
              );
            })}
            </tbody>
          </Table>
        </div>

        <Row className="my-4">
          <Col md={9} className="d-flex justify-content-end">
            {t("total")}:
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            {cartObject.total_points.toLocaleString()} {t("points")}
          </Col>
        </Row>
        <Row>
          <Col md={9} className="d-flex justify-content-end">
            {t("balance_after_purchase")}:
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            { pointBalance.pointBalance - cartObject.total_points } {t("points")}
          </Col>
        </Row>
        <div className="d-flex justify-content-end my-4">
          <TemplateButton
              type="submit"
              disabled={isLoading}
              spinner={isLoading}
              onClick={confirmOrder}
              text={t("confirm_my_order")}
          />
          {/* <Button disabled={isLoading} className="btn btn-primary red "  onClick={confirmOrder}>Confirm My Order</Button> */}
        </div>
      </div>
      }
    </>
  );
};

const mapStateToProps = (state) => {

  return {
    cart: state.cart,
    program: state.program,
    pointBalance: state.pointBalance,
    organization: state.organization,
    template: state.template,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);