// import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import InstagramFillIcon from '@iconify-react/akar-icons/instagram-fill';
import YoutubeLineIcon from '@iconify-react/si/youtube-line';
import MailOutlineIcon from '@iconify-react/material-symbols/mail-outline';
import logo from '../../public/TACLogo.svg';


function Footer() {
    return (
        <>
            <footer>
                <div className='foot-logo'>
                    <img src={logo} alt='Active Church logo' className='footer-logo' />
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
                                <div className='social-links'>
                                    <InstagramFillIcon height="2em" />
                                </div>
                                <div className='social-links'>
                                    <YoutubeLineIcon height="2em" />
                                </div>
                                <div className='social-links'>
                                    <MailOutlineIcon height="2em" />
                                </div>
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
                        <div className='link-right link-box'>

                            <h3>Visit Us</h3>
                            <div className="right-links-list">

                                <p>72 Marlborough Road</p>
                                <p>Springfield, Johannesburg</p>
                                <p>Sunday 9AM</p>
                                <p>Fridays 6PM</p>

                            </div>

                        </div>

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
