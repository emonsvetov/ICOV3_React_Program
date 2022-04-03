import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import { Container, Navbar, NavbarBrand, NavbarToggler, Dropdown,Collapse, Nav, 
         } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;
const LINKS = [
  { to: '/login', text: 'Sign in' },
  { to: '/register', text: 'Sign up' },
];

const HomeTopbar = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = ()=>{
    setOpen( prev => !prev) 
  }
  return (
  <div className="topbar">
    <Container className="topbar__wrapper">
      
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
      

    </Navbar>
    </Container>
  </div>
  )
};

export default HomeTopbar;
