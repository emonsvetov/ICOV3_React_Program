import React from 'react'
import { Link } from 'react-router-dom'
import '../../../scss/component/pageNotFound.scss'


const PageNotFound = () => {
  return (
    <>
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Oops! Looks like you've ventured into unknown path.</p>
      <p className="not-found-message">Let's get you back on track:</p>
      <Link to="/" className="home-link">Go to Home Page</Link>
    </div>

    </>
  )
}

export default PageNotFound;
