import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container, Navbar, NavbarBrand, NavbarToggler, Dropdown,
        Collapse, Nav, NavItem, NavLink, UncontrolledDropdown,
        DropdownToggle, DropdownItem, NavbarText, DropdownMenu
         } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;
const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/my-account', text: 'My Account' },
  { to: '/my-gift-codes', text: 'My Gift Codes' },
  { to: '/my-points', text: 'My Points' },
  { to: '/my-goals', text: 'My Goals' },
  { to: '/faqs', text: 'FAQs' },
];

const Topbar = () => (
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
                <Link to={item.to} className="link">
                  {item.text}
                </Link>
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

export default Topbar;
