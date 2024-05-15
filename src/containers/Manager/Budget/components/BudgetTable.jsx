import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import { BUDGET_COLUMNS } from "./columns";
import {
  useDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";

const BudgetTable = ({ program, organization,isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [modalName, setModalName] = React.useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link
          to=""
          onClick={() => (toggle("BudgetSetupInformation"), setEditableId(row.original.id))}
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
      function getBudgetPrograms() {
        axios
          .get(
            `/organization/${organization.id}/program/${program.id}/budgetprogram`
          )
          .then((res) => {
            setBudgetList(res.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      getBudgetPrograms();
    }
  }, [program, organization, isOpen]);

  const columns = React.useMemo(() => final_columns, []);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: budgetList,
  });

  if (loading) return t("loading");

  return (
    <>
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
      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        id={editableId}
      />
    </>
  );
};

export default BudgetTable;
