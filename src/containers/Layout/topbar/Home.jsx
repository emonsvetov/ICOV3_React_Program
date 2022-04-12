import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Container, NavLink, Navbar, NavbarBrand, NavbarToggler, Dropdown,Collapse, Nav, 
         } from 'reactstrap';
const Brand = `${process.env.PUBLIC_URL}/img/logo/big_logo.png`;
const LINKS = [
  { to: 'onClickHandle', text: 'Sign in', desc : 'Returning users enter here' },
  { to: '', text: 'Sign up', desc: 'First time users start here' },
];

const HomeTopbar = ({onClickHandle}) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = ()=>{
    setOpen( prev => !prev) 
  }
  return (
  <div className="topbar home">
    <div className="topbar__wrapper">
      
    <Navbar
      color=""
      expand="md"
      fixed=""
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
            {LINKS.map((item, index) => {
              return <div key={index} className='flex-column mx-3'>
                        <span>{item.desc}</span>
                        <div className='text-uppercase text-center item' onClick={item.to ? onClickHandle : ""}>
                          {item.text}
                        </div>  
                    </div>

            })}
            
          </Nav>
            
      </Collapse>
      

    </Navbar>
    </div>
  </div>
  )
};

export default HomeTopbar;
