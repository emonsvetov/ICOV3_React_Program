import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { 
  Col, 
  Container, 
  Row, 
  Table,
  FormGroup,
  Input,
  Dropdown, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

import { USERS_COLUMNS, USERS_DATA  } from './components/Mockdata';
import { useTable } from 'react-table'
import GiveRewardPopup from './components/GiveRewardPopup';
import SearchIcon from 'mdi-react/SearchIcon';
import MailIcon from 'mdi-react/PostItNoteAddIcon';
const ACTIONS = [
  {name: 'Reward', link:''},
  {name: 'Add Goal', link:''},
  {name: 'Email', link:''},
  {name: 'Resend Invite', link:''},
  {name: 'Deactivate', link:''},
  {name: 'Peer Allocation', link:''},
]
const ManageAndReward = () => {

  const [showAddPopup, setShowAddPopup] = useState(false);
  const popupToggle = () => {
    setShowAddPopup(prevState => !prevState);
  };
  const RenderActions = ({row}) => {
    return (
        ACTIONS.map((item, index) =>{
          return <span key={index} onClick={item.name == 'Reward'? popupToggle: ""}>
              <span className={`action-item ${item.name}`}><MailIcon />{item.name}</span>
              <span style={{width:'5px', display: 'inline-block'}}></span>
          </span>
        })
    )
  }

  const onDeleteEvent = (e, event_id) => {
    
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

  return (
    <div className='manage-reward'>
      <Container>
        <div style={{color:'white'}}>
          <h3>Manage & Reward</h3>
          <div>You can search for users by name, email or unit/suite number(if applicable), reward users instantly, or deactivate an account.</div>
          <div>You can also select or multiple users from the list to send an email</div>

        </div>
        <div className='my-4 d-flex program-select justify-content-between'>
          <div className="d-flex">
            <span>For Program:</span>
            <FormGroup className='mt-3'>  
              <Input type="select" name="program" id="program-select">
                <option>301166: Incentco</option>
              </Input>
            </FormGroup>
          </div>
          <div className='d-flex'>
            <SearchIcon size={36} className='icon'/>
            <span>Search in all Programs</span>
          </div>
        </div>
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
        </div>
        <div className='my-3 status'>
          <span>
          Showing 1 to 12 of 18 entries 
          </span>
          <span>
          1 Participant(s) selected
          </span>
        </div>
      </Container>
      {showAddPopup && <GiveRewardPopup onCancelHandler={popupToggle}/>}

    </div>
)}

export default ManageAndReward;
