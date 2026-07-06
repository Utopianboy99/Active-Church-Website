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
    const cards = Array.from(section.querySelectorAll('.event-cards'))
    const CARDS = cards.length
    const STACK_TOP = 80   // px from top when fully stacked
    const CARD_GAP = 18    // px between stacked cards

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight

      // progress: 0 (section just entered) → 1 (section about to leave)
      const rawProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight))

      cards.forEach((card, i) => {
        // Each card gets its own slice of the scroll progress
        // Card 0 is always visible first, card 3 comes in last
        const cardStart = i / CARDS          // when this card starts moving
        const cardEnd = (i + 1) / CARDS      // when this card is fully stacked

        // How far along is THIS card's animation (0 → 1)
        const cardProgress = Math.max(
          0,
          Math.min(1, (rawProgress - cardStart) / (1 / CARDS))
        )

        // Start position: card 0 starts on screen, rest start below viewport
        const startY = i === 0 ? 0 : window.innerHeight * 0.6
        // End position: tight stack
        const endY = i * CARD_GAP

        const currentY = startY + (endY - startY) * cardProgress

        // Slight scale-down for cards underneath
        const scaleDown = 1 - (CARDS - 1 - i) * 0.02 * cardProgress
        const scale = i === CARDS - 1 ? 1 : scaleDown

        card.style.transform = `translateY(${currentY}px) scale(${scale})`

        // Fade in as each card enters
        card.style.opacity = i === 0 ? 1 : Math.min(1, cardProgress * 3)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run on mount to set initial positions

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