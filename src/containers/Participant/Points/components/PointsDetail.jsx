import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table, Col, Button, Row} from "reactstrap";
import {POINTS_DETAIL_DATA} from "./Mockdata";
import {DETAIL_COLUMNS} from "./columns";
import {useTable} from "react-table";
import {useTranslation} from "react-i18next";
import {getUserEventHistory} from "@/services/program/getUserEvents";
import {connect} from "react-redux";

const PointsDetail = ({program, organization, auth}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);

  const columns = React.useMemo(() => DETAIL_COLUMNS, []);

  useEffect(() => {
    (async () => {
      if (organization?.id && program?.id && auth?.id) {
        getUserEventHistory(organization.id, program.id, auth.id, 0, 10)
          .then(data => {
            setData(data.results);
          })
          .catch(error => {
            console.log(error.response.data);
          })
      }
    })();
  }, []);

  const {getTableProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
  });

  if (!data) return t("loading");

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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(PointsDetail);

