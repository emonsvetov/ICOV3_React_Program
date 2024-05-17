import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import ModalWrapper from "./ModalWrapper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import { BUDGET_COLUMNS } from "./columns";
import {
  getBudgetProgramLists,
  hasUserPermissions,
} from "@/services/program/budget";

const BudgetTable = ({
  program,
  organization,
  isOpen,
  setOpen,
  assignedPermissions,
}) => {
  const { t } = useTranslation();
  const [budgetProgramLists, setBudgetProgramLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [modalName, setModalName] = React.useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const tableStyled = {
    headerBottom: { borderBottom: "5px solid rgb(136, 136, 255)" },
  };
  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link
          to=""
          onClick={() => (
            toggle("BudgetSetupInformation"), setEditableId(row.original.id)
          )}
        >
          View
        </Link>
      </span>
    );
  };

  let final_columns = [
    ...BUDGET_COLUMNS,
    ...[
      {
        Header: "Action",
        accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => <RenderActions row={row} />,
      },
    ],
  ];

  useEffect(() => {
    if (program && organization) {
      setIsLoading(true);
      getBudgetProgramLists(organization.id, program.id).then((res) => {
        setBudgetProgramLists(res);
        setIsLoading(false);
      });
    }
  }, [program, organization]);

  const columns = React.useMemo(() => final_columns, []);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: budgetProgramLists,
    useSortBy,
  });

  return (
    <>
      {hasUserPermissions(assignedPermissions, ["Budget Read"]) ? (
        isLoading ? (
          <div style={{ padding: "20px 0px" }}>
            <p>Loading budgets...</p>
          </div>
        ) : budgetProgramLists.length > 0 ? (
          <Table striped borderless size="md" {...getTableProps()}>
            <thead style={{}}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={tableStyled.headerBottom}
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
        ) : (
          <div style={{ padding: "20px 0px" }}>
            <p>No Budget available at the moment.</p>
          </div>
        )
      ) : null}

      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        assignedPermissions={assignedPermissions}
        id={editableId}
      />
    </>
  );
};

export default BudgetTable;
