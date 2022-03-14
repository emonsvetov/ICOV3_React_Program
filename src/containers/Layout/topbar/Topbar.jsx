import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';
import { Container
 } from 'reactstrap';
const Topbar = () => (
  <Container className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <Link className="topbar__logo" to="/" />
      </div>

      <nav className="topbar__nav">
        <ul className="horizontal">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-account" className="link">
              MY ACCOUNT
            </Link>
          </li>
          <li>
            <Link to="/my-gift-codes" className="link">
              MY GIFT CODES
            </Link>

          </li>
          <li>
            <Link to="/my-points" className="link">
              MY POINTS
            </Link>
        
          </li>
          <li>
            <Link to="/my-goals" className="link">
              MY GOALS
            </Link>
        
          </li>
          <li>
            <Link to="/faqs" className="link">
              FAQS
            </Link>
          </li>
          <li>
            <Link onClick={() => alert('Are you sure?')} to="/" className="link">
              SIGN OUT
            </Link>
          </li>
        </ul>
      </nav>

      <div className="topbar__right">
        <TopbarProfile />
      </div>
    </div>
  </Container>
);

export default Topbar;
