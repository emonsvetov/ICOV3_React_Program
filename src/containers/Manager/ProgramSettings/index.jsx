import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { 
  Col, 
  Container, 
  Row, 
  Table,
  FormGroup, 
  Input,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';

import { EVENTS_COLUMNS, EVEMTS_DATA  } from './components/Mockdata';
import { useTable } from 'react-table'
import AddGoalPopup from './components/AddGoalPopup';

const LINKS = [
  { to: '#events', text: 'Events' },
  { to: '#expired', text: 'Expired Goal Plans' },
  { to: '#active', text: 'Active Goal Plans' },
  { to: '#future', text: 'Future Goal Plans' },
  { to: '#leaderboards', text: 'Leaderboards' },
];

const ProgramSettings = () => {

  const [showAddPopup, setShowAddPopup] = useState(false);
  const popupToggle = () => {
    setShowAddPopup(prevState => !prevState);
  };
  const RenderActions = ({row}) => {
    return (
        <span>
            <Link to={{}} onClick={(e) => {}}>Edit</Link> 
            <span style={{width:'15px', display: 'inline-block'}}></span>
            <Link to={{}} className='delete-column' onClick={(e) => {if(window.confirm('Are you sure to delete this Event?')){onDeleteEvent(e, row.original.id)}}}>Delete</Link>
        </span>
    )
  }

  const onDeleteEvent = (e, event_id) => {
    
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

  const columns = React.useMemo( () => final_columns, [])
  const data = React.useMemo(() => EVEMTS_DATA, [])
  const { getTableProps, headerGroups, rows, prepareRow } 
      = useTable({ columns, data})  

  return (
    <div className='program-settings'>
      <Container>
        <Row className='mt-4'>
          <Col md={10}>
            <h3>Program Settings</h3>
            <span>
              Customize your settings for your own unique program. You can create and/or select reward events and insert the default reward dollar value for each event. You can also create a templated reward message for each event.
            </span>
            <Col md={4} className="d-flex program-select my-3">
              <span>For Program:</span>
              <FormGroup>  
                <Input type="select" name="program" id="program-select">
                  <option>301166: Incentco</option>
                </Input>
              </FormGroup>
            </Col>
          </Col>
        </Row>
      </Container>
      <div className='navbar mb-3'>
        <nav className="navs">
            <ul className="horizontal">
              {LINKS.map((item, index) =>{
                  return <li key={index}>
                    <NavLink href={item.to} className={index == 0 ? "active": ""}>
                      {item.text}
                    </NavLink>
                </li>
              })}
            </ul>
        </nav>
      </div>  
      <Container className='managerboard'>
        <div className='events' id="events">
          <div className='my-3 d-flex justify-content-between'>
            <h3 >Events</h3>
            <Button color='danger' onClick={()=> popupToggle()}>Add New Event</Button>
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
      </Container>
      {showAddPopup && <AddGoalPopup onCancelHandler={popupToggle}/>}
    </div>
)}

export default ProgramSettings;
