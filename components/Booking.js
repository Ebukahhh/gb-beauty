'use client'
import { useState, useEffect, useRef } from 'react'

const TIMES = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM']
const THERAPIST_TYPES = ['Chubby', 'Petite', 'Dark Skin', 'Light Skin', 'Slim']
const SPA_WHATSAPP = '2340000000000'
const BANK_DETAILS = { name: 'GB SPA', account: '1229766614', bank: 'Zenith Bank' }

export default function Booking() {
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [dateMin, setDateMin]   = useState('')
  const [service, setService]   = useState('')
  const [therapistTypes, setTherapistTypes] = useState([])
  const [otherTherapist, setOtherTherapist] = useState('')
  const [receiptFile, setReceiptFile] = useState(null)
  const [formError, setFormError] = useState('')
  const [waLink, setWaLink] = useState('')
  const formRef = useRef(null)

  const isMassage = service === 'massage'

  useEffect(() => {
    const t = new Date()
    setDateMin(`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`)
  }, [])

  function toggleTherapistType(type) {
    setTherapistTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const data = new FormData(e.target)
    let valid = true
    e.target.querySelectorAll('[required]').forEach(f => {
      if (!f.value.trim()) {
        valid = false
        f.style.borderColor = 'rgba(180,60,60,0.6)'
        f.addEventListener('input', () => { f.style.borderColor = '' }, { once: true })
      }
    })
    if (isMassage && therapistTypes.length === 0 && !otherTherapist.trim()) {
      valid = false
      setFormError('Please select a preferred therapist type (or specify one).')
    }
    if (isMassage && !receiptFile) {
      valid = false
      setFormError('Please upload your payment receipt to continue.')
    }
    if (!valid) return

    setLoading(true)
    try {
      let receiptUrl = ''
      if (isMassage && receiptFile) {
        const fd = new FormData()
        fd.append('file', receiptFile)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Upload failed')
        receiptUrl = json.url
      }

      const lines = [
        'New Booking Request — GB Beauty Spa',
        `Name: ${data.get('firstName')} ${data.get('lastName')}`,
        `Phone: ${data.get('phone')}`,
        `Email: ${data.get('email')}`,
        `Service: ${e.target.service.selectedOptions[0]?.text || data.get('service')}`,
        `Location: ${data.get('location')}`,
        `Date: ${data.get('date')}`,
        `Time: ${data.get('time')}`,
      ]
      if (isMassage) {
        const prefs = [...therapistTypes, otherTherapist.trim()].filter(Boolean).join(', ')
        lines.push(`Preferred Therapist Type: ${prefs}`)
        lines.push(`Payment Reference: ${data.get('paymentRef') || '—'}`)
        if (receiptUrl) lines.push(`Payment Receipt: ${receiptUrl}`)
      }
      if (data.get('notes')) lines.push(`Notes: ${data.get('notes')}`)

      const text = encodeURIComponent(lines.join('\n'))
      const link = `https://wa.me/${SPA_WHATSAPP}?text=${text}`
      setWaLink(link)
      window.open(link, '_blank', 'noopener')

      e.target.reset()
      setService('')
      setTherapistTypes([])
      setOtherTherapist('')
      setReceiptFile(null)
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 15000)
    } catch (err) {
      setLoading(false)
      setFormError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="booking section-beige" id="booking">
      <div className="container">
        <div className="booking-grid">
          <div className="booking-form-card reveal">
            <form className="booking-form" ref={formRef} onSubmit={handleSubmit} noValidate>
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
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" placeholder="e.g. Lagos, Abuja, Port Harcourt…" required />
              </div>
              <div className="f-group">
                <label htmlFor="service">Service</label>
                <select id="service" name="service" required value={service} onChange={e => setService(e.target.value)}>
                  <option value="" disabled>Choose a service…</option>
                  <option value="facial">Facial Treatment</option>
                  <option value="massage">Massage Therapy</option>
                  <option value="wax">Waxing</option>
                  <option value="scrub">Body Scrub</option>
                  <option value="manicure">Manicure</option>
                  <option value="pedicure">Pedicure</option>
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

              {isMassage && (
                <div className="f-massage-block">
                  <div className="f-group">
                    <label>Preferred Therapist Type</label>
                    <div className="f-checks">
                      {THERAPIST_TYPES.map(type => (
                        <label key={type} className="f-check">
                          <input
                            type="checkbox"
                            checked={therapistTypes.includes(type)}
                            onChange={() => toggleTherapistType(type)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Other (optional)"
                      value={otherTherapist}
                      onChange={e => setOtherTherapist(e.target.value)}
                      style={{ marginTop: 8 }}
                    />
                  </div>

                  <div className="deposit-box">
                    <div className="deposit-title">50% deposit required to confirm booking</div>
                    <div className="deposit-detail">
                      Pay into: <strong>{BANK_DETAILS.name}</strong> · {BANK_DETAILS.account} · {BANK_DETAILS.bank}
                    </div>

                    <div className="f-group" style={{ marginTop: 14 }}>
                      <label htmlFor="paymentRef">Payment Reference / Name Used for Transfer</label>
                      <input type="text" id="paymentRef" name="paymentRef" placeholder="e.g. your name or transaction ID" required />
                    </div>

                    <div className="f-group" style={{ marginTop: 14 }}>
                      <label htmlFor="receipt">Upload Payment Receipt (image or PDF, max 10MB)</label>
                      <label htmlFor="receipt" className="file-drop">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        {receiptFile ? receiptFile.name : 'Add File'}
                      </label>
                      <input
                        type="file"
                        id="receipt"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={e => setReceiptFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="f-group">
                <label htmlFor="notes">
                  Notes{' '}
                  <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--ink-3)' }}>
                    (optional)
                  </span>
                </label>
                <textarea id="notes" name="notes" rows={3} placeholder="Special requests or skin concerns…" />
              </div>

              {formError && <div className="f-error">{formError}</div>}

              <button
                type="submit"
                className="btn btn-rust btn-full"
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Request Appointment via WhatsApp'}
              </button>
              {success && (
                <div className="f-success show">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p>
                    We&apos;ve opened WhatsApp with your booking details — just hit send to confirm with us.{' '}
                    {waLink && <a href={waLink} target="_blank" rel="noopener noreferrer">Didn&apos;t open? Click here.</a>}
                  </p>
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
