import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => (
  <footer>
      
      <Container className='footer__wrapper'>
        <Row>
            <div className='col-md-6 copyright'>
                Copyright 2022 <span style={{color: "#FDC107"}}>Incencto</span> LLC.All Rights Reserved.
            </div> 
            <nav className="col-md-6 teritery-menu">
                <ul className="horizontal">
                    <li>
                        <Link to="/" className="link">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="link">
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="link">
                            Terms and Conditions
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="link">
                            FAQs
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="link">
                            Support Request
                        </Link>
                    </li>
                </ul>
            </nav>
        </Row>        
    </Container> 

  </footer>
);

export default Footer;
