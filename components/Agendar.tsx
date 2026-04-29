'use client'
import Script from 'next/script'
import { useRef } from 'react'

declare global {
  interface Window {
    calendar: { schedulingButton: { load: (o: { url: string; color: string; label: string; target: HTMLElement }) => void } }
  }
}

export default function Agendar() {
  const targetRef = useRef<HTMLDivElement>(null)

  const handleClick = () => targetRef.current?.querySelector('button')?.click()

  const handleLoad = () => {
    if (!targetRef.current || !window.calendar?.schedulingButton) return
    window.calendar.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3urjMyKKRkaoT2Su2b3W__FpCtYueK1_A_1FPXOJlfthF0sCoMLMOXjHzEUZb1efnLuHhrouz8?gv=true',
      color: '#cc5225',
      label: 'Agendá tu demo',
      target: targetRef.current,
    })
  }

  return (
    <section className="section-agendar" id="agendar">
      <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
      <Script src="https://calendar.google.com/calendar/scheduling-button-script.js" strategy="lazyOnload" onLoad={handleLoad} />
      <div className="container">
        <div className="agendar-header reveal">
          <p className="section-label">Siguiente paso</p>
          <h2>Agendá una demo</h2>
          <p>30 minutos. Sin slides. Te mostramos Field CRM en vivo con un caso parecido al tuyo, y respondemos todas tus preguntas.</p>
          <div style={{ marginTop: 30 }}>
            <button onClick={handleClick} className="btn btn-primary btn-lg">Agendá tu demo →</button>
          </div>
        </div>
      </div>
      <div ref={targetRef} style={{ display: 'none' }} />
    </section>
  )
}
