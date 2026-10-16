import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import './ConstactStyles.css'
import emailjs from '@emailjs/browser'
import PinLineIcon from '@iconify-react/si/pin-line';
import Time4Icon from '@iconify-react/subway/time-4';
import MailOutlineIcon from '@iconify-react/material-symbols/mail-outline';
import SendIcon from '@iconify-react/mynaui/send';

// .env (restart the Vite dev server after editing, and add the same vars in Vercel):
// VITE_EMAILJS_SERVICE_ID=
// VITE_EMAILJS_TEMPLATE_ID=             <- notification sent to the church
// VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=   <- auto-reply sent to the visitor (To Email = {{email}})
// VITE_EMAILJS_PUBLIC_KEY=
// The service/template IDs and public key are not secret (they ship in the
// browser bundle), so they're used as fallbacks if the env vars are missing.
const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_04dmzo9',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_oeewxwi',
  // Leave unset while the Auto-Reply template is linked inside EmailJS
  autoReplyTemplateId: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'h9DyDT7Oof2KNSaIt',
}

const CHURCH_EMAIL = 'info@theactivechurch.org'

function ConnectPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setError('')

    const form = e.target
    const formData = new FormData(form)

    // Honeypot: real users never see or fill this field, bots usually do.
    if (formData.get('hp_contact_ref')) {
      console.warn('Honeypot field was filled (autofill or bot). Message NOT sent.')
      form.reset()
      setSuccess(true) // pretend success so bots learn nothing
      return
    }

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      console.error('EmailJS env vars are missing. Check .env / Vercel settings.')
      setError('The contact form is not configured yet. Please email us directly.')
      return
    }

    const visitorEmail = formData.get('email') || ''

    // Variable names must match the {{placeholders}} in the EmailJS templates:
    // subject, name, email, message, femail
    const params = {
      subject: formData.get('subject') || '',
      name: formData.get('name') || '',
      email: visitorEmail,
      femail: visitorEmail, // template uses {{femail}} (sender address)
      from_email: visitorEmail, // harmless safety net for older {{from_email}} fields
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
      to_email: CHURCH_EMAIL,
    }

    setSubmitting(true)

    try {
      // 1. Notify the church (template Reply-To should be {{email}})
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        params,
        { publicKey: emailjsConfig.publicKey }
      )
      console.log('EmailJS response:', result.status, result.text)

      // 2. Auto-reply to the visitor (template To Email = {{email}}).
      // Wrapped separately so a failed auto-reply never hides the fact that
      // the church DID receive the message.
      if (emailjsConfig.autoReplyTemplateId) {
        try {
          await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.autoReplyTemplateId,
            params,
            { publicKey: emailjsConfig.publicKey }
          )
        } catch (autoErr) {
          console.warn('Auto-reply failed:', autoErr)
        }
      }

      setSuccess(true)
      form.reset()
    } catch (err) {
      // EmailJS errors are { status, text }, not Error instances
      console.error('EmailJS error:', err)
      setError(err?.text || err?.message || 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Connect | The Active Church, Johannesburg</title>
        <meta name="description" content="Get in touch with The Active Church in Johannesburg. Find our address, service times, and send us a message." />
        <link rel="canonical" href="https://theactivechurch.org/connect" />
        <meta property="og:title" content="Connect with The Active Church" />
        <meta property="og:image" content="https://theactivechurch.org/og-connect.jpg" />
      </Helmet>

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
                <PinLineIcon height='2em' style={{ color: 'blue' }} />
              </span>
              <div className="mid-text">
                <h4>72 Marlborough Road</h4>
                <p>Springfield, Johannesburg</p>
              </div>
            </div>
            <div className="mid-cards">
              <span className="icon">
                <Time4Icon height='2em' style={{ color: 'blue' }} />
              </span>
              <div className="mid-text">
                <h4>Sundays 9AM</h4>
                <p>Fridays 6pm</p>
              </div>
            </div>
            <div className="mid-cards">
              <span className="icon">
                <MailOutlineIcon height='2em' style={{ color: 'blue' }} />
              </span>
              <div className="mid-text">
                <h4>{CHURCH_EMAIL}</h4>
              </div>
            </div>
          </div>

          <div className="left-img"></div>
        </div>

        <div className="dividers right-divider">
          <form onSubmit={handleSubmit} className='form'>
            <span className="form-txt-head">
              <h2>Get In Touch</h2>
              <p>Fill out the form and we'll be in touch.</p>
            </span>

            {error && (
              <div role="alert" style={{ background: '#fee2e2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#b91c1c', margin: 0 }}>⚠ {error}</p>
              </div>
            )}

            {success && (
              <div role="status" style={{ background: '#d1e7dd', border: '1px solid #badbce', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#0f5132', margin: 0 }}>✅ Message sent successfully! We'll be in touch soon.</p>
              </div>
            )}

            {/* Honeypot field: hidden from humans and screen readers */}
            <input
              type="text"
              name="hp_contact_ref"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <label htmlFor="name"> Your Name <br />
              <input id="name" type="text" placeholder='John Doe' name='name' autoComplete="name" required />
            </label>
            <label htmlFor="email"> Email Address <br />
              <input id="email" type="email" placeholder='john@example.com' name='email' autoComplete="email" required />
            </label>
            <label htmlFor="subject"> Subject <br />
              <input id="subject" type="text" placeholder='How can we help?' name='subject' required />
            </label>
            <label htmlFor="phone"> Phone Number <br />
              <input id="phone" type="tel" placeholder='067 654 3219' name='phone' autoComplete="tel" />
            </label>
            <label htmlFor="message" className='fieldset'> Message <br />
              <textarea id="message" name="message" className='message' placeholder="Tell us more..." rows="5" required></textarea>
            </label>
            <button type="submit" id='frm-btn' disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'} <SendIcon height='1.3em' />
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ConnectPage