'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const IconFacial = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10c0-1.5 3-1.5 3 0M15 10c0-1.5-3-1.5-3 0" />
    <path d="M8 15c1.2 1.3 6.8 1.3 8 0" />
  </svg>
)
const IconMassage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M11 11V6a2 2 0 1 0-4 0v7" />
    <path d="M7 13V9a2 2 0 1 0-4 0v6a7 7 0 0 0 7 7h2a7 7 0 0 0 7-7v-3a2 2 0 1 0-4 0" />
    <path d="M15 12V6a2 2 0 1 1 4 0v7" />
  </svg>
)
const IconWax = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3c4 3 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 2-7 6-10z" />
  </svg>
)
const IconScrub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </svg>
)
const IconGem = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12" />
  </svg>
)

const services = [
  {
    num: '01', name: 'Facials', icon: <IconFacial />,
    desc: 'Deep-cleanse, brighten and hydrate with treatments tailored to your skin.',
    tags: ['Deep Cleanse', 'Brightening', 'Anti-Aging'],
    swatch: '/svc-facial.jpg',
  },
  {
    num: '02', name: 'Massages', icon: <IconMassage />,
    desc: 'Swedish, deep tissue and hot stone therapy to melt away tension.',
    tags: ['Swedish', 'Deep Tissue', 'Hot Stone'],
    photo: '/svc-massage.jpg',
  },
  {
    num: '03', name: 'Waxing', icon: <IconWax />,
    desc: 'Smooth, flawless skin from full body to sensitive-area waxing.',
    tags: ['Full Body', 'Brows', 'Sensitive Skin'],
    swatch: null,
  },
  {
    num: '04', name: 'Body Scrub', icon: <IconScrub />,
    desc: 'Exfoliating rituals that nourish and reveal your natural glow.',
    tags: ['Exfoliation', 'Brightening', 'Nourishing'],
    swatch: '/svc-scrub.jpg',
  },
  {
    num: '05', name: 'Fashion Braces & Tooth Gems', icon: <IconGem />,
    desc: 'Custom smile styling — from fashion braces to sparkling tooth gems.',
    tags: ['Fashion Braces', 'Tooth Gems', 'Custom Design'],
    swatch: null,
  },
]

function getVis() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 768) return 1
  if (window.innerWidth <= 1024) return 2
  return 3
}

export default function Services() {
  const [slide, setSlide] = useState(0)
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  const applySlide = useCallback((idx) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.svc-card')
    if (!card) return
    const w = card.getBoundingClientRect().width + 24
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

  const totalDots = Math.max(0, services.length - getVis()) + 1

  return (
    <section className="services section-dark" id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <div className="pill-badge on-dark reveal">Our Services</div>
            <h2 className="h-serif services-heading on-dark reveal d1">Treatments Designed <em>Around You</em></h2>
          </div>
          <div className="services-sub-wrap reveal d2">
            <p className="services-sub">
              Every treatment is designed with precision and care, using only the finest products to ensure
              your complete satisfaction.
            </p>
            <div className="svc-header-row">
              <a href="#booking" className="btn btn-outline-d btn-sm">Explore Treatments</a>
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
          </div>
        </div>

        <div className="svc-track-wrap reveal d3">
          <div className="svc-track" ref={trackRef}>
            {services.map((s) => (
              s.photo ? (
                <div key={s.num} className="svc-card photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.photo} alt={s.name} />
                  <div className="svc-photo-inner">
                    <span className="svc-heart">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </span>
                    <div>
                      <div className="svc-photo-name">{s.name}</div>
                      <div className="svc-tags">
                        {s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                      </div>
                      <a href="#booking" className="svc-link">Book Now <ArrowRight /></a>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={s.num} className="svc-card plain">
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-name">{s.name}</div>
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-tags">
                    {s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                  </div>
                  <div className="svc-foot">
                    <a href="#booking" className="svc-link">Book Now <ArrowRight /></a>
                    {s.swatch && (
                      <span className="svc-swatch" style={{ backgroundImage: `url(${s.swatch})` }} />
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="svc-dots">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button key={i} className={`svc-dot${i === slide ? ' on' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
