'use client'
import { useState, useEffect, useCallback } from 'react'

const LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#services',     label: 'Services' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [onLight, setOnLight]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]       = useState('')

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 60)

    let cur = ''
    let curEl = null
    document.querySelectorAll('section[id], footer').forEach(s => {
      if (y + 100 >= s.offsetTop) { curEl = s }
      if (s.id && y + 100 >= s.offsetTop) cur = s.id
    })
    setActive(cur)

    if (y > 60 && curEl) {
      const light = curEl.classList.contains('section-light') || curEl.classList.contains('section-beige')
      setOnLight(light)
    } else {
      setOnLight(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const off = 90
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' })
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const cls = (...parts) => parts.filter(Boolean).join(' ')

  return (
    <>
      <nav className={cls('navbar', scrolled && (onLight ? 'solid-light' : 'solid'))} id="navbar">
        <div className="nav-inner">
          <a href="#home" className="nav-logo" onClick={e => scrollTo(e, '#home')}>
            <span className="nav-logo-mark">GB</span>
            <span className="nav-logo-word">GB Beauty</span>
          </a>
          <ul className="nav-menu">
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => scrollTo(e, l.href)}
                  className={cls('nav-link', onLight && 'on-light', active === l.href.slice(1) && 'active')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#booking" className="btn nav-book" onClick={e => scrollTo(e, '#booking')}>
            Book Now
          </a>
          <button
            className={cls('nav-toggle', mobileOpen && 'is-open')}
            onClick={() => {
              const next = !mobileOpen
              setMobileOpen(next)
              document.body.style.overflow = next ? 'hidden' : ''
            }}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={cls('nav-overlay', mobileOpen && 'open')}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} className="nav-link"
            onClick={e => { scrollTo(e, l.href); document.body.style.overflow = '' }}>
            {l.label}
          </a>
        ))}
        <a href="#booking" className="btn btn-rust"
          onClick={e => { scrollTo(e, '#booking'); document.body.style.overflow = '' }}>
          Book Now
        </a>
      </div>
    </>
  )
}
