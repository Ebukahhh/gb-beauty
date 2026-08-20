const NAV = [
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Our Services' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

const SOCIALS = [
  {
    label: 'Instagram', href: 'https://www.instagram.com/thegbbeautyspa/',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: 'TikTok', href: 'https://www.tiktok.com/@gb.beauty.aesthet',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
  },
  {
    label: 'WhatsApp', href: 'https://wa.me/2349078333003',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-card">
          <svg className="footer-flourish" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2c1.5 3 3 4.5 6 6-3 1.5-4.5 3-6 6-1.5-3-3-4.5-6-6 3-1.5 4.5-3 6-6z" />
          </svg>

          <div className="footer-row">
            <div className="footer-brand-col">
              <div className="footer-brand">
                <span className="footer-brand-mark">GB</span>
                <span className="footer-brand-word">GB Beauty Spa</span>
              </div>
              <p className="footer-desc">
                Premium facials, massages, waxing and more — bringing beauty and wellness to you in Lagos and beyond.
              </p>
            </div>

            <nav className="footer-nav-col">
              {NAV.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            </nav>

            <div className="footer-actions-col">
              <a href="#booking" className="btn btn-dark footer-book">
                Book Now
                <span className="footer-book-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <div className="footer-social-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-soc-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
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
