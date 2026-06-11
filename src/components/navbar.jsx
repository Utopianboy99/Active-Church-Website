// import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import logo from '../../public/TACLogo.svg'
import DiagonalArrowRightUpOutlineIcon from '@iconify-react/eva/diagonal-arrow-right-up-outline';


function Navbar() {
  return (
    <>
      <nav>

        <div id='logo'>
          <img src={logo} alt="Active Church Logo" />
        </div>

        <div id='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/sermons">Sermons</Link>
          <Link to="/events">Events</Link>
          <Link to="/watch-live">Watch Live</Link>
          <Link to="/connect">Connect</Link>
        </div>

          <Link to="/new" id='nav-btn'>
          
          <p>I'm New</p>

          <DiagonalArrowRightUpOutlineIcon height="1.4em" />
          </Link>

      </nav>
    </>
  )
}

export default Navbar
