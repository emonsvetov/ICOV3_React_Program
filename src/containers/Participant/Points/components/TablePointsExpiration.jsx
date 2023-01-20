import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";

const TablePointsExpiration = ({ myPoints, program }) => {

  const { t } = useTranslation();

  const EXPIRATION_COLUMNS = [
    {
      Header: "Expiring On",
      accessor: "expiration",
      Cell: ({ row, value }) => {
        return `${t("points_expiring")} ${new Date(value).toLocaleDateString("en-US", {month:'long', 'year':'numeric', 'day': 'numeric'})}`;
      },
    },
    {
      Header: "Points",
      accessor: "amount",
      Cell: ({ row, value }) => {
        return value * program.factor_valuation;
      },
    },
  ];

  const columns = React.useMemo(() => EXPIRATION_COLUMNS, []);
  const data = React.useMemo(() => myPoints.expiration, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <div className="origin-table">
        <Table striped bordered hover size="md" {...getTableProps()}>
          <thead>
            <tr>
              <td colSpan={2} className="title">
                {t("points_expirations")}
              </td>
            </tr>
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
const mapStateToProps = (state) => {
  return {
    myPoints: state.participant.myPoints,
    program: state.program
  };
};

export default connect(mapStateToProps)(TablePointsExpiration);
