import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table'
import {Table, Button} from 'reactstrap';
import axios from 'axios';
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import {getLeaderboardEvents} from '@/services/program/getLeaderboardEvents'

const EVENTS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Event Type",
        accessor: "event_type.name",
    }
]

const LeaderboardEventsTable = ({leaderboard, organization, program, assigned, refresh, setRefresh }) =>{
    const dispatch = useDispatch()

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const onClickAssign = (id, action) =>{
        setLoading(true)
        const formData = {
            'event_id': id,
            'action': action.toLowerCase()
        };

        axios
          .patch(`/organization/${organization.id}/program/${program.id}/leaderboard/${leaderboard.id}/event`, formData)
          .then((res) => {
            //   console.log(res)
            if (res.status == 200) {
                // alert(window.location.href);
                // window.location.reload()
                dispatch(sendFlashMessage('Leaderboard updated successfully!', 'alert-success', 'top'))
                setLoading(false)
                setRefresh(true)
            }
          })
          .catch((err) => {
            //console.log(error.response.data);
            dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
            setLoading(false)
          });
    }

    useEffect(() => {
        if( refresh )   {
            setLoading(true)
            getLeaderboardEvents(organization.id, program.id, leaderboard.id, assigned)
            .then(items => {
                // console.log(items)
                setEvents(items)
                setLoading(false)
                setRefresh(false)
            })
        }
      }, [refresh])

      const RenderActions = ({row, assigned}) => {
        const action = assigned ? 'Unassign' : 'Assign'
        return (
            <span>
                <Button color={assigned ? "danger": "success"} onClick={() => onClickAssign(row.original.id, action)}>{action}</Button> 
            </span>
        )
    }

    let final_columns = (assigned) =>[
        ...EVENTS_COLUMNS, 
        ...[{
            Header: "Action",
            accessor: "action",
            Footer: "Action",
            Cell: ({ row }) => <RenderActions row={row} assigned={assigned}/>,
        }]
    ]

    const columns = React.useMemo( () => final_columns(assigned), [])

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:events})

    // console.log(events)

    return (
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
    )
}

export default LeaderboardEventsTable;