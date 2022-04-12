import React, {useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Col, 
  Container, 
  Row, 
  NavLink,
  Button,
} from 'reactstrap';

import AddEventPopup from './components/AddEventPopup';
import AddGoalPlanPopup from './components/AddGoalPlanPopup';

import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
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
  const [showAddGoalPopup, setShowAddGoalPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const popupToggle = () => {
    setShowAddPopup(prevState => !prevState);
  };
  const goalPopupToggle = () => {
    setShowAddGoalPopup(prevState => !prevState);
  };

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
          <div className='points-summary-table'>
              {auth && program && !isEmpty(organization) && <Events program={program} organization={organization} />}
          </div>      
        </div>
        <div className={activeTab != 1 ? "d-none": ""} id="expired">
          <div className='my-3 d-flex justify-content-between'>
            <h3 >Goal Plans</h3>
            <Button color='danger' onClick={()=> goalPopupToggle()}>Add New Goal Plan</Button>
          </div>
        </div>
      </Container>
      {showAddPopup && <AddEventPopup onCancelHandler={popupToggle} program={program} organization={organization}/>}
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