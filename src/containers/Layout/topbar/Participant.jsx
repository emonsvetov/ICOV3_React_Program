import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container, Navbar, NavbarBrand, NavbarToggler, Dropdown,
        Collapse, Nav, NavItem, UncontrolledDropdown,
        DropdownToggle, DropdownItem, NavbarText, DropdownMenu
         } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;
const LINKS = [
  { to: '/participant/home', text: 'Home' },
  { to: '/participant/my-account', text: 'My Account' },
  { to: '/participant/my-gift-codes', text: 'My Gift Codes' },
  { to: '/participant/my-points', text: 'My Points' },
  { to: '/participant/my-goals', text: 'My Goals' },
  { to: '/participant/faqs', text: 'FAQs' },
];

const ParticipantTopbar = () => (
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

export default ParticipantTopbar;
