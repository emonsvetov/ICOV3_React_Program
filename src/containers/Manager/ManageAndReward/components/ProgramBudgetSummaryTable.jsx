import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { Table } from "reactstrap";
import { BUDGET_PROGRAM_SUMMARY } from "./columns";
import { TableSkeleton } from "@/shared/components/Skeletons";

const ProgramBudgetSummaryTable = ({ organization, program, rootProgram }) => {
  const [awardData, setAwardsData] = useState(null);
  const [budgetSummary, setBudgetSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingAwards, setPendingAwards] = useState(null);

  useEffect(() => {
    if (organization?.id && program?.id) {
      setLoading(true);
      axios
        .get(
          `organization/${organization.id}/program/${program.id}/budgetprogram/currentbudget`
        )
        .then((response) => {
          setAwardsData(response.data);
          setBudgetSummary(
            response.data.cascadingData ? response.data.cascadingData : []
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [organization, program]);

  useEffect(() => {
    if (organization?.id && rootProgram?.id) {
      axios
        .get(
          `organization/${organization.id}/program/${rootProgram.id}/award-pendings`
        )
        .then((response) => {
          setPendingAwards(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organization, rootProgram]);

  const columns = React.useMemo(() => BUDGET_PROGRAM_SUMMARY, []);

  const tableStyled = {
    headerTop: { borderTop: "5px solid rgb(136, 136, 255)" },
  };

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: budgetSummary,
    },
    useSortBy
  );
  if (loading)
    return (
      <div className="bg-white rounded mb-2 p-2">
        <TableSkeleton rows={3} columns={4} width={"100%"} height={20} />
      </div>
    );

  return (
    <div className="bg-white rounded mb-2 p-1">
      <div className="m-2">
        <Link to="/manager/cascading-approvals">
          <span
            className="text-primary text-bold"
            style={{ textDecoration: "underline" }}
          >
            Number of Awards Pending Approval:{" "}
            {pendingAwards?.pending_count || 0}
          </span>
        </Link>
      </div>
      {budgetSummary.length > 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h6 className="text-color-lightblue">Monthly</h6>
            <h6>Yearly</h6>
            <hr />
          </div>
          <Table
            striped
            borderless
            size="md"
            {...getTableProps()}
            style={{ borderCollapse: "collapse" }}
          >
            <thead style={tableStyled.headerTop}>
              {headerGroups.map((headerGroup, _i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={_i}>
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      key={colIndex}
                      className="header-cell p-2"
                    >
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
                  <>
                    <tr {...row.getRowProps()} key={i}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td {...cell.getCellProps()} key={index}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <div style={{ padding: "20px 0px" }} className="">
          <h6>You don't have Budget for the current program</h6>
          <h6>Monthly</h6>
          <h6>Yearly</h6>
        </div>
      )}
      <div className="d-flex m-1 gap-5">
        <div className="d-flex gap-1 justify-content-center">
          <h6>Awards Pending:</h6>
          <span>${awardData?.award_pendings || 0}</span>
        </div>
        <div className="d-flex gap-1 justify-content-center">
          <h6>Awards Schedule:</h6>
          <span>${awardData?.award_schedule || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramBudgetSummaryTable;
