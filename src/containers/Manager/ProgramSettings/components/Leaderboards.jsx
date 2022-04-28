import React, {useEffect, useState} from 'react';
// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from 'react-table'
import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import { Link } from 'react-router-dom';

import {
    Table,
  } from 'reactstrap';
import ModalWrapper from './ModalWrapper';

const COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "",
        accessor: "type",
    }
]

const LEADERBOARDS = [
  {
      name: "Team Leaderboard",
      type: "# of Awards Received",
  },
]

const Leaderboards = ({program, organization}) => {

    // console.log(program)
    // console.log(organization)
    
    const [leaderboards, setLeaderboards] = useState([]);
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const [modalName, setModalName] = useState(null)
    
    const toggle = (name=null) => {
      if( name ) setModalName(name)
      setOpen(prevState => !prevState)
    }

    const onClickEditLeaderboard = (id) => {
      // getEvent(organization.id, program.id, eventId)
      // .then(item => {
      //   // console.log(item)
      //   setEvent(item)
      //   toggle('EditEvent');
      //   setLoading(false)
      // })
      setLeaderboard(LEADERBOARDS[0]);
      toggle('EditLeaderboard');
    }
    const onDeleteEvent = (e, event_id) => {
        
    }

    const RenderActions = ({row}) => {
      return (
          <span>
              <Link to={{}} onClick={(e) => onClickEditLeaderboard(row.original.id)}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
              <span style={{width:'2.5rem', display: 'inline-block'}}></span>
              <Link to={{}} className='delete-column' onClick={(e) => {if(window.confirm('Are you sure to delete this Leaderboard?')){onDeleteEvent(e, row.original.id)}}}><TrashIcon style={{marginRight: "0.5rem"}}/>Delete</Link>
          </span>
      )
    }
  
    let final_columns = [
      ...COLUMNS, 
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
        setLeaderboards(LEADERBOARDS);
        setLoading(false)
        // getEvents(organization.id, program.id)
        //   .then(items => {
        //     if(mounted) {
        //       setEvents(items)
        //       setLoading(false)
        //     }
        //   })
        
        return () => mounted = false;
      }, [])
  
  
    const columns = React.useMemo( () => final_columns, [])
    // const data = React.useMemo(() => fetchEvents(organization, program), [])
  
    // console.log(data)
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:LEADERBOARDS})  
  
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
      <ModalWrapper  name={modalName} isOpen={isOpen} setOpen={setOpen} toggle={toggle} leaderboard={leaderboard} setLeaderboard={setLeaderboard}/>
      </>
    )
  }

  // {showEditModal &&  <EditEventModal onCancelHandler={toggleModal} program={program} organization={organization} event={event} toggleModal={toggleModal} setEvent={setEvent} />}

  export default Leaderboards