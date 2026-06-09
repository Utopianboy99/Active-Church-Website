// import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer>
                <div className='foot-logo'>

                </div>
                <div className='foot-links'>
                    <div className='link-sect'>

                        <div className='link-left link-box'>

                            <div className='left-box-text'>

                                <p>
                                    We are a movement of people who
                                    believe that
                                    <br />
                                    faith is active, love is tangible, and
                                    community
                                    <br />
                                    changes everything.
                                </p>

                            </div>
                            <div className='left-box-links'>
                                <div className='social-links'></div>
                                <div className='social-links'></div>
                                <div className='social-links'></div>
                            </div>

                        </div>
                        <div className='link-mid link-box'>
                            <h3>Explore</h3>
                            <div className="mid-links-list">

                            <Link to='/sermons'>Sermons</Link>
                            <Link to='/events'>Events</Link>
                            <Link to='/watch-live'>Watch Live</Link>
                            <Link to='/connect'>Connect</Link>

                            </div>
                        </div>
                        <div className='link-right link-box'></div>

                    </div>
                    <div className='foot-est'>
                        <p>© 2026 The Active Church. All rights reserved</p>
                        <p>Faith in motion</p>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer
