import React, { useState, useEffect, useContext } from "react";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Table, Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import { GOAL_COLUMNS } from "./components/columns";
import { Link } from "react-router-dom";
import { GOAL_DATA } from "./components/Mockdata";
import Sidebar from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";
import { readActiveByProgramAndUser } from "@/services/user/readActiveByProgramAndUser";

const Goals = ({ template, auth, organization, program }) => {
  const { t } = useTranslation();
  
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (organization?.id && program?.id && auth?.id) {
        readActiveByProgramAndUser(organization.id, program.id, auth.id)
          .then(data => {
            setGoals(data)
            setLoading(false)
          })
          .catch(error => {
            console.log(error.response.data);
          })
      }
  }, []);
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
  //const data = React.useMemo(() => GOAL_DATA, []);

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data: goals,
    });
    if (loading) {
      return <p>{t("loading")}</p>;
    }
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
            <Sidebar />
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
    (template?.name === "clear" && <GoalsOrigin />) ||
    (template?.name === "classic" && <GoalsNew />)
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Goals);
