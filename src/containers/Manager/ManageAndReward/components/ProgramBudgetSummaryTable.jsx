import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { Row, Col, Table } from "reactstrap";
import { BUDGET_PROGRAM_SUMMARY } from "./columns";
import { BorderTop } from "@material-ui/icons";

const ProgramBudgetSummaryTable = ({ organization, program }) => {
  const [currentBudget, setCurrentBudget] = useState([]);

  useEffect(() => {
    if (organization?.id && program?.id) {
      axios
        .get(
          `organization/${organization.id}/program/${program.id}/budgetprogram/currentbudget`
        )
        .then((response) => {
          setCurrentBudget(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organization, program]);
  console.log(currentBudget);
  const columns = React.useMemo(() => BUDGET_PROGRAM_SUMMARY, []);

  const tableStyled = {
    headerTop: { borderTop: "5px solid rgb(136, 136, 255)" },
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: currentBudget,
    },
    useSortBy
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
          </span>
        </Link>
      </div>
      {currentBudget.length > 0 ? (
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
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
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
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
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
        {currentBudget.map((currentAward) => (
          <>
            <div className="d-flex gap-1 justify-content-center">
              <h6>Awards Pending:</h6>
              <span>${currentAward.award_pending}</span>
            </div>
            <div className="d-flex gap-1 justify-content-center">
              <h6>Awards Schedule:</h6>
              <span>${currentAward.award_schedule}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProgramBudgetSummaryTable;
