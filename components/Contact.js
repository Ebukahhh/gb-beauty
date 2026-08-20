export default function Contact() {
  const items = [
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.85a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17v-.08z"/></svg>,
      label: 'Talk With Us', val: '+234 907 833 3003', href: 'tel:+2349078333003',
    },
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: 'Email Address', val: 'hello@gbbeautyspa.com', href: 'mailto:hello@gbbeautyspa.com',
    },
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label: 'Working Hours', val: 'Mon – Sat · 9AM – 7PM',
    },
  ]

  return (
    <section className="contact section-beige" id="contact">
      <div className="container">
        <div className="contact-top">
          <div className="pill-badge reveal">Get in Touch</div>
          <h2 className="h-serif contact-heading reveal d1">Start Your Beauty <em>Journey Today</em></h2>
          <p className="contact-desc reveal d2">
            We&apos;d love to welcome you to our Lagos studio. Reach out through any of the channels
            below or book directly online.
          </p>

          <div className="contact-info-row reveal d3">
            {items.map(item => (
              <div key={item.label} className="ci-item">
                <div className="ci-icon">{item.icon}</div>
                <div>
                  <div className="ci-label">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="ci-val ci-link">{item.val}</a>
                  ) : (
                    <div className="ci-val">{item.val}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="social-row reveal d4">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/thegbbeautyspa/', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { label: 'TikTok',    href: 'https://www.tiktok.com/@gb.beauty.aesthet', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
              { label: 'WhatsApp',  href: 'https://wa.me/2349078333003', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="soc-btn">
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
