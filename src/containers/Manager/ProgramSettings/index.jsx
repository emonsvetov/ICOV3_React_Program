import React, {useState} from 'react';
import { connect } from 'react-redux';

import {
  Col, 
  Container, 
  Row, 
  NavLink,
  Button,
} from 'reactstrap';

import AddEventPopup from './components/AddEventPopup';
import SelectProgram from '../components/SelectProgram'
import Events from './components/Events'
import {isEmpty} from '@/shared/helper'

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

  const popupToggle = () => {
    setShowAddPopup(prevState => !prevState);
  };

  // console.log(program)
  // console.log(organization)

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
              {auth && program && !isEmpty(organization) && <Events program={program} organization={organization} />}
          </div>      
        </div>
      </Container>
      {showAddPopup && <AddEventPopup onCancelHandler={popupToggle} program={program} organization={organization}/>}
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