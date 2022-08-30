import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarToggler,Collapse, Nav, 
         } from 'reactstrap';
import {Field} from "react-final-form";
import TemplateButton from "@/shared/components/TemplateButton"

const LINKS = [
  { to: 'onClickLogin', text: 'Sign in', desc : 'Returning users enter here' },
  { to: '', text: 'Sign up', desc: 'First time users start here' },
];

const HomeTopbar = ({onClickLogin, onClickSignup, template}) => {

  const [isOpen, setOpen] = useState(false);
  const toggle = ()=>{
    setOpen( prev => !prev) 
  }
  
  if( !template ) return 'Loading...'
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;

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
                        <TemplateButton
                          className="text-uppercase item width100 lg"
                          onClick={item.to ? onClickLogin : onClickSignup}
                          text={item.text}
                        />
                    </div>

            })}
            
          </Nav>
            
      </Collapse>
      

    </Navbar>
    </div>
  </div>
  )
};

const mapStateToProps = (state) => {
  return {
      template: state.template
  };
};

export default connect(mapStateToProps)(HomeTopbar);

// export default HomeTopbar;
