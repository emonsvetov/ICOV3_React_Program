import React, { useState } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import {logout, getAuthUserFullname} from '../../App/auth';

const Ava = `${process.env.PUBLIC_URL}/img/avatar/avar.png`;

const TopbarProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    // setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={()=>setIsCollapsed(false)}>
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <div>
          <div>Welcome back</div>
          <div className="topbar__avatar-name">{'Jay!'}</div>
        </div>
          <DownIcon className="topbar__icon" />
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
