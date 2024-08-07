import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Table } from "reactstrap";
import { CART_COLUMNS } from "./columns";
import { useTable } from "react-table";
import { connect } from "react-redux";

import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const API_STORAGE_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;

const CartPage = ({ cart, program, pointBalance, template }) => {
  const { t } = useTranslation();
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
      )} ${t('gift_code')} = ${item.redemption_value * program.factor_valuation}`;
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

  const columns = React.useMemo(() => CART_COLUMNS, []);
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
        <div className={`${template.name}-table mt-4`}>
          <strong>{t("cart")}</strong>
          <Table striped size="md" {...getTableProps()}>
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
              {cartIsEmpty
                ? t("cart_empty")
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
              {cartObject.items ? (
                <React.Fragment>
                  <tr>
                    <td colSpan={4}> {""}</td>
                    <td> {t("total")} :</td>
                    <td>
                      {cartObject.total_points?.toLocaleString()} {t("points")}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}> {""}</td>
                    <td> {t("balance_after_purchase")}::</td>
                    <td>
                      {pointBalance.pointBalance - cartObject.total_points}{" "}
                      {t("points")}
                    </td>
                  </tr>
                </React.Fragment>
              ) : (
                ""
              )}
            </tbody>
          </Table>
          {cartObject.items ? (
            <div className="float-md-right">
              <TemplateButton
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  navigate("/participant/checkout");
                }}
                text={t("checkout")}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({
  cart: state.cart,
  program: state.program,
  pointBalance: state.pointBalance,
  organization: state.organization,
  template: state.template,
}))(CartPage);
