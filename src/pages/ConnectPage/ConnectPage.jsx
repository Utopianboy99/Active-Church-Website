import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import './ConstactStyles.css'
import PinLineIcon from '@iconify-react/si/pin-line';
import Time4Icon from '@iconify-react/subway/time-4';
import MailOutlineIcon from '@iconify-react/material-symbols/mail-outline';
import { Link } from 'react-router-dom';
import SendIcon from '@iconify-react/mynaui/send';



function ConnectPage() {
  return (
    <>
      <Navbar />
      <section className="contactsect">
        <div className="dividers">

          <div className="cont-intro">
            <div className="cont-intro__inner">
              <span className="cont-eyebrow blue">CONNECT</span>
              <h1 className="cont-heading">LET'S <br /><span className='blue'>CONNECT</span></h1>
              <p className="cont-subheading">
                Whether you're exploring faith for the first time or
                looking for a community to call home, we're here
                <br />
                for you.
              </p>
            </div>
          </div>

          <div className="count-left-mid">
            <div className="mid-cards">
              <span className="icon">
                <PinLineIcon height='2em' style={{color : 'blue'}}/>
              </span>
              <div className="mid-text">

              <h4>72 Marlborough Road</h4>
              <p>Springfield, Johannesburg</p>
              </div>
            </div>
            <div className="mid-cards">
              <span className="icon">
                <Time4Icon height='2em' style={{color : 'blue'}}/>
              </span>
              <div className="mid-text">

              <h4>Sundays 9AM</h4>
              <p>Fridays 6pm</p>
              </div>
            </div>
            <div className="mid-cards">
              <span className="icon">
                <MailOutlineIcon height='2em' style={{color : 'blue'}}/>
              </span>
              <div className="mid-text">

              <h4>info@thesctivechurch.org</h4>
              </div>
            </div>
          </div>

          <div className="left-img">
            
          </div>
        </div>



        <div className="dividers right-divider">
          <form action="" className='form'>
            <span className="form-txt-head">
              <h2>Get In Touch</h2>
              <p>Fill out the form and we'll be in touch.</p>
            </span>
            <label htmlFor=""> Your Name <br />
              <input type="text" placeholder='John Doe'/>
            </label>
            <label htmlFor=""> Email Address <br />
              <input type="text" placeholder='john@example.com'/>
            </label>
            <label htmlFor=""> Phone Number <br />
              <input type="text" placeholder='067 654 3219'/>
            </label>
            <label htmlFor="" id='fieldset'> Message <br />
              <fieldset aria-placeholder='Tell us more...'>

              </fieldset>
            </label>
            <Link to=' ' id='frm-btn'>
              Send Message <SendIcon height='1.3em'/>
            </Link>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ConnectPage
