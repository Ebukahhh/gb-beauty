'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

const IconFacial = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10c0-1.5 3-1.5 3 0M15 10c0-1.5-3-1.5-3 0" />
    <path d="M8 15c1.2 1.3 6.8 1.3 8 0" />
  </svg>
)
const IconMassage = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M11 11V6a2 2 0 1 0-4 0v7" />
    <path d="M7 13V9a2 2 0 1 0-4 0v6a7 7 0 0 0 7 7h2a7 7 0 0 0 7-7v-3a2 2 0 1 0-4 0" />
    <path d="M15 12V6a2 2 0 1 1 4 0v7" />
  </svg>
)
const IconWax = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 3c4 3 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 2-7 6-10z" />
  </svg>
)
const IconScrub = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </svg>
)

const services = [
  { key: 'facials', eyebrow: 'Skin Rituals',     name: 'Facials',                        image: '/svc-facial.jpg' },
  { key: 'massage',  eyebrow: 'Signature Focus',  name: 'Massages',                       image: '/svc-massage.jpg' },
  { key: 'wax',      eyebrow: 'Smooth & Flawless', name: 'Waxing',                        icon: <IconWax /> },
  { key: 'scrub',    eyebrow: 'Glow Treatment',   name: 'Body Scrub',                     image: '/svc-scrub.jpg' },
  { key: 'gems',     eyebrow: 'Smile Styling',    name: 'Fashion Braces & Tooth Gems',    image: '/svc-gems.jpg' },
]

function getVis() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth <= 640) return 1
  if (window.innerWidth <= 900) return 2
  if (window.innerWidth <= 1280) return 3
  return 4
}

export default function Services() {
  const [slide, setSlide] = useState(0)
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  const applySlide = useCallback((idx) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.svc-card')
    if (!card) return
    const w = card.getBoundingClientRect().width + 20
    trackRef.current.style.transform = `translateX(-${idx * w}px)`
  }, [])

  const go = useCallback((idx, restartTimer = true) => {
    const v = getVis()
    const m = Math.max(0, services.length - v)
    const next = ((idx % (m + 1)) + (m + 1)) % (m + 1)
    setSlide(next)
    applySlide(next)
    if (restartTimer) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setSlide(s => {
          const vv = getVis()
          const mm = Math.max(0, services.length - vv)
          const n = s >= mm ? 0 : s + 1
          applySlide(n)
          return n
        })
      }, 4500)
    }
  }, [applySlide])

  useEffect(() => {
    go(0)
    const onResize = () => go(slide, false)
    window.addEventListener('resize', onResize)
    return () => { clearInterval(timerRef.current); window.removeEventListener('resize', onResize) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="services section-light" id="services">
      <div className="container">
        <div className="svc-panel reveal">
          <div className="services-header">
            <div>
              <div className="pill-badge on-dark">Our Services</div>
              <h2 className="h-serif services-heading on-dark">Treatments Designed <em>Around You</em></h2>
            </div>
            <div className="services-sub-wrap">
              <p className="services-sub">
                Every treatment is designed with precision and care, using only the finest products to ensure
                your complete satisfaction.
              </p>
              <a href="#booking" className="btn btn-outline-d btn-sm">Explore Treatments</a>
            </div>
          </div>

          <div className="svc-track-wrap">
            <div className="svc-track" ref={trackRef}>
              {services.map((s) => (
                <a key={s.key} href="#booking" className="svc-card">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.name} className="svc-card-bg" />
                  ) : (
                    <div className="svc-card-bg gradient" style={{ background: 'linear-gradient(155deg, var(--brown-3) 0%, var(--rust-dk) 130%)', color: 'var(--rust-lt)' }}>
                      {s.icon}
                    </div>
                  )}
                  <div className="svc-card-scrim"></div>
                  <span className="svc-arrow-btn"><ArrowUpRight /></span>
                  <div className="svc-card-text">
                    <span className="svc-eyebrow">{s.eyebrow}</span>
                    <div className="svc-title">{s.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="svc-footer-row">
            <div className="testi-nav">
              <button className="tn-btn on-dark" onClick={() => go(slide - 1)} aria-label="Previous treatment">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="tn-btn on-dark" onClick={() => go(slide + 1)} aria-label="Next treatment">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <svg className="svc-flourish" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.5 3 3 4.5 6 6-3 1.5-4.5 3-6 6-1.5-3-3-4.5-6-6 3-1.5 4.5-3 6-6z" />
          </svg>
        </div>
      </div>
    </section>
  )
}
