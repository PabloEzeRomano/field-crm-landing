'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="wordmark" aria-label="Field CRM">
        <span className="wordmark-field">Field</span>
        <span className="wordmark-crm">CRM</span>
      </a>
      <div className="nav-links">
        <a href="#problema">El problema</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#precios">Precios</a>
      </div>
      <div className="nav-cta">
        <a href="#agendar" className="btn btn-primary">Agendá una demo</a>
      </div>
    </nav>
  )
}
