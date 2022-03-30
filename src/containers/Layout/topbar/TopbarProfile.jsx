import React, { useState } from 'react';
import DownIcon from 'mdi-react/MenuDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import {logout, getAuthUserFullname} from '../../App/auth';

const Ava = `${process.env.PUBLIC_URL}/img/avatar/avatar.jpg`;

const TopbarProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={()=>setIsCollapsed(false)}>
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <div className='d-flex flex-column pt-1'>
          <small>Welcome back</small>
          <span className="topbar__avatar-name">{'Jay!'}</span>
        </div>
          <DownIcon className="mt-3 ml-3 topbar__icon" />
      </button>
      
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
          <TopbarMenuLink title="Log Out" icon="exit" path="" onClick={logout} />
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
