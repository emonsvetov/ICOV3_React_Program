import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container } from 'reactstrap';
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

const ManagerTopbar = () => (
  <Container className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <Link className="link" to="/" >
            <img src={Brand}/>
        </Link>
      </div>

      <nav className="topbar__nav">
        <ul className="horizontal">
          {LINKS.map((item, index) =>{
              return <li key={index}>
                <NavLink to={item.to} className="link">
                  {item.text}
                </NavLink>
            </li>
          })}
        </ul>
      </nav>
          
      <div className="topbar__right">
        <TopbarProfile />
      </div>
    </div>

    {/* <Navbar
      color=""
      expand
      fixed=""
      full
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
          <NavItem>
            <NavLink href="/home">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/my-account">
              My Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/my-gift-codes">
              My Gift Codes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/my-points">
              My Points
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/my-goals">
              My Goals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/faqs">
              FAQs
            </NavLink>
          </NavItem>
          <UncontrolledDropdown
            inNavbar
            nav
          >
            <DropdownToggle
              caret
              nav
            >
              Welcome back
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                My Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>
          Simple Text
        </NavbarText>
      </Collapse>
    </Navbar> */}
  </Container>
);

export default ManagerTopbar;
