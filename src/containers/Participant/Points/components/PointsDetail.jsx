import React, {useEffect, useState} from "react";
import {Table} from "reactstrap";
import {DETAIL_COLUMNS} from "./columns";
import {useTable} from "react-table";
import {useTranslation} from "react-i18next";
import {getUserEventHistory} from "@/services/program/getUserEvents";
import {connect} from "react-redux";

const PointsDetail = ({program, organization, auth}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);

  let detail_columns = [
    ...DETAIL_COLUMNS
    // Add any new columns here
    // {
    // }
  ];

  detail_columns.forEach( (column, i) => {
    if( column.Header === 'Points')
    {
      detail_columns[i].Cell =  ({ row, value }) => {
        // alert(value * factor_valuation);
        // console.log(value * program.factor_valuation)
        return value * program.factor_valuation
      }
    }
  })

  const columns = React.useMemo(() => detail_columns, []);

  useEffect(() => {
    if (organization?.id && program?.id && auth?.id) {
      getUserEventHistory(organization.id, program.id, auth.id, 0, 10)
      .then(data => {
        data.results.map( row => row.amount)
        setData(data.results);
      })
      .catch(error => {
        console.log(error.response.data);
      })
    }
  }, [organization, program, auth]);

  const {getTableProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
  });

  if (!data) return t("loading");

  console.log(data)

  if( data.length <= 0 ) return ''

  return (
    <>
        <Table striped bordered hover size="md" {...getTableProps()}>
          <thead>
            <tr>
              <td colSpan={4} className="title">
                {t("points_detail")}
              </td>
            </tr>
          </thead>
          <tbody>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
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
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(PointsDetail);

