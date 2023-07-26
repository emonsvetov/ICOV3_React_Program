import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLeaderboards } from "@/services/program/getLeaderboards";
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { Link } from "react-router-dom";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import EditLeaderboardModal from "./EditLeaderboardModal";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";


const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "",
    accessor: "leaderboard_type.name",
  },
];

const Leaderboards = ({ program, organization }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // console.log(program)
  // console.log(organization)

  const [leaderboards, setLeaderboards] = useState([]);
  const [leaderboardId, setLeaderboardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const onClickEditLeaderboard = (id) => {
    setLeaderboardId(id);
    toggle();
  };
  const onDeleteLeaderboard = (leaderboardId) => {
    setLoading(true);
    axios
      .delete(
        `/organization/${organization.id}/program/${program.id}/leaderboard/${leaderboardId}`
      )
      .then((res) => {
        //   console.log(res)
        if (res.status == 200) {
          dispatch(
            sendFlashMessage(
              "Leaderboard updated successfully. Reloading...!",
              "alert-success",
              "top"
            )
          );
          setLoading(false);
          var t = setTimeout(window.location.reload(), 3000);
        }
      })
      .catch((err) => {
        //console.log(error.response.data);
        dispatch(
          sendFlashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setLoading(false);
      });
  };

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link
          to={"#leaderboards"}
          onClick={(e) => onClickEditLeaderboard(row.original.id)}
        >
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={"#leaderboards"}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Leaderboard?")) {
              onDeleteLeaderboard(row.original.id);
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
    ...COLUMNS,
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
    if (organization && program) {
      setLoading(true);
      getLeaderboards(organization.id, program.id).then((items) => {
        setLeaderboards(items);
        setLoading(false);
      });
    }
  }, [organization, program]);

  const columns = React.useMemo(() => final_columns, []);
  // const data = React.useMemo(() => fetchEvents(organization, program), [])

  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: leaderboards,
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
      <EditLeaderboardModal
        program={program}
        organization={organization}
        id={leaderboardId}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
      />
    </>
  );
};

export default Leaderboards;
