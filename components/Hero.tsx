'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [vis, setVis] = useState({ eyebrow: false, h1: false, sub: false, actions: false, trust: false, deco: false })
  useEffect(() => {
    const t = [
      setTimeout(() => setVis(v => ({ ...v, eyebrow: true })), 80),
      setTimeout(() => setVis(v => ({ ...v, h1: true })), 180),
      setTimeout(() => setVis(v => ({ ...v, sub: true })), 300),
      setTimeout(() => setVis(v => ({ ...v, actions: true })), 420),
      setTimeout(() => setVis(v => ({ ...v, trust: true })), 560),
      setTimeout(() => setVis(v => ({ ...v, deco: true })), 300),
    ]
    return () => t.forEach(clearTimeout)
  }, [])
  return (
    <section className="hero dot-grid container" style={{ paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)', maxWidth: '100%' }}>
      <div className="container hero-content" style={{ padding: 0 }}>
        <div className={`hero-eyebrow${vis.eyebrow ? ' visible' : ''}`}>
          <div className="hero-eyebrow-line" />
          <span>Para equipos de ventas en terreno</span>
        </div>
        <h1 className={vis.h1 ? 'visible' : ''}>
          Tu equipo en<br />el campo.<br /><em>Vos, en control.</em>
        </h1>
        <p className={`hero-sub${vis.sub ? ' visible' : ''}`}>
          Field CRM reemplaza el caos de WhatsApp y Excel con una herramienta simple para equipos de ventas en terreno. Sabés dónde está tu equipo, qué están vendiendo, y qué viene.
        </p>
        <div className={`hero-actions${vis.actions ? ' visible' : ''}`}>
          <a href="#agendar" className="btn btn-primary btn-lg btn-arrow">Agendá una demo &nbsp;</a>
          <a href="#como-funciona" className="btn btn-ghost btn-lg">Ver cómo funciona</a>
        </div>
        <div className={`hero-trust${vis.trust ? ' visible' : ''}`}>
          <div className="hero-trust-item"><div className="dot" />Implementación en días, no meses</div>
          <div className="hero-trust-item"><div className="dot" />Sin contratos anuales</div>
          <div className="hero-trust-item"><div className="dot" />Precio especial para fundadores</div>
        </div>
      </div>
      <div className={`hero-deco${vis.deco ? ' visible' : ''}`}>
        <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <line x1="100" y1="0" x2="100" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="200" y1="0" x2="200" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="300" y1="0" x2="300" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="400" y1="0" x2="400" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="500" y1="0" x2="500" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="140" x2="600" y2="140" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="280" x2="600" y2="280" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="420" x2="600" y2="420" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="560" x2="600" y2="560" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <path d="M 80 580 L 150 480 L 260 510 L 310 380 L 420 330 L 480 200 L 520 140" stroke="#CC5225" strokeWidth="2.5" strokeOpacity="0.5" fill="none" strokeDasharray="8 5" strokeLinecap="round" />
          <circle cx="150" cy="480" r="7" fill="#CC5225" fillOpacity="0.6" />
          <circle cx="150" cy="480" r="14" fill="#CC5225" fillOpacity="0.12" />
          <circle cx="310" cy="380" r="9" fill="#CC5225" fillOpacity="0.8" />
          <circle cx="310" cy="380" r="18" fill="#CC5225" fillOpacity="0.12" />
          <circle cx="480" cy="200" r="7" fill="#CC5225" fillOpacity="0.5" />
          <circle cx="480" cy="200" r="14" fill="#CC5225" fillOpacity="0.1" />
          <circle cx="80" cy="580" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="260" cy="510" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="420" cy="330" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="520" cy="140" r="4" fill="#1C3328" fillOpacity="0.25" />
        </svg>
      </div>
    </section>
  )
}
