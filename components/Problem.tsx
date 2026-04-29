export default function Problem() {
  return (
    <section className="section-problem dot-grid-light" id="problema">
      <div className="container">
        <div className="problem-grid">
          <div className="problem-intro reveal">
            <p className="section-label">El problema</p>
            <h2>Así se gestiona el equipo de ventas hoy</h2>
            <p>Si sos dueño o gerente de ventas, sabés de qué estamos hablando. El sistema que &ldquo;funciona&rdquo; es en realidad un castillo de naipes que depende de que nadie se enferme, se vaya, o simplemente se olvide de mandar el Excel.</p>
          </div>
          <div className="problem-cards">
            <div className="problem-card reveal reveal-delay-1">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3>&ldquo;Lo mandé por WhatsApp&rdquo;</h3>
              <p>Visitas, cotizaciones, reclamos, novedades — todo mezclado en el mismo hilo. Imposible rastrear qué pasó con qué cliente.</p>
            </div>
            <div className="problem-card reveal reveal-delay-2">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3>El Excel que nadie actualiza</h3>
              <p>Versiones distintas en cinco celulares distintos. Datos duplicados, columnas que no encajan, y ninguna foto del cliente.</p>
            </div>
            <div className="problem-card reveal reveal-delay-3">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3>¿Dónde está el equipo?</h3>
              <p>Sin visibilidad real de cuántas visitas hizo cada vendedor, qué pasó en cada una, o si llegaron adonde dijeron que iban.</p>
            </div>
          </div>
          <div className="problem-quote reveal" style={{ gridColumn: '1 / -1' }}>
            &ldquo;Tengo diez vendedores en la calle y no sé qué está pasando hasta que me llaman. Para entonces, <strong>ya perdimos la venta.</strong>&rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
