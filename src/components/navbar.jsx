// import React from 'react'
import { Link, NavLink } from 'react-router-dom'
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sermons">Sermons</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/watch-live">Watch Live</NavLink>
          <NavLink to="/connect">Connect</NavLink>
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
