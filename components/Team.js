export default function Team() {
  return (
    <section className="team section-beige" id="team">
      <div className="container">
        <div className="team-top">
          <div className="pill-badge reveal">Our Team</div>
          <h2 className="h-serif team-heading reveal d1">Meet the <em>Founder</em></h2>
          <p className="team-sub reveal d2">The vision and hands behind GB Beauty Spa.</p>
        </div>

        <div className="team-grid">
          <div className="team-card reveal d2">
            <div className="tc-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/team-ceo.jpg" alt="Placeholder — founder photo coming soon" />
              <div className="tc-placeholder-tag">Placeholder photo — final portrait coming soon</div>
            </div>
            <div>
              <div className="tc-rating">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6.5.9-4.7 4.6L18 20l-6-3.2L6 20l1.2-6.5L2.5 8.9 9 8z" /></svg>
                4.9 · 500+ Clients Served
              </div>
              <div className="tc-name">Founder &amp; CEO</div>
              <div className="tc-role">GB Beauty Spa</div>
              <p className="tc-desc">
                Leading GB Beauty Spa&apos;s mission to deliver transformative beauty and wellness
                experiences to every client who walks through our doors in Lagos.
              </p>
              <a href="#booking" className="btn btn-dark btn-sm">Book a Consultation</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
