import React, { useEffect, useState } from "react";
// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { Link } from "react-router-dom";

import { REFERRAL_COLUMNS, REFERRAL_DATA } from "./Mockdata";

import { Table } from "reactstrap";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";

const Referrals = ({ program, organization }) => {
  // console.log(program)
  // console.log(organization)
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditReferral = (referralId) => {
    // getEvent(organization.id, program.id, referralId)
    // .then(item => {
    //   // console.log(item)
    //   setReferral(item)
    //   toggle('EditEvent');
    //   setLoading(false)
    // })

    setReferral(REFERRAL_DATA[0]);
    toggle("EditReferral");
    setLoading(false);
  };
  const onDeleteReferral = (e, referral_id) => {};

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={{}} onClick={() => onClickEditReferral(row.original.id)}>
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={{}}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Administrator?")) {
              onDeleteReferral(e, row.original.id);
            }
          }}
        >
          <TrashIcon style={{ marginRight: "0.5rem" }} />
          Delete
        </Link>
      </span>
    );
  };

  let final_columns = [
    ...REFERRAL_COLUMNS,
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
  const data = React.useMemo(() => REFERRAL_DATA, []);

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
      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        referral={referral}
        setReferral={setReferral}
      />
    </>
  );
};

export default Referrals;
