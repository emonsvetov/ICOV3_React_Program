import React, { useEffect, useState } from "react";
// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { Link } from "react-router-dom";

import { PARTICIPANT_GOALPLAN_COLUMNS, PARTICIPANT_GOALPLAN_DATA } from "./Mockdata";

import { Table } from "reactstrap";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";

const ParticipantGoalPlans = ({ program, organization }) => {
  // console.log(program)
  // console.log(organization)
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  let final_columns = [
    ...PARTICIPANT_GOALPLAN_COLUMNS,
    ...[
      {
        Header: "Action",
        accessor: "action",
        Footer: "Action",
        //Cell: ({ row }) => <RenderActions row={row} />,
      },
    ],
  ];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // getEvents(organization.id, program.id)
    //   .then(items => {
    //     if(mounted) {
    //       setEvents(items)
    //       setLoading(false)
    //     }
    //   })
    setLoading(false);
    return () => (mounted = false);
  }, []);

  const columns = React.useMemo(() => final_columns, []);
  const data = React.useMemo(() => PARTICIPANT_GOALPLAN_DATA, []);

  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  if (loading) return t("loading");

  // return ;
  // console.log(event)

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
    </>
  );
};

export default ParticipantGoalPlans;
