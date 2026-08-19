'use client'
import { useEffect } from 'react'

export default function ScrollInit() {
  useEffect(() => {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

    return () => { revealObs.disconnect() }
  }, [])

  return null
}
