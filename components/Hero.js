export default function Hero() {
  return (
    <section className="hero section-dark" id="home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero-massage.jpg" alt="Relaxing massage treatment" className="hero-bg" />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-left">
          <div className="pill-badge on-dark reveal">GB Beauty Spa &nbsp;—&nbsp; Lagos, Nigeria</div>
          <h1 className="hero-title reveal d1">
            Where Beauty<br />Meets <em>Confidence</em>
          </h1>
          <p className="hero-sub reveal d2">
            Transformative beauty and wellness treatments for the modern woman.
            Every visit is a step closer to the best version of you.
          </p>
          <div className="hero-actions reveal d3">
            <a href="#booking" className="btn btn-white">Book Appointment</a>
            <a href="#services" className="btn btn-outline-d">
              Our Services
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="hero-stats reveal d4">
            <div className="hero-avatars">
              <span>A</span><span>F</span><span>C</span><span>N</span>
            </div>
            <div className="hero-stats-text">
              <div className="hero-stars">★★★★★ 4.9</div>
              <div className="hero-stats-label"><strong>150+</strong> Happy Clients</div>
            </div>
          </div>
        </div>

        <div className="hero-card reveal d4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svc-facial.jpg" alt="" />
          <p>A premium beauty experience designed for your skin, needs, and confidence.</p>
        </div>
      </div>
    </section>
  )
}
