import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { Link } from "react-router-dom";
import { TEAM_COLUMNS, TEAM_DATA } from "./Mockdata";
import { Table } from "reactstrap";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";

const Teams = ({ program, organization }) => {
  const { t } = useTranslation();
  // console.log(program)
  // console.log(organization)

  const [events, setEvents] = useState([]);
  const [mate, setMate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);
  let navigate = useNavigate();

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditMate = (e, mateId) => {
    // getEvent(organization.id, program.id, referralId)
    // .then(item => {
    //   // console.log(item)
    //   setReferral(item)
    //   toggle('EditEvent');
    //   setLoading(false)
    // })
    e.preventDefault();
    setMate(TEAM_DATA[0]);
    toggle("EditTeam");
    setLoading(false);
  };
  const onDeleteTeam = (e, mate_id) => {};

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={`/manager/team/${row.original.id}`}> View</Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link to={{}} onClick={(e) => onClickEditMate(e, row.original.id)}>
          {" "}
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={{}}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Administrator?")) {
              onDeleteTeam(e, row.original.id);
            }
          }}
        >
          Delete
        </Link>
      </span>
    );
  };

  let final_columns = [
    ...TEAM_COLUMNS,
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
  const data = React.useMemo(() => TEAM_DATA, []);

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
        mate={mate}
        setMate={setMate}
      />
    </>
  );
};

export default Teams;
