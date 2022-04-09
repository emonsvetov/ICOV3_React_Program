import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

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
import AddEventPopup from './components/AddEventPopup';
import AddGoalPlanPopup from './components/AddGoalPlanPopup';

import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import SelectProgram from '../components/SelectProgram'

const LINKS = [
  { to: '#events', text: 'Events' },
  { to: '#expired', text: 'Expired Goal Plans' },
  { to: '#active', text: 'Active Goal Plans' },
  { to: '#future', text: 'Future Goal Plans' },
  { to: '#leaderboards', text: 'Leaderboards' },
];

const ProgramSettings = ( {auth, program, organization} ) => {
  // console.log(auth)
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showAddGoalPopup, setShowAddGoalPopup] = useState(false);
  const [events, setEvents] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const popupToggle = () => {
    setShowAddPopup(prevState => !prevState);
  };
  const goalPopupToggle = () => {
    setShowAddGoalPopup(prevState => !prevState);
  };

  const RenderActions = ({row}) => {
    return (
        <span>
            <Link to={{}} onClick={(e) => {}}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
            <span style={{width:'2.5rem', display: 'inline-block'}}></span>
            <Link to={{}} className='delete-column' onClick={(e) => {if(window.confirm('Are you sure to delete this Event?')){onDeleteEvent(e, row.original.id)}}}><TrashIcon style={{marginRight: "0.5rem"}}/>Delete</Link>
        </span>
    )
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
      `/organization/${organization.id}/program/${program}/event/?minimal=true`
      );
      console.log(response)
      if( response.data.length === 0) return {results:[],count:0}
      // const data = {
      //     // results: renameChildrenToSubrows(response.data.data),
      //     // count: response.data.total
      // };
      // console.log(response.data)
      return response.data;
  } catch (e) {
      throw new Error(`API error:${e?.message}`);
  }
  }

  const onDeleteEvent = (e, event_id) => {
  }

  let final_columns = [
    ...EVENTS_COLUMNS, 
    ...[{
        Header: "Actions",
        accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => <RenderActions row={row} />,
    }]
  ]

  useEffect( () => {
    if( (organization && program) && !events ) {
      setEvents(fetchEvents(organization, program))
    }
    
  },[organization, program, setEvents, fetchEvents])

  const columns = React.useMemo( () => final_columns, [])
  const data = React.useMemo(() => EVEMTS_DATA, [])
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data})  

  if( !auth || !program  || !organization) return 'Loading...'

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
                <SelectProgram />
            </Col>
          </Col>
        </Row>
      </Container>
      <div className='navbar mb-3'>
        <nav className="navs">
            <ul className="horizontal">
              {LINKS.map((item, index) =>{
                  return <li key={index}>
                    <NavLink href={item.to} onClick={() =>setActiveTab(index)} className={activeTab == index ? "active": ""}>
                      {item.text}
                    </NavLink>
                </li>
              })}
            </ul>
        </nav>
      </div>  
      <Container className='settingboard'>
        <div className={activeTab != 0 ? "d-none": ""} id="events">
          <div className='my-3 d-flex justify-content-between'>
            <h3 >Events</h3>
            <Button color='danger' onClick={()=> popupToggle()}>Add New Event</Button>
          </div>
          <div className='event-table'>
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
        <div className={activeTab != 1 ? "d-none": ""} id="expired">
          <div className='my-3 d-flex justify-content-between'>
            <h3 >Goal Plans</h3>
            <Button color='danger' onClick={()=> goalPopupToggle()}>Add New Goal Plan</Button>
          </div>
        </div>
      </Container>
      {showAddPopup && <AddEventPopup onCancelHandler={popupToggle}/>}
      {showAddGoalPopup && <AddGoalPlanPopup onCancelHandler={goalPopupToggle}/>}
    </div>
)}

const mapStateToProps = (state) => {
  return {
     auth: state.auth,
     program: state.program,
     organization: state.organization,
  };
};

export default connect(mapStateToProps)(ProgramSettings);