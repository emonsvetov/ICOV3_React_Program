import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container, NavbarBrand, NavbarToggler, Collapse, Nav, Navbar, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavbarText } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

const LINKS = [
  { to: '/manager/home', text: 'Home' },
  { to: '/manager/program-settings', text: 'Program Settings' },
  { to: '/manager/manage-and-reward', text: 'Manage and Reward' },
  { to: '/manager/view-reports', text: 'View Reports' },
  { to: '/manager/invite-new-participant', text: 'Invite New Participant' },
  { to: '/manager/referral-recipients', text: 'Referral Recipients' },
  { to: '/manager/team', text: 'Team' }
];

const ManagerTopbar = () => {

return (
  <div className="topbar">
    <Container className="topbar__wrapper">
      <div className="topbar__left">
        <Link className="link" to="/" >
            <img src={Brand}/>
        </Link>
      </div>
          
      <div className="topbar__right">
        <TopbarProfile />
      </div>
    </Container>

    <Navbar
      color=""
      expand
      fixed=""
      light
    >
      <NavbarBrand href="/">
        <img src={Brand}/>
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck(){}} />
      <Collapse navbar>
        <Nav
          className="me-auto"
          navbar
        >
          {LINKS.map((item, index) =>{
              return(
                <NavItem key={`manager-item-${index}`}>
                  <NavLink href={item.to} className="link">
                    {item.text}
                  </NavLink>
                </NavItem>)
          })}
        </Nav>
      </Collapse>
    </Navbar>
  </div>
)}

export default ManagerTopbar;
