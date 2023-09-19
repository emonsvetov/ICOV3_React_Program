import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";

const TablePointsExpiration = ({ myPoints, program, template }) => {

  const { t } = useTranslation();

  const EXPIRATION_COLUMNS = [
    {
      Header: "Expiring On",
      accessor: "expiration",
      Cell: ({ row, value }) => {
        let date = new Date(value.replace(' ', 'T')).toLocaleDateString(
            "en-US", {month:'long', 'year':'numeric', 'day': 'numeric'});
        return `${t("points_expiring")} ${date}`;
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
  const data = React.useMemo(() => myPoints?.expiration ? Object.values(myPoints.expiration) : [], []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // if(!myPoints.expiration) return 'loading...'
  // console.log(data)

  return (
    <>
      <div className={`${template.name}-table`}>
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
    program: state.program,
    template: state.template,
  };
};

export default connect(mapStateToProps)(TablePointsExpiration);
