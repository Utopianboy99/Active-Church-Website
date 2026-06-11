import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import './styles.css'
import ArrowRightOutlineIcon from '@iconify-react/solar/arrow-right-outline';
import CalendarIcon from '@iconify-react/iconoir/calendar';
import PinLineIcon from '@iconify-react/si/pin-line';
import DiagonalArrowRightUpOutlineIcon from '@iconify-react/eva/diagonal-arrow-right-up-outline';
import Time4Icon from '@iconify-react/subway/time-4';
import img3 from '/SnapInsta.to_504806520_18326229370205809_8636710689607754357_n.png'
import logo from '/TACLogo.svg'


function HomePage() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="hero">
          <div className='hero-txt-main'>
            <h1>
              Wlecome to <br />
              The Active Church
            </h1>
          </div>
          <div className='hero-botom'>
            <div className='hero-btm-text'>
              <p>
                A Church That is as alive and <br />
                vibrant as it's name

              </p>
            </div>
            <div className='hero-btm-btns'>
              <Link to=''>
                Join the Movemeent
                <ArrowRightOutlineIcon height="1em" />
              </Link>
              <Link to='/service'>
                Watch Live
              </Link>
            </div>
          </div>
        </section>

        <section className="about">
          <div>

            <h1>
              We are a nation within the <br />
              nation of <span className='blue'>Soutn Africa.</span> <br />
              We are the nation that <br />
              belongs to the <span className='blue'>Kingdom of </span><br />
              <span className='blue'>God.</span> We are Actively  <br />
              Kingdom minded
            </h1>
            <div className='bout-elvine'>

            </div>
          </div>
        </section>

        <section className="ministries">
          <div>

            <p className='red'>THE ARCHIVES</p>

            <span className='head-box'>

              <h1>Recent <span className='blue'> Messages </span></h1>
              <Link to='/sermons'>

                View All Sermons
                <ArrowRightOutlineIcon height="1em" />
              </Link>
            </span>


          </div>

          <div>
            {/* Carousel of the sermons from Youtube */}
          </div>
        </section>

        <section className="connect" id="connect">
          <div id='top' >

            <p className='blue connect-h1'> THE GATHERING</p>
            <span className='head-box'>
              <h1>What's <span className='blue'> Happening </span></h1>
              <Link to='/sermons'>View Events</Link>
            </span>
          </div>

          <div id='side-div'>
            <span id='right'>

              <div id='right-txt-box'>

                <p id='ths-week'>This Week</p>
                <h2>Sunday Service</h2>
                <div id='locate'>
                  <p>
                    <CalendarIcon height="1em" />
                    Sunday • 09:00 AM
                  </p>
                  <p>
                    <PinLineIcon height="1em" />
                    72 Marlborough Road
                  </p>
                </div>
              </div>
            </span>

            <span id='left'>

              <div id='Youth-div' className='min-box'>
                <div className='min-box-img'></div>
                <div className='min-box-txt' >
                  <h4>Youth Service</h4>
                  <p className='description'>Something about youth service</p>
                </div>
              </div>

              <div id='plan40-div' className='min-box'>
                <div className='min-box-img'></div>

                <div className='min-box-txt' >
                  <h4>Plan 40</h4>
                  <p className='description'>Something about youth service</p>
                </div>
              </div>

              <div id='lifeClass-div' className='min-box'>
                <div className='min-box-img'></div>
                <div className='min-box-txt' >
                  <h4>Life Class</h4>
                  <p className='description'>Something about youth service</p>
                </div>
              </div>

            </span>
          </div>
        </section>

        <section className='nxt-steps'>
          <div className="st-divs">

            <div className="st-div-left">
              <div className="left-float-div">
                <h3>Service Times</h3>
                <div className="serve-times">
                  <div className="day-times">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 512 512">
                      <path d="M0 0h512v512H0z" fill="none" />
                      <path fill="#0306ff" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m0 469.3c-117.8 0-213.3-95.5-213.3-213.3S138.2 42.7 256 42.7S469.3 138.2 469.3 256S373.8 469.3 256 469.3m-21.3-234.6H128v42.7h149.3v-192h-42.7v149.3z" />
                    </svg>
                    <div className="Sn-tim">
                      <p><b>Sundays </b></p>
                      9:00 AM
                    </div>
                  </div>
                  <div className="day-times">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 512 512">
                      <path d="M0 0h512v512H0z" fill="none" />
                      <path fill="#0306ff" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m0 469.3c-117.8 0-213.3-95.5-213.3-213.3S138.2 42.7 256 42.7S469.3 138.2 469.3 256S373.8 469.3 256 469.3m-21.3-234.6H128v42.7h149.3v-192h-42.7v149.3z" />
                    </svg>

                    <div className="fr-tim">
                      <p><b>Fridays </b></p>
                      6:00 PM
                    </div>
                  </div>
                  <div className="day-times">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.1em" height="2.1em" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path fill="#0306ff" d="M12 2a8 8 0 0 0-8 7.92c0 5.48 7.05 11.58 7.35 11.84a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2m0 17.65c-1.67-1.59-6-6-6-9.73a6 6 0 0 1 12 0c0 3.7-4.33 8.14-6 9.73" />
                      <path fill="#0306ff" d="M12 6a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 6m0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 11" />
                    </svg>

                    72 Marlborough Road
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="st-divs right">
            <div className="st-divs-right">

              <p className='blue'>YOUR NEXT STEP</p>
              <h1 className='st-div-h1'>
                YOU
                <br />
                BELONG
                <br />
                <span className='blue'>HERE.</span>
              </h1>
              <p className='st-div-p2'>
                Whether this is your first step into faith or you ve been <br />
                walking this path for decade there s a seat for you, a <br />
                community waiting and a purpose only you can fulfill.
              </p>

              <Link>
                Plan Your Visit
                <DiagonalArrowRightUpOutlineIcon height="1.4em" />
              </Link>
            </div>
          </div>
        </section>

        {/* =================== Giving Section ======================== */}
        <section className="giving-sect">
          <div className="give-divs left">
            <p className='give-head-txt blue p1'>WAYS TO GIVE</p>
            <h1 className='give-heading'>
              <span className='blue '>Support Our</span>
              <br />
              Vision
            </h1>
            <div className="give-blue-div">
              <p>
                If you'd like to give via electronic <br />
                transfer or direct deposit, please <br />
                use the bank details below:
              </p>
              <div className="bank-details">
                <p><b>Bank Name :</b> Nedbank </p>
                <p><b>Account Name :</b> Active Church</p>
                <p><b>Account Number :</b>  1385041315</p>
              </div>
              <p>
                Kindly use your name as the <br /> payment reference.
              </p>
            </div>
          </div>
          <div className="give-divs right"></div>
        </section>

        {/* ============== 2nd Last Sections ==================== */}

        <section className='the-2nd-last'>

          <div className="mid-box">
            <h1 className='min-box-h1'>
              <b>One Block</b><br />
              <span className="blue can-change">Can Change</span><br />
              <span className="txt-space">
                A Nation.
              </span>
            </h1>
            <p className='min-box-p'>
              This Church is Active In its families, In its community, in its city,<br />
              In fact it is Active everywhere.
            </p>
            <div className="mid-box-btns">
              <Link>
                I'm Ready

              </Link>
              <Link>
                Watch online
              </Link>
            </div>
          </div>

        </section>

        {/* ===================== Meet Our Pastors ============================= */}

        <section className='our-pastors'>

          <div>
            <h1 className='intro'>
              Meet 
              <span className="blue">Our Senior</span><br />
              <b>Pastors</b>
            </h1>
          </div>
          <div className='pastors'></div>
          <div className='ps-txt'>
            <p>Our Amazing Senior Pastors</p>
            <p><b>Pastor Gavin Enslin & Pastor Vicky Enslin</b></p>
          </div>

        </section>


      </main>
      <Footer />
    </>
  )
}

export default HomePage
