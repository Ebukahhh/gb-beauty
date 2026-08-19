const features = [
  {
    title: 'Certified Beauty Professionals',
    desc: 'Every therapist is licensed and extensively trained in modern technique.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l3 6 6.5.9-4.7 4.6L18 20l-6-3.2L6 20l1.2-6.5L2.5 8.9 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Premium Products Only',
    desc: 'We use only the finest, dermatologist-approved products in every treatment.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M10 2h4v4l3 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l3-3z" />
        <path d="M8.5 14h7" />
      </svg>
    ),
  },
  {
    title: 'Hygienic & Safe Environment',
    desc: 'Rigorous sanitation standards keep every visit clean, safe and calm.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Personalised Treatment Plans',
    desc: 'Every visit is tailored to your skin, body and beauty goals.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Book online in minutes, with appointments confirmed within 24 hours.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section className="features section-light" id="about">
      <div className="container">
        <div className="features-top">
          <div className="pill-badge reveal">Our Core Features</div>
          <h2 className="h-serif features-heading reveal d1">
            Expert Care That Goes Beyond <em>Beauty</em>
          </h2>
          <p className="features-intro reveal d2">
            GB Beauty Spa is Lagos&apos;s premier destination for transformative beauty experiences —
            blending modern technique with time-honored ritual to reveal your natural radiance.
          </p>
        </div>

        <div className="features-grid">
          <div className="features-imgs reveal d2">
            <div className="fi-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/features-lounge.jpg" alt="GB Beauty Spa treatment room" />
            </div>
            <div className="fi-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/features-footbath.jpg" alt="Spa pedicure ritual" />
            </div>
          </div>

          <div className="features-list reveal d3">
            {features.map(f => (
              <div key={f.title} className="f-item">
                <div className="f-ico">{f.icon}</div>
                <div>
                  <div className="f-title">{f.title}</div>
                  <div className="f-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
