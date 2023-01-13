import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTable } from "react-table";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";
import { useTranslation } from "react-i18next";

import { getEvents } from "@/services/program/getEvents";
import { getEvent } from "@/services/program/getEvent";
import ModalWrapper from "../components/ModalWrapper";
import {useDispatch, flashError, flashSuccess} from "@/shared/components/flash"

const EVENTS_COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Event Type",
    accessor: "event_type.name",
  },
  {
    Header: "Status",
    accessor: "enable",
    Cell: ({ row, value }) => value ? 'Active' : 'Disabled',
  },
];

const Events = ({ program, organization }) => {

  const dispatch = useDispatch()
  // console.log(program)
  // console.log(organization)
  const { t } = useTranslation();
  const [trigger, setTrigger] = useState(0);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditEvent = (eventId) => {
    getEvent(program.organization_id, program.id, eventId).then((item) => {
      // console.log(item)
      setEvent(item);
      toggle("EditEvent");
      setLoading(false);
    });
  };
  const onDeleteEvent = (e, event_id) => {
    axios.delete(
        `/organization/${program.organization_id}/program/${program.id}/event/${event_id}`
    )
    .then((res) => {
      //   console.log(res)
      if (res.status == 200) {
        flashSuccess(dispatch, "Event was deleted!");
        setLoading(false);
        setTrigger(Math.floor(Date.now() / 1000))
        // var t = setTimeout(window.location.reload(), 3000);
      }
    })
    .catch((err) => {
      //console.log(error.response.data);
      flashError(dispatch, err.response.data);
      setLoading(false);
    });
  };

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={{}} onClick={() => onClickEditEvent(row.original.id)}>
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={{}}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Event?")) {
              onDeleteEvent(e, row.original.id);
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
    ...EVENTS_COLUMNS,
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
    getEvents(organization.id, program.id, {disabled: true}).then((items) => {
      if (mounted) {
        setEvents(items);
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, [trigger]);

  const columns = React.useMemo(() => final_columns, []);
  // const data = React.useMemo(() => fetchEvents(organization, program), [])

  // console.log(data)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: events,
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
        event={event}
        setEvent={setEvent}
        setTrigger={setTrigger}
      />
    </>
  );
};

// {showEditModal &&  <EditEventModal onCancelHandler={toggleModal} program={program} organization={organization} event={event} toggleModal={toggleModal} setEvent={setEvent} />}

export default Events;
