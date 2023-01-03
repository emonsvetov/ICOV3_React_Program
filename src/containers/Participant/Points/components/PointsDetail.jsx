import React from "react";
import { Link } from "react-router-dom";
import { Table, Col, Button, Row } from "reactstrap";
import { POINTS_DETAIL_DATA } from "./Mockdata";
import { DETAIL_COLUMNS } from "./columns";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";

const PointsDetail = () => {
  const { t } = useTranslation();
  const columns = React.useMemo(() => DETAIL_COLUMNS, []);
  const data = React.useMemo(() => POINTS_DETAIL_DATA, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <div className="points-detail pt-3">
        <h2>{t("points_detail")}</h2>
      </div>
      <div className="points-detail-table">
        <Table striped borderless size="md" {...getTableProps()}>
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
    </>
  );
};

export default PointsDetail;
