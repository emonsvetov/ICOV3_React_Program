import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container, NavbarBrand, NavbarToggler, Collapse, Nav, Navbar, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavbarText } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

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
            <DropdownMenu end>
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
    </Navbar>
  </div>
)}

export default ManagerTopbar;
