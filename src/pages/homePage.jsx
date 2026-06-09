import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Welcome to Active Church</p>
            <h1>Faith, Community, and Service</h1>
            <p>Join us for worship, connection, and opportunities to serve the community.</p>
            <a href="#connect" className="btn-primary">Get Involved</a>
          </div>
        </section>

        <section className="about">
          <h2>About Our Church</h2>
          <p>Active Church is a welcoming community focused on spiritual growth, meaningful relationships, and outreach.</p>
        </section>

        <section className="ministries">
          <h2>Our Ministries</h2>
          <div className="ministry-cards">
            <article>
              <h3>Worship</h3>
              <p>Weekly services with inspiring teaching and heartfelt worship.</p>
            </article>
            <article>
              <h3>Family</h3>
              <p>Programs for kids, youth, and adults to grow together in faith.</p>
            </article>
            <article>
              <h3>Outreach</h3>
              <p>Serving our neighbors through local missions and support initiatives.</p>
            </article>
          </div>
        </section>

        <section className="connect" id="connect">
          <h2>Connect With Us</h2>
          <p>Come visit us this weekend or reach out to learn more about upcoming events.</p>
          <p>Email: info@activechurch.org | Phone: (555) 123-4567</p>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default HomePage
