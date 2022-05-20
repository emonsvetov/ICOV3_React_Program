import React, {useEffect, useState} from 'react';
// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';

import {
    Table,
  } from 'reactstrap';
// import ModalWrapper from './ModalWrapper';
import { LEADERBOARD_DATA, LEADERBOARD_COLUMNS } from './Mockdata';
import AwardHistoryPopup from './AwardHistoryPopup';

const LeaderboardTable = ({id}) => {

    // console.log(program)
    // console.log(organization)

    
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    
    
    const toggle = () => {
      setOpen(prevState => !prevState)
    }

    const fetchData = (id) => {
      let res = []
      LEADERBOARD_DATA.forEach((item) =>{
        if(item.id == id){
          res = item.data;
        }
      })
      return res;
    }

    // const onClickEditEvent = (eventId) => {
    //   getEvent(organization.id, program.id, eventId)
    //   .then(item => {
    //     // console.log(item)
    //     setEvent(item)
    //     toggle('EditEvent');
    //     setLoading(false)
    //   })
    // }

    const handleClickRow = (row) => {
      setParticipant(row.original);
      toggle();
    }

  
    let final_columns = [
      ...LEADERBOARD_COLUMNS, 
    ]
  
    // useEffect(() => {
    //     let mounted = true;
    //     setLoading(true)
    //     getEvents(organization.id, program.id)
    //       .then(items => {
    //         if(mounted) {
    //           setEvents(items)
    //           setLoading(false)
    //         }
    //       })
    //     return () => mounted = false;
    //   }, [])
  
  
    const columns = React.useMemo( () => final_columns, [])
    // const data = React.useMemo(() => fetchEvents(organization, program), [])
  
    // console.log(data)
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:fetchData(id)})  
  
    if( loading ) return 'Loading...'
  
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
                  <tr {...row.getRowProps()} onClick={() =>handleClickRow(row)}>
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
      <AwardHistoryPopup  isOpen={isOpen} setOpen={setOpen} toggle={toggle} participant={participant}/>
      </>
    )
  }

  export default LeaderboardTable