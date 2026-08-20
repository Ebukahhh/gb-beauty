'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const REVIEWS = [
  {
    initial: 'A', name: 'Adaeze O.', service: 'Deep Cleanse Facial',
    text: 'The facial I got at GB Beauty Spa was absolutely incredible. My skin has never felt so alive and radiant. The therapist was knowledgeable and so gentle — I felt completely taken care of.',
  },
  {
    initial: 'F', name: 'Fatima B.', service: 'Tooth Gem',
    text: 'I got my tooth gem done here and I\'m completely obsessed! The process was quick, painless, and so professional. Everyone keeps asking about my smile now. Thank you GB Beauty!',
  },
  {
    initial: 'C', name: 'Chioma E.', service: 'Luxury Body Scrub',
    text: 'The body scrub was heavenly! I walked out feeling like a completely new person. The ambiance, the products, the professionalism — everything was top tier. Highly recommend.',
  },
  {
    initial: 'N', name: 'Ngozi A.', service: 'Deep Tissue Massage',
    text: 'Best massage I\'ve ever had in Lagos! The therapist found knots I didn\'t even know I had. I actually fell asleep it was so relaxing. Will definitely be coming back soon.',
  },
  {
    initial: 'T', name: 'Toluwalope M.', service: 'Full Body Wax',
    text: 'I was nervous about waxing but the team made me so comfortable. The results were flawless and lasted much longer than I expected. Already booking my next appointment!',
  },
]

function getVis() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 768) return 1
  if (window.innerWidth <= 1024) return 2
  return 3
}

export default function Testimonials() {
  const [slide, setSlide] = useState(0)
  // Initialized to match the server's window-less getVis() fallback (3) so the
  // first client render's dot count agrees with SSR — real value is set post-mount.
  const [totalDots, setTotalDots] = useState(Math.max(0, REVIEWS.length - 3) + 1)
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  const applySlide = useCallback((idx) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.testi-card')
    if (!card) return
    const w = card.getBoundingClientRect().width + 24
    trackRef.current.style.transform = `translateX(-${idx * w}px)`
  }, [])

  const go = useCallback((idx) => {
    const v = getVis()
    const m = Math.max(0, REVIEWS.length - v)
    const next = Math.max(0, Math.min(idx, m))
    setSlide(next)
    applySlide(next)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setSlide(s => {
        const m2 = Math.max(0, REVIEWS.length - getVis())
        const n = s >= m2 ? 0 : s + 1
        applySlide(n)
        return n
      })
    }, 5000)
  }, [applySlide])

  useEffect(() => {
    setTotalDots(Math.max(0, REVIEWS.length - getVis()) + 1)
    go(0)
    const onResize = () => {
      setTotalDots(Math.max(0, REVIEWS.length - getVis()) + 1)
      setSlide(0)
      applySlide(0)
    }
    window.addEventListener('resize', onResize)
    return () => { clearInterval(timerRef.current); window.removeEventListener('resize', onResize) }
  }, [go, applySlide])

  return (
    <section className="testimonials section-light" id="testimonials">
      <div className="container">
        <div className="testi-head">
          <div>
            <div className="pill-badge reveal">Client Stories</div>
            <h2 className="h-serif testi-heading reveal d1">Words from Our <em>Clients</em></h2>
          </div>
          <div className="testi-nav reveal d1">
            <button className="tn-btn" onClick={() => go(slide - 1)} aria-label="Previous">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="tn-btn" onClick={() => go(slide + 1)} aria-label="Next">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="testi-slider reveal d2">
          <div className="testi-track" ref={trackRef}>
            {REVIEWS.map((r) => (
              <div key={r.name} className="testi-card">
                <div className="testi-quote">&ldquo;</div>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{r.text}</p>
                <div className="testi-author">
                  <div className="testi-av">{r.initial}</div>
                  <div>
                    <div className="testi-name">{r.name}</div>
                    <div className="testi-service">{r.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testi-dots-row">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button key={i} className={`t-dot${i === slide ? ' on' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
