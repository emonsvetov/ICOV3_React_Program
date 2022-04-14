import React, {useState, useEffect} from 'react'
import {
    Table, 
    Input,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap'
import { useTable, usePagination, useFlexLayout } from "react-table";
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';
import TableFilter from '@/shared/components/table/components/TableFilter';
import { USERS_COLUMNS, USERS_DATA  } from './Mockdata';
import {getUsers} from '@/services/program/getUsers'
import MailIcon from 'mdi-react/PostItNoteAddIcon';
import ModalWrapper from './ModalWrapper';
import RewardIcon from 'mdi-react/PostItNoteAddIcon';
import GoalIcon from 'mdi-react/BullseyeArrowIcon';
import ResendIcon from 'mdi-react/AccountPlusIcon';
import DeactivateIcon from 'mdi-react/CancelIcon';
import ImportIcon from 'mdi-react/ImportIcon';
import PeerIcon from 'mdi-react/PostItNoteAddIcon';
import apiTableService from "@/services/apiTableService"

const QUERY_PAGE_SIZE = 20

const ACTIONS = [
    {name: 'Reward', link:''},
    {name: 'Add Goal', link:''},
    {name: 'Email', link:''},
    {name: 'Resend Invite', link:''},
    {name: 'Deactivate', link:''},
    {name: 'Peer Allocation', link:''},
]
const ICON_ARRAY = [
    <RewardIcon />,
    <GoalIcon />,
    <MailIcon />,
    <ResendIcon />,
    <DeactivateIcon />,
    <ImportIcon />,
    <PeerIcon />
  ]
const ProgramUsers = ( {program, organization} ) => {
    console.log("ProgramUsers")
    const [modalName, setModalName] = useState(null)
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ keyword:''});


    const toggle = (name=null) => {
        if( name ) setModalName(name)
        setOpen(prevState => !prevState)
    }
    const onClickAction = (name, row) => {
        setCurrentRow(row)
        toggle(name)
    }

    const [showAddPopup, setShowAddPopup] = useState(false);
    const popupToggle = () => {
      setShowAddPopup(prevState => !prevState);
    };
    const RenderActions = ({row}) => {
        return (
            ACTIONS.map((item, index) =>{
              return <span key={index} onClick={() => onClickAction(item.name, row.original)}>
                  <span className={`action-item ${item.name}`}>{ICON_ARRAY[ index ]}{item.name}</span>
                  <span style={{width:'5px', display: 'inline-block'}}></span>
              </span>
            })
        )
      }
    
      let final_columns = [
        ...[{
          Header: "",
          accessor: "checkbox",
          Cell: ( rowInfo ) => {
            return (
              <Input type="checkbox" />
                
                    // checked={this.state.selected[rowInfo.original.title.props.children] === true}
                    // onChange={() => this.toggleRow(rowInfo.original.title.props.children)}
                
            );
        },
      }],
        ...USERS_COLUMNS, 
        ...[{
            Header: "",
            accessor: "action",
            Footer: "Action",
            Cell: ({ row }) => <RenderActions row={row} />,
        }]
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
        state: { pageIndex, pageSize }
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
    usePagination
    );

    // console.log(filter)
    
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        apiTableService.fetchData(
            {
                url: `/organization/${organization.id}/program/${program.id}/user`,
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
        )
    }

    if ( loading ) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className='users' >
                <div className='header d-flex  justify-content-between'>
                    <div className='d-flex w-25 justify-content-between'>
                        <UncontrolledDropdown>
                            <DropdownToggle caret className='dropdowntoggle'>
                            Actions
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem onClick={popupToggle}>Reward</DropdownItem>
                            <DropdownItem >Add Goal</DropdownItem>
                            <DropdownItem>Email</DropdownItem>
                            <DropdownItem>Resend Invite</DropdownItem>
                            <DropdownItem>Deactivate</DropdownItem>
                            <DropdownItem>Import</DropdownItem>
                            <DropdownItem>Peer Allocation</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        
                        <UncontrolledDropdown>
                            <DropdownToggle caret className='dropdowntoggle'>
                            Show Entries
                            </DropdownToggle>
                            <DropdownMenu>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                            <DropdownToggle caret className='dropdowntoggle'>
                            Status
                            </DropdownToggle>
                            <DropdownMenu>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
            <ModalWrapper user={currentRow} name={modalName} isOpen={isOpen} setOpen={setOpen} toggle={toggle} />
        </>
    )
}

export default ProgramUsers