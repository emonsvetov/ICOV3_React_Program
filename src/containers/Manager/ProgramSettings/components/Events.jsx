import React, {useEffect, useState} from 'react';
import {getEvents} from '@/services/program/getEvents'
import {getEvent} from '@/services/program/getEvent'
import { useTable } from 'react-table'
import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import { Link } from 'react-router-dom';
import EditEventModal from './EditEventModal';
import {
    Table,
  } from 'reactstrap';
const EVENTS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Event Type",
        accessor: "type",
    }
]

const Events = ({program, organization}) => {

    // console.log(program)
    // console.log(organization)

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
  
    const onClickEditEvent = (eventId) => {
      getEvent(organization.id, program.id, eventId)
      .then(item => {
        // console.log(item)
        setEvent(item)
        setShowEditModal(true)
        setLoading(false)
      })
    }
    const onDeleteEvent = (e, event_id) => {
    }

    const toggleModal = () => {
      setShowEditModal(prevState => !prevState);
    };
  
    const RenderActions = ({row}) => {
      return (
          <span>
              <Link to={{}} onClick={() => onClickEditEvent(row.original.id)}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
              <span style={{width:'2.5rem', display: 'inline-block'}}></span>
              <Link to={{}} className='delete-column' onClick={(e) => {if(window.confirm('Are you sure to delete this Event?')){onDeleteEvent(e, row.original.id)}}}><TrashIcon style={{marginRight: "0.5rem"}}/>Delete</Link>
          </span>
      )
    }
  
    let final_columns = [
      ...EVENTS_COLUMNS, 
      ...[{
          Header: "Action",
          accessor: "action",
          Footer: "Action",
          Cell: ({ row }) => <RenderActions row={row} />,
      }]
    ]
  
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        getEvents(organization.id, program.id)
          .then(items => {
            if(mounted) {
              setEvents(items)
              setLoading(false)
            }
          })
        return () => mounted = false;
      }, [])
  
  
    const columns = React.useMemo( () => final_columns, [])
    // const data = React.useMemo(() => fetchEvents(organization, program), [])
  
    // console.log(data)
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:events})  
  
    if( loading ) return 'Loading..x'
  
    // return ;
    // console.log(event)
  
    return (
      <>
      <Table striped borderless size="md" {...getTableProps()}>
          <thead>
              {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                  </th>
                  ))}
              </tr>
              ))}
          </thead>
          <tbody>
              {rows.map((row, i) => {
              prepareRow(row)
              return (
                  <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                      return (
                      <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                      </td>
                      )
                  })}
                  </tr>
              )
              })}
          </tbody>
      </Table>
      {showEditModal &&  <EditEventModal onCancelHandler={toggleModal} program={program} organization={organization} event={event} toggleModal={toggleModal} setEvent={setEvent} />}
      </>
    )
  }

  export default Events