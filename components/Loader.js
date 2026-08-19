'use client'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
    }, 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader${visible ? '' : ' gone'}`} id="loader">
      <div className="loader-mark">G<span>B</span></div>
      <div className="loader-line"></div>
      <div className="loader-label">Beauty · Wellness · Confidence</div>
    </div>
  )
}
