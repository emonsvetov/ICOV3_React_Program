import React, {useState} from 'react';
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

const ParticipantTopbar = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = ()=>{
    setOpen( prev => !prev) 
  }
  return (
  <div className="topbar">
    <Container className="topbar__wrapper">
      {/* <div className="topbar__left">
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
      </div> */}
    

    <Navbar
      color=""
      expand="md"
      fixed=""
      full
      light
    >
      <NavbarBrand href="/">
        <img src={Brand}/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar>
        
          <Nav
            className="horizontal"
            navbar
          >
            {LINKS.map((item, index) =>{
                return <NavLink key={index} to={item.to} className="link">
                    {item.text}
                  </NavLink>
            })}
            
          </Nav>
            
      </Collapse>
      
        <div className="topbar__right">
            <TopbarProfile />
          </div>
    </Navbar>
    </Container>
  </div>
  )
};

export default ParticipantTopbar;
