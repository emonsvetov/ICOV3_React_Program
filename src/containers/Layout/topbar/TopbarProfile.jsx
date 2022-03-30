import React, { useState } from 'react';
import DownIcon from 'mdi-react/MenuDownIcon';
import { Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import {logout, getAuthUserFullname} from '../../App/auth';

const Ava = `${process.env.PUBLIC_URL}/img/avatar/avar.png`;

const TopbarProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="topbar__profile">
      <UncontrolledDropdown
            inNavbar
            nav
          >
        <DropdownToggle
          caret
          nav
        >
          Welcome back {getAuthUserFullname()}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>
            My Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem  onClick={()=>{
            if(window.confirm('Are you sure to log out?')) {
              logout()
            }}}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      
      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink title="Dashboard" icon="list" path="/" />
          <div className="topbar__menu-divider" />
          <TopbarMenuLink title="Log Out" icon="exit" path="" onClick={()=>{
            if(window.confirm('Are you sure to log out?')) {
              logout()
            }}} />
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
