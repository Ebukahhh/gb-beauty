'use client'
import { useState, useEffect } from 'react'

const TIMES = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM']

export default function Booking() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dateMin, setDateMin]  = useState('')

  useEffect(() => {
    const t = new Date()
    setDateMin(`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    let valid = true
    e.target.querySelectorAll('[required]').forEach(f => {
      if (!f.value.trim()) {
        valid = false
        f.style.borderColor = 'rgba(180,60,60,0.6)'
        f.addEventListener('input', () => { f.style.borderColor = '' }, { once: true })
      }
    })
    if (!valid) return
    setLoading(true)
    setTimeout(() => {
      e.target.reset()
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 9000)
    }, 1200)
  }

  return (
    <section className="booking section-beige" id="booking">
      <div className="container">
        <div className="booking-grid">
          <div className="booking-form-card reveal">
            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="f-row">
                <div className="f-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Your first name" required />
                </div>
                <div className="f-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Your last name" required />
                </div>
              </div>
              <div className="f-row">
                <div className="f-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="f-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="+234 000 000 0000" required />
                </div>
              </div>
              <div className="f-group">
                <label htmlFor="service">Service</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Choose a service…</option>
                  <option value="facial">Facial Treatment</option>
                  <option value="massage">Massage Therapy</option>
                  <option value="wax">Waxing</option>
                  <option value="scrub">Body Scrub</option>
                  <option value="fashion-braces">Fashion Braces</option>
                  <option value="tooth-gems">Tooth Gems</option>
                </select>
              </div>
              <div className="f-row">
                <div className="f-group">
                  <label htmlFor="bookDate">Date</label>
                  <input type="date" id="bookDate" name="date" min={dateMin} required />
                </div>
                <div className="f-group">
                  <label htmlFor="bookTime">Time</label>
                  <select id="bookTime" name="time" required defaultValue="">
                    <option value="" disabled>Select time…</option>
                    {TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="f-group">
                <label htmlFor="notes">
                  Notes{' '}
                  <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--ink-3)' }}>
                    (optional)
                  </span>
                </label>
                <textarea id="notes" name="notes" rows={3} placeholder="Special requests or skin concerns…" />
              </div>
              <button
                type="submit"
                className="btn btn-rust btn-full"
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Request Appointment'}
              </button>
              {success && (
                <div className="f-success show">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p>Your appointment request has been received! We&apos;ll confirm within 24 hours.</p>
                </div>
              )}
            </form>
          </div>

          <div className="booking-visual reveal d2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/contact-resort.jpg" alt="GB Beauty Spa ambiance" />
            <div className="bv-content">
              <div className="bv-title">Ready to experience<br />the GB Beauty difference?</div>
              <a href="#services" className="btn btn-white btn-sm">View Our Treatments</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
