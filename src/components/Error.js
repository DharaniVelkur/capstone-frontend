import React from 'react'
import { NavLink } from 'react-router-dom';
import './error.css'

const Error = () => {
  return (
    <div id="notfound">
  <div class="notfound">
    <div class="notfound-404">
      <h1>4<span></span>4</h1>
    </div>
    <h2>Oops! Page Not Found</h2>
    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
    <NavLink to={'/'}>Back to homepage</NavLink>
  </div>
</div>
  )
}

export default Error
