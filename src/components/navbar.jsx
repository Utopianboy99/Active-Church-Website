// import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Navbar() {
  return (
    <>
      <nav>

        <div id='logo'></div>

        <div id='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/sermons">Sermons</Link>
          <Link to="/events">Events</Link>
          <Link to="/watch-live">Watch Live</Link>
          <Link to="/connect">Connect</Link>
        </div>

        <div id='nav-btn'>

          <Link to="/new">I'm New</Link>
        </div>

      </nav>
    </>
  )
}

export default Navbar
