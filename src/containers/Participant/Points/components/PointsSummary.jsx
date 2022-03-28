import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Col, Button, Row } from 'reactstrap';
import { POINTS_SUMMARY_DATA } from './Mockdata';
import { SUMMARY_COLUMNS } from './columns';
import { useTable } from 'react-table'

const SUMMARY_DATA = [
    {index: "balance", text: "Your Points Balance", value: 0},
    {index: "redeemed", text: "Points Redeemed", value: 49000},
    {index: "expired", text: "Points Expired", value: 2720},
]


const PointsSummary = () => {
    const columns = React.useMemo( () => SUMMARY_COLUMNS, [])
    const data = React.useMemo(() => POINTS_SUMMARY_DATA, [])
    const { getTableProps, headerGroups, rows, prepareRow } 
        = useTable({ columns, data})

  return (
    <>
        <div className='points-summary p-3 rounded-3'>
            <h3>Points Summary</h3>
            <div className='d-flex justify-content-around'>
                {SUMMARY_DATA.map((item, index)=>{
                    return <div key={index} className="summary-item d-flex flex-column rounded-3">
                        <strong className={`point-value index-${index}`}>{item.value.toLocaleString('en-US')}</strong>
                        <span>{item.text}</span>
                    </div>
                })}
            </div>
        </div> 
        <div className='points-summary-table'>
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
        </div>
    </>
    
)}

export default PointsSummary;