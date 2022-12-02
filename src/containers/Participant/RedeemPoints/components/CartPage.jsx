import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Table,
  Button,
  Row,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import { ORDER_COLUMNS } from "./columns";
import { useTable } from "react-table";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";

import axios from "axios";
import CloseIcon from "mdi-react/CloseIcon";
import { emptyAuthCart } from "@/containers/App/auth";
import {
  useDispatch,
  sendFlashMessage,
  ApiErrorMessage,
} from "@/shared/components/flash";
import PointsOrigin from "../../../Layout/sidebar/PointsOrigin";
import TemplateButton from "@/shared/components/TemplateButton";

const API_STORAGE_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;

const CartPage = ({ cart, program, pointBalance, organization }) => {
  const flashDispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
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

  const prepareCart = (cartdata) => {
    // console.log(cartdata)
    if (cartdata?.items && cartdata.items.length > 0) {
      setCartIsEmpty(false);
    } else {
      setCartIsEmpty(true);
    }
    setCartObject(cartdata);
  };

  const columns = React.useMemo(() => ORDER_COLUMNS, []);
  const data = makeColumnData(cartObject);
  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  let navigate = useNavigate();

  //   console.log(data)
  return (
    <>
      <div className="cart">
        <Row>
          <Col md={3}>
            <PointsOrigin />
          </Col>
          <Col md={9} className="">
            <div className="origin-table mt-4">
              <strong>Shopping Cart</strong>
              <Table striped size="md" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {cartIsEmpty
                    ? "Your shopping cart is empty!"
                    : rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                  {cartObject ? (
                    <React.Fragment>
                      <tr>
                        <td colSpan={4}> {""}</td>
                        <td> {"Total:"}</td>
                        <td>
                          {cartObject.total_points?.toLocaleString()} Points
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4}> {""}</td>
                        <td> {"Balance After Purchase:	:"}</td>
                        <td>
                          {pointBalance.points - cartObject.total_points} Points
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </tbody>
              </Table>

              <div className="float-md-right">
                <TemplateButton
                  type="submit"
                  disabled={isLoading}
                  onClick={() => {
                    navigate("/participant/checkout");
                  }}
                  text="Checkout"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect((state) => ({
  cart: state.cart,
  program: state.program,
  pointBalance: state.pointBalance,
  organization: state.organization,
}))(CartPage);
