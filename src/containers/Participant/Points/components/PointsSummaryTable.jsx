import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { useTable } from "react-table";
import { SUMMARY_COLUMNS } from "./columns";
import { useTranslation } from "react-i18next";

const PointsSummaryTable = ({ table_data }) => {
  const columns = React.useMemo(() => SUMMARY_COLUMNS, []);
  const data = React.useMemo(() => table_data, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const { t } = useTranslation();

  return (
    <>
      <Table striped bordered hover size="md" {...getTableProps()}>
        <tbody>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {t( column.Header)}
                </th>
              ))}
            </tr>
          ))}

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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    // myPoints: state.participant.myPoints
  };
};

export default connect(mapStateToProps)(PointsSummaryTable);
