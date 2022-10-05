import React, {useState, useEffect} from 'react'
import {
    Table, 
    Button
} from 'reactstrap'
import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';
import TableFilter from '@/shared/components/table/components/TableFilter';
import { USERS_COLUMNS, USERS_DATA  } from './Mockdata';
import {getUsers} from '@/services/program/getUsers'
import MailIcon from 'mdi-react/PostItNoteAddIcon';
import ModalWrapper from './ModalWrapper';
import apiTableService from "@/services/apiTableService"
import {connect} from "react-redux";

const QUERY_PAGE_SIZE = 20

     
const ProgramUsers = ( {program, organization, auth} ) => {
    // console.log("ProgramUsers")
    const [modalName, setModalName] = useState(null)
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState(null);
    // const [currentRow, setCurrentRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ keyword:''});
    const [participants, setParticipants] = useState([]);

    // selectedFlatRows.map(d => d.original)/


    const toggle = (name=null) => {
        if( name ) setModalName(name)
        setOpen(prevState => !prevState)
    }
    
    const onClickReward = () => {
        // setCurrentRow(row)
        const rows = selectedFlatRows.map(d => d.original);
        if( rows.length === 0) {
            alert('Select participants')
            return
        }
        setParticipants( rows )
        toggle('Reward')
    }
    
    let final_columns = [
        ...USERS_COLUMNS,
    ]
    
    const columns = React.useMemo( () => final_columns, [])
    // const data = React.useMemo(() => users, [])

    const totalPageCount = Math.ceil(users?.count / QUERY_PAGE_SIZE)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        pageCount,
        pageOptions,
        gotoPage,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds }
    } = useTable({
        columns,
        data: users ? users.results : [],
        initialState: {
            pageIndex: 0,
            pageSize: QUERY_PAGE_SIZE
        },
        manualPagination: true, // Tell the usePagination
        pageCount: users ? totalPageCount : null,
        autoResetSortBy: false,
        autoResetExpanded: false,
        autoResetPage: false,
    },
    usePagination,
    useRowSelect,
    hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
      }
    );

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
          const defaultRef = React.useRef()
          const resolvedRef = ref || defaultRef
      
          React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])
      
          return (
            <>
              <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
          )
        }
      )

    // console.log(filter)
    
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        filter.except = [auth.id];
        apiTableService.fetchData(
            {
                url: `/organization/${organization.id}/program/${program.id}/participant`,
                page: pageIndex,
                size: pageSize,
                filter
            }
        )
        .then(items => {
            if(mounted) {
                // console.log(items)
                setUsers(items)
                setLoading(false)
            }
        })
        return () => mounted = false;
    }, [getUsers, setLoading, setUsers, pageIndex, pageSize, filter])

    const manualPageSize = []

    const UserTable = () => {
        return (
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
                    <tbody {...getTableBodyProps()}>
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
            </div>
        )
    }
    
    // onClick={() =>onClickAction('Reward', row.original)}

    if ( loading ) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className='users' >
                <div className='header d-flex  justify-content-between'>
                    <div className='d-flex w-25 justify-content-between'>
                        <Button color='primary' onClick={() => onClickReward()} >Reward</Button>
                    </div>
                    <TableFilter filter={filter} setFilter={setFilter} />
                </div>
                <UserTable />
            </div>
            <div className='my-3 status'>
            {(rows.length > 0) && (
                    <>
                        <ReactTablePagination
                        page={page}
                        gotoPage={gotoPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        pageOptions={pageOptions}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        setPageSize={setPageSize}
                        manualPageSize={manualPageSize}
                        dataLength={users.results.length}
                        />
                    </>
                )}
            </div>
            <ModalWrapper name={modalName} isOpen={isOpen} setOpen={setOpen} toggle={toggle} participants={participants} />
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(ProgramUsers);