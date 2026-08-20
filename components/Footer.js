export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-massage.jpg" alt="" />
        <div className="fc-inner">
          <div className="fc-mark">GB</div>
          <div className="fc-word">GB Beauty Spa</div>
          <div className="fc-tag">Beauty · Wellness · Confidence</div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <span className="footer-brand-mark">GB</span>
                <span className="footer-brand-word">GB Beauty Spa</span>
              </div>
              <p className="footer-desc">
                Lagos&apos;s premier destination for transformative beauty and wellness experiences. Where every
                client leaves as the best version of themselves.
              </p>
            </div>
            <div className="f-col">
              <h5>Navigate</h5>
              <ul>
                {['about','services','testimonials','booking','contact'].map(s => (
                  <li key={s}><a href={`#${s}`} style={{ textTransform: 'capitalize' }}>{s === 'booking' ? 'Book Now' : s}</a></li>
                ))}
              </ul>
            </div>
            <div className="f-col">
              <h5>Services</h5>
              <ul>
                {['Facials','Massages','Waxing','Body Scrub','Fashion Braces','Tooth Gems'].map(s => (
                  <li key={s}><a href="#booking">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="f-col">
              <h5>Contact</h5>
              {[
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Lagos, Nigeria' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.85a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17v-.08z"/></svg>, text: '+234 907 833 3003' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: 'hello@gbbeautyspa.com' },
              ].map(item => (
                <div key={item.text} className="f-contact-row">
                  {item.icon} {item.text}
                </div>
              ))}
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--paper-3)' }}>Mon – Sat · 9 AM – 7 PM</div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 GB Beauty Spa. All rights reserved.</p>
            <p>Lagos, Nigeria · Beauty · Wellness · Confidence</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
