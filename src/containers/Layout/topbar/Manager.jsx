import React, {useState} from 'react';
import { Link, NavLink  } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container, NavbarBrand, NavbarToggler, Collapse, Nav, Navbar } from 'reactstrap';
import './style.scss'
const Brand = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

const LINKS = [
  { to: '/manager/home', text: 'Home' },
  { to: '/manager/program-settings', text: 'Program Settings' },
  { to: '/manager/manage-and-reward', text: 'Manage and Reward' },
  { to: '/manager/view-reports', text: 'View Reports' },
  { to: '/manager/invite-participant', text: 'Invite New Participant' },
  { to: '/manager/referral-recipients', text: 'Referral Recipients' },
  { to: '/manager/team', text: 'Team' }
];

const ManagerTopbar = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = ()=>{
    setOpen( prev => !prev) 
  }
  return (
  <div className="topbar">
    <Container fluid className="topbar__wrapper">

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

export default ManagerTopbar;
