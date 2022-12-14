import React from 'react';
import { Table, Col, Button, Row } from 'reactstrap';
import { POINTS_DETAIL_DATA } from './Mockdata';
import { DETAIL_COLUMNS } from './columns';
import { useTable } from 'react-table'

const SUMMARY_DATA = [
    {index: "balance", text: "Your Points Balance", value:"0"},
    {index: "redeemed", text: "Points Redeemed", value:"-49000"},
    {index: "reclaimed", text: "Points Reclaimed", value:"-0"},
    {index: "expired", text: "Points Expired", value:"-2720"},
]


export const PointsOrigin = ( {title, table_columns, table_data}) => {
    const columns = React.useMemo( () => table_columns, [])
    const data = React.useMemo(() => table_data, [])
    const { getTableProps, headerGroups, rows, prepareRow } 
        = useTable({ columns, data})

  return (
    <>
        <div className='origin-table'>
            <Table striped bordered hover size="md" {...getTableProps()}>
                <thead>
                    <tr><td colSpan={4} className='title'> {title}</td></tr>
                </thead>
                <tbody>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                        ))}
                    </tr>
                    ))}

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
        </div>
    </>
    
)}