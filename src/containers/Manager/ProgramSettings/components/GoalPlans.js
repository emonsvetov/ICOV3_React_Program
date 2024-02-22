import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {getGoalPlans} from '@/services/program/getGoalPlans';
import {getGoalPlan} from '@/services/program/getGoalPlan';
import { useTable } from 'react-table'
import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import { Link } from 'react-router-dom';
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import {
    Table,
  } from 'reactstrap';
import ModalWrapper from './ModalWrapper';

const GOAL_PLAN_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Goal Plan Type",
        accessor: "goal_plan_type.name",
    }
]

const GoalPlans = ({program, organization, status}) => {
    const dispatch = useDispatch()
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
       // console.log("edit goal plan")
        setGoalPlan(item)
        toggle('EditGoalPlan');
        setLoading(false)
      })
    }
    const onDeleteGoalPlan = (goalplanId) => {
      setLoading(true)
      axios
        .delete(`/organization/${organization.id}/program/${program.id}/goalplan/${goalplanId}`)
        .then((res) => {
          if (res.status == 200) {
             dispatch(sendFlashMessage('Goal plan updated successfully. Reloading...!', 'alert-success', 'top'))
              setLoading(false)
              var t = setTimeout(window.location.reload(), 3000)
          }
        })
        .catch((err) => {
          dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
          setLoading(false)
        });
    }

    const RenderActions = ({row}) => {
      return (
          <span>
              <Link to={{}} onClick={() => onClickEditGoalPlan(row.original.id)}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
              <span style={{width:'2.5rem', display: 'inline-block'}}></span>
              <Link to={{}} className='delete-column' onClick={(e) => {if(window.confirm('Are you sure to delete this Goal Plan?')){onDeleteGoalPlan(row.original.id)}}}><TrashIcon style={{marginRight: "0.5rem"}}/>Delete</Link>
          </span>
      )
    }
  
    let final_columns = [
      ...GOAL_PLAN_COLUMNS, 
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
        getGoalPlans(organization.id, program.id, status)
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
    //  console.log(goalplan)
  
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