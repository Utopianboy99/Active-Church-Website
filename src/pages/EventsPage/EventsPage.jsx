import React, { useEffect, useRef } from 'react'
import './EventsStyles.css'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import PinLineIcon from '@iconify-react/si/pin-line';
import CalendarIcon from '@iconify-react/iconoir/calendar';



function EventsPage() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll('.event-cards'))
    const CARDS = cards.length
    const CARD_GAP = 18

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = Math.max(1, section.offsetHeight - window.innerHeight)
      const rawProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight))

      cards.forEach((card, i) => {
        const cardStart = i / CARDS
        const cardProgress = Math.max(0, Math.min(1, (rawProgress - cardStart) / (1 / CARDS)))

        const startY = i === 0 ? 0 : window.innerHeight * 0.25
        const endY = i * CARD_GAP
        const currentY = startY + (endY - startY) * cardProgress

        const scaleDown = 1 - (CARDS - 1 - i) * 0.02 * cardProgress
        const scale = i === CARDS - 1 ? 1 : scaleDown

        card.style.top = `${currentY}px`
        card.style.transform = `translateX(-50%) scale(${scale})`
        card.style.opacity = i === 0 ? 1 : Math.min(1, cardProgress * 3)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navbar />

      <section className="events-intro">
        <div className="events-intro__inner">
          <span className="events-eyebrow">THE GATHERING</span>
          <h1 className="events-heading">EVENTS</h1>
          <p className="events-subheading">
            From Sunday worship to community serve days, there's always
            something happening at The Active Church.
          </p>
        </div>
      </section>

      {/* Tall section = scroll budget. Sticky wrapper = stays in view */}
      <section className="events-cards-sect" ref={sectionRef}>
        <div className="cards-sticky-wrapper">
          <div className="event-cards">
            <div className="card-img img-one"></div>
            <div className="card-detail">
              <h1 className="card-heading">Sunday Service</h1>
              <div className="card-tym-vnu">
                <p className="time"><CalendarIcon height='1em'/>Sunday 9 AM</p>
                <p className="venue"> <PinLineIcon height="1em"/>72 Marlborough Road, Springfield</p>
              </div>
            </div>
          </div>
          <div className="event-cards">
          <div className="card-img img-two"></div>
            <div className="card-detail">
              <h1 className="card-heading">Friday Youth Service</h1>
              <div className="card-tym-vnu">
                <p className="time"><CalendarIcon height='1em'/> Friday 6 PM</p>
                <p className="venue"> <PinLineIcon height="1em"/> 72 Marlborough Road, Springfield</p>
              </div>
            </div>
          </div>
          <div className="event-cards">
          <div className="card-img img-three"></div>
            <div className="card-detail">
              <h1 className="card-heading">Plan 40</h1>
              <div className="card-tym-vnu">
                <p className="time"><CalendarIcon height='1em'/> Tuesdays 6 PM</p>
                <p className="venue"> <PinLineIcon height="1em"/> Respective Cell Group</p>
              </div>
            </div>
          </div>
          <div className="event-cards">
          <div className="card-img img-four"></div>
            <div className="card-detail">
              <h1 className="card-heading">Life Class</h1>
              <div className="card-tym-vnu">
                <p className="time"><CalendarIcon height='1em'/> Wednesday 6 PM</p>
                <p className="venue"> <PinLineIcon height="1em"/> Respective Cell Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default EventsPage