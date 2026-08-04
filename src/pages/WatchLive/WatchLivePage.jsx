import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import './WatchLiveStyles.css'
import CalendarIcon from '@iconify-react/iconoir/calendar';
import RadioIcon from '@iconify-react/lucide/radio';
import DiagonalArrowRightUpOutlineIcon from '@iconify-react/eva/diagonal-arrow-right-up-outline';
import { Link } from 'react-router-dom';


const YOUTUBE_URL = 'https://www.youtube.com/@YourChannelHandle/live' // ← replace this

const SERVICES = [
  { day: 5, label: 'Friday Evening Service', time: '19:00', displayTime: '7:00 PM' },
  { day: 0, label: 'Sunday Service', time: '09:00', displayTime: '9:00 AM' },
]

function getNextService(now) {
  const results = SERVICES.map(({ day, label, time, displayTime }) => {
    const [hour, min] = time.split(':').map(Number)
    const next = new Date(now)
    next.setHours(hour, min, 0, 0)

    let daysUntil = (day - now.getDay() + 7) % 7
    // If it's the same day but the service hasn't started yet, daysUntil = 0
    // If it's the same day but service has passed, push to next week
    if (daysUntil === 0 && now >= next) daysUntil = 7
    next.setDate(next.getDate() + daysUntil)

    return { label, displayTime, day, time, next, msUntil: next - now }
  })

  return results.sort((a, b) => a.msUntil - b.msUntil)[0]
}

function isLiveNow(now) {
  // Consider "live" for 2 hours after service start time
  const LIVE_WINDOW_MS = 2 * 60 * 60 * 1000
  return SERVICES.find(({ day, time }) => {
    if (now.getDay() !== day) return false
    const [hour, min] = time.split(':').map(Number)
    const start = new Date(now)
    start.setHours(hour, min, 0, 0)
    return now >= start && now - start < LIVE_WINDOW_MS
  })
}

function pad(n) { return String(Math.floor(n)).padStart(2, '0') }

export default function WatchLivePage() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const now = new Date()
  const liveService = isLiveNow(now)
  const next = getNextService(now)

  const msLeft = next.msUntil
  const days = Math.floor(msLeft / 86400000)
  const hours = Math.floor((msLeft % 86400000) / 3600000)
  const minutes = Math.floor((msLeft % 3600000) / 60000)
  const seconds = Math.floor((msLeft % 60000) / 1000)

  const otherService = SERVICES.find(s => s.label !== next.label)

  return (
    <>
      <Helmet>
        <title>Watch Live | The Active Church, Johannesburg</title>
        <meta name="description" content="Watch The Active Church services live online from Johannesburg. Join our Sunday and Friday gatherings from anywhere." />
        <link rel="canonical" href="https://theactivechurch.org/watch-live" />
        <meta property="og:title" content="Watch Live at The Active Church" />
        <meta property="og:image" content="https://theactivechurch.org/og-watch-live.jpg" />
      </Helmet>

      <Navbar />

      <section className="watch-live-section">
        <div className="wl-intro">
          <div className="wl-intro__inner">
            <span className="wl-eyebrow">THE GATHERING</span>
            <h1 className="wl-heading">EVENTS</h1>
            <p className="wl-subheading">
              From Sunday worship to community serve days, there's always
              something happening at The Active Church.
            </p>
          </div>
        </div>
        <div className="wl-timer-sect">
          <div className="cnt-dwn-timer">
            <div className="cnt-dwn-timer-blk">
              {liveService ? (
                <div className="live-state">
                  <span className="live-badge">
                    <span className="live-dot" />
                    Live now
                  </span>
                  <h2 className="live-label">{liveService.label}</h2>
                  <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="join-btn">
                    Watch on YouTube
                    <DiagonalArrowRightUpOutlineIcon height="1.1em" />
                  </a>
                </div>
              ) : (
                <div className="countdown-state">
                  <p className="next-label">Next: {next.label} — {next.displayTime}</p>
                  <div className="countdown-units">
                    <div className="unit">
                      <div className="unit-card">
                        <span className="unit-num">{pad(days)}</span>
                      </div>
                      <span className="unit-label">Days</span>
                    </div>
                    <span className="unit-sep">:</span>
                    <div className="unit">
                      <div className="unit-card">
                        <span className="unit-num">{pad(hours)}</span>
                      </div>
                      <span className="unit-label">Hours</span>
                    </div>
                    <span className="unit-sep">:</span>
                    <div className="unit">
                      <div className="unit-card">
                        <span className="unit-num">{pad(minutes)}</span>
                      </div>
                      <span className="unit-label">Min</span>
                    </div>
                    <span className="unit-sep">:</span>
                    <div className="unit">
                      <div className="unit-card">
                        <span className="unit-num">{pad(seconds)}</span>
                      </div>
                      <span className="unit-label">Sec</span>
                    </div>
                  </div>
                  {otherService && (
                    <p className="also-label">
                      Also streaming: <br/> {otherService.label} at {otherService.displayTime}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="cnt-blks">
            <div className="cnt-blks-cards blk-1">
              <CalendarIcon height='2em' style={{ color: 'blue' }} />
              <h2>Live Schedule</h2>
              <p>Sundays at 9 AM</p>
              <p>Fridays at 6 PM</p>
            </div>
            <div className="cnt-blks-cards blk-2">
              <RadioIcon height="2em" style={{ color: '#f00' }} />
              <h2>Missed a Service ?</h2>
              <p>
                All our services are recorded and available in our <br />
                sermon archive.
              </p>
              <Link to='/sermons'>Browse Sermon <br /> <DiagonalArrowRightUpOutlineIcon height='1.2em' /> </Link>

            </div>
          </div>

        </div>


      </section>

      <Footer />
    </>
  )
}