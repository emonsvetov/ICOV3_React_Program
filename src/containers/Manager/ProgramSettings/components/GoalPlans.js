import React, {useEffect, useState} from 'react';
import {getGoalPlanTypes} from '@/services/getGoalPlanTypes'
import {getGoalPlans} from '@/services/program/getGoalPlans';
import {getGoalPlan} from '@/services/program/getGoalPlan';
import { useTable } from 'react-table'
import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import { Link } from 'react-router-dom';
import {
    Table,
  } from 'reactstrap';
import ModalWrapper from './ModalWrapper';

const EVENTS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Goal Plan Type",
        accessor: "type",
    }
]

const GoalPlans = ({program, organization, status}) => {
    const [goalplans, setGoalPlans] = useState([]);
    const [goalplan, setGoalPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const [modalName, setModalName] = useState(null)
    
    const toggle = (name=null) => {
      if( name ) setModalName(name)
      setOpen(prevState => !prevState)
    }

    const onClickEditGoalPlan = (goalplanId) => {
      getGoalPlan(organization.id, program.id, goalplanId)
      .then(item => {
        //console.log(item)
        setGoalPlan(item)
        toggle('EditGoalPlan');
        setLoading(false)
      })
    }
    const onDeleteEvent = (e, event_id) => {
    }

    const RenderActions = ({row}) => {
      return (
          <span>
              <Link to={{}} onClick={() => onClickEditGoalPlan(row.original.id)}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
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
        getGoalPlans(organization.id, program.id,status)
          .then(items => {
            if(mounted) {
              setGoalPlans(items)
              setLoading(false)
            }
          })
        return () => mounted = false;
      }, [])  
  
    const columns = React.useMemo( () => final_columns, [])
    // const data = React.useMemo(() => fetchEvents(organization, program), [])
  
    // console.log(data)
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:goalplans})
  
    if( loading ) return 'Loading..'
  
    // return ;
    // console.log(goalplan)
  
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
      <ModalWrapper  name={modalName} isOpen={isOpen} setOpen={setOpen} toggle={toggle} goalplan={goalplan} setGoalPlan={setGoalPlan}/>
      </>
    )
  }

  // {showEditModal &&  <EditEventModal onCancelHandler={toggleModal} program={program} organization={organization} goalplan={goalplan} toggleModal={toggleModal} setGoalPlan={setGoalPlan} />}

  export default GoalPlans