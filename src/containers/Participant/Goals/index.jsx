import React, { useState, useEffect, useContext } from "react";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar } from "../../Layout/sidebar";
import { Table, Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import { GOAL_COLUMNS } from "./components/columns";
import { Link } from "react-router-dom";
import { GOAL_DATA } from "./components/Mockdata";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const Goals = ({ template }) => {
  const { t } = useTranslation();
  

  const [goals, setGoals] = useState(null);

  const onSubmit = (values) => {};

  const GoalTable = () => {
    const RenderActions = ({ row }) => {
      return (
        <span>
          <Link to={`/participant/my-goals/${row.original.id}`}>
            {" "}
            {t("view_details")}
          </Link>
        </span>
      );
    };

    let final_columns = [
      ...GOAL_COLUMNS,
      ...[
        {
          Header: "",
          accessor: "action",
          Footer: "Action",
          Cell: ({ row }) => <RenderActions row={row} />,
        },
      ],
    ];

    const columns = React.useMemo(() => final_columns, []);
    const data = React.useMemo(() => GOAL_DATA, []);

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    return (
      <Table striped borderless size="md" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
    );
  };

  const GoalsNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <GoalTable />
              </div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  const GoalsOrigin = () => {
    return (
      <>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin />
          </Col>
          <Col md={7} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              {t("my_goals")}
            </h3>
            <GoalTable />
          </Col>
        </Row>
      </>
    );
  };

  return (
    (template?.name === "Original" && <GoalsOrigin />) ||
    (template?.name === "New" && <GoalsNew />)
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};
export default connect(mapStateToProps)(Goals);
