import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Points from './Points';
import Leaderboards from './Leaderboards';

const Sidebar = () => (
  <div className="sidebar">
    <Points />        
    <Leaderboards/>
  </div>
);

export default Sidebar;
