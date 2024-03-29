import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTranslation } from "react-i18next";

import { TEAM_COLUMNS } from "./Mockdata";
import ModalWrapper from "./ModalWrapper";
import { getTeams } from '@/services/team/getTeams'
import { getTeam } from '@/services/team/getTeam'
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"

const Teams = ({ program, organization }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);
  

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditTeam = (teamId) => {
    //getTeam(organization.id, program.id, referralId)
    getTeam(organization.id, program.id, teamId).then((item) => {
      //console.log(item)
      setTeam(item)
      toggle('EditTeam');
      setLoading(false)
    })
  };
  const onClickViewTeam = (teamId) => {
    //getTeam(organization.id, program.id, referralId)
    getTeam(organization.id, program.id, teamId).then((item) => {
      //console.log(item)
      setTeam(item)
      toggle('ViewTeam');
      setLoading(false)
    })
  };
  const onDeleteTeam = (e, team_id) => {
    axios.delete(
      `/organization/${program.organization_id}/program/${program.id}/team/${team_id}`
    )
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "Team was deleted!");
          setLoading(false);
          window.location.reload()
        }
      })
      .catch((err) => {
        flashError(dispatch, err.response.data);
        setLoading(false);
      });
  };
  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={{}} onClick={(e) => onClickViewTeam(row.original.id)}> View</Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link to={{}} onClick={(e) => onClickEditTeam(row.original.id)}>
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
    getTeams(organization.id, program.id)
      .then(items => {
        if (mounted) {
          setTeams(items)
          setLoading(false)
        }
      })
    setLoading(false);
    return () => (mounted = false);
  }, []);

  const columns = React.useMemo(() => final_columns, []);
  //const data = React.useMemo(() => TEAM_DATA, []);

  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: teams,
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
        team={team}
        setTeam={setTeam}
      />
    </>
  );
};

export default Teams;
