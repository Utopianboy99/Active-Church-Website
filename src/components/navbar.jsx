import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './styles.css'
import logo from '/TACLogo.svg'
import DiagonalArrowRightUpOutlineIcon from '@iconify-react/eva/diagonal-arrow-right-up-outline';

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className={`mobile-backdrop ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />

      <nav className={menuOpen ? 'nav-open' : ''}>
        <div className='nav-row'>
          <Link to='/' id='logo' onClick={closeMenu}>
            <img src={logo} alt="Active Church Logo" />
          </Link>

          <button
            type='button'
            className='mobile-menu-btn'
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label='Toggle navigation'
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div id='nav-links' className={menuOpen ? 'open' : ''}>
            <button type='button' className='drawer-close-btn' onClick={closeMenu} aria-label='Close navigation'>×</button>
            <NavLink to='/' onClick={closeMenu}>Home</NavLink>
            <NavLink to='/sermons' onClick={closeMenu}>Sermons</NavLink>
            <NavLink to='/events' onClick={closeMenu}>Events</NavLink>
            <NavLink to='/watch-live' onClick={closeMenu}>Watch Live</NavLink>
            <NavLink to='/connect' onClick={closeMenu}>Connect</NavLink>

            {location.pathname !== '/connect' && (
              <Link to='/connect' className='mobile-nav-btn' onClick={closeMenu}>
                <p>I'm New</p>
                <DiagonalArrowRightUpOutlineIcon height="1.4em" />
              </Link>
            )}
          </div>

          {location.pathname !== '/connect' && (
            <Link to='/connect' className='desktop-nav-btn' onClick={closeMenu}>
              <p>I'm New</p>
              <DiagonalArrowRightUpOutlineIcon height="1.4em" />
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
