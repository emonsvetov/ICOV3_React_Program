import React, {useEffect, useState} from 'react';
// import {getEvents} from '@/services/program/getEvents'
// import {getEvent} from '@/services/program/getEvent'
import { useTable } from 'react-table'

import { Table } from 'reactstrap';
// import ModalWrapper from './ModalWrapper';
import { AWARD_HISTORY_DATA, AWARD_HISTORY_COLUMNS } from './Mockdata';

const AwardHistoryTable = ({participant}) => {

    // console.log(program)
    // console.log(organization)
    
    const [loading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    
    
    const toggle = () => {
      setOpen(prevState => !prevState)
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
  
    let final_columns = [
      ...AWARD_HISTORY_COLUMNS, 
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
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data: AWARD_HISTORY_DATA})  
  
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
                  <tr {...row.getRowProps()} >
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
      </>
    )
  }

  export default AwardHistoryTable