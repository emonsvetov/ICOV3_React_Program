import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLeaderboards } from "@/services/program/getLeaderboards";
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { Link } from "react-router-dom";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import { getLeaderboard } from "@/services/program/getLeaderboard";
import ModalWrapper from "./ModalWrapper";


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

const Leaderboards = ({ program, organization, leaderboard, setLeaderboard, reload}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // console.log(program)
  // console.log(organization)
  const [trigger, setTrigger] = useState(0);
  const [leaderboards, setLeaderboards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);


  const onClickEditLeaderboard = (id) => {
    getLeaderboard(organization.id, program.id, id).then((item)=>{
      setLeaderboard(item);
      toggle("EditLeaderboard");
    })
  };

  const loadLeaderboards = () => {
    setLoading(true);
    getLeaderboards(organization.id, program.id).then((items) => {
      setLeaderboards(items);
      setLoading(false);
    });
  }

  const toggle = (name = null, reload = false) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
    if(reload){
      loadLeaderboards();
    }
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
          setTrigger(Math.floor(Date.now() / 1000))
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
    loadLeaderboards();
  }, [trigger, reload]);

  const columns = React.useMemo(() => final_columns, []);
  // const data = React.useMemo(() => fetchEvents(organization, program), [])

  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: leaderboards,
  });

  if ( loading ) return t("loading");

  // return ;
  // console.log(event)

  if( !leaderboards.length > 0 ) {
    return <div><p>{t("No Leaderboards Available")}</p></div>
  }

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
        leaderboard={leaderboard} 
        setLeaderboard={setLeaderboard}
        setTrigger={setTrigger}
      />
    </>
  );
};

export default Leaderboards;
