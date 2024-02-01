import React from 'react'
import { Link } from 'react-router-dom'
import '../../../scss/component/pageNotFound.scss'


const UserNotFound = () => {
  return (
    <>
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Oops! It seems we couldn't find your user in the system.</p>
      <p className="not-found-message">Let's assist you in returning:</p>
      <Link to="/login" className="home-link">Go to Home Page</Link>
    </div>

    </>
  )
}

export default UserNotFound;
