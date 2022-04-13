import React, {useState, useEffect} from 'react'
import { useTable } from 'react-table'
import {
    Table, 
    Input,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap'
import { USERS_COLUMNS, USERS_DATA  } from './Mockdata';
import {getUsers} from '@/services/program/getUsers'
import MailIcon from 'mdi-react/PostItNoteAddIcon';
import SearchIcon from 'mdi-react/SearchIcon'
import ModalWrapper from './ModalWrapper';
import RewardIcon from 'mdi-react/PostItNoteAddIcon';
import GoalIcon from 'mdi-react/BullseyeArrowIcon';
import ResendIcon from 'mdi-react/AccountPlusIcon';
import DeactivateIcon from 'mdi-react/CancelIcon';
import ImportIcon from 'mdi-react/ImportIcon';
import PeerIcon from 'mdi-react/PostItNoteAddIcon';

const ACTIONS = [
    {name: 'Reward', link:'', icon: <RewardIcon />},
    {name: 'Add Goal', link:'', icon: <GoalIcon />},
    {name: 'Email', link:'', icon: <MailIcon />},
    {name: 'Resend Invite', link:'', icon: <ResendIcon />},
    {name: 'Deactivate', link:'', icon: <DeactivateIcon />},
    {name: 'Import', link:'', icon: <ImportIcon />},
    {name: 'Peer Allocation', link:'', icon: <PeerIcon />},
]

const ProgramUsers = ( {program, organization} ) => {
    const [modalName, setModalName] = useState(null)
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentRow, setCurrentRow] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        getUsers(organization.id, program.id)
          .then(items => {
            if(mounted) {
                setUsers(items)
                setLoading(false)
            }
          })
        return () => mounted = false;
    }, [])
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
                  <span className={`action-item ${item.name}`}>{item.icon}{item.name}</span>
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
    const data = React.useMemo(() => USERS_DATA, [])
    const { getTableProps, headerGroups, rows, prepareRow } 
        = useTable({ columns, data})

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
        )
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
                    <div className='wrapper'>
                        <SearchIcon className='icon' size={36}></SearchIcon>
                        <input className='input' placeholder='search'></input>
                    </div>
                </div>
                <UserTable />
            </div>
            <div className='my-3 status'>
                <span>
                Showing 1 to 12 of 18 entries 
                </span>
                <span>
                1 Participant(s) selected
                </span>
            </div>
            <ModalWrapper user={currentRow} name={modalName} isOpen={isOpen} setOpen={setOpen} toggle={toggle} />
        </>
    )
}

export default ProgramUsers