function Check({ color }: { color: string }) {
  return (
    <div className="feat-check">
      <svg viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <polyline points="1.5,5 4,7.5 8.5,2.5" />
      </svg>
    </div>
  )
}

export default function Pricing() {
  return (
    <section className="section-pricing dot-grid-light" id="precios">
      <div className="container">
        <div className="pricing-header reveal">
          <p className="section-label">Precios</p>
          <h2>Sin letra chica</h2>
          <p>Precios en dólares, factura en Argentina. Sin contrato anual. Cancelás cuando querés.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card reveal reveal-delay-1">
            <div>
              <div className="pricing-plan-name">Starter</div>
              <div className="pricing-price" style={{ marginTop: '1rem' }}>
                <span className="price-currency">USD</span>
                <span className="price-amount">99</span>
                <span className="price-period">/mes</span>
              </div>
              <div className="pricing-setup">+ costo único de setup</div>
            </div>
            <div className="pricing-features">
              {['Hasta 10 vendedores', 'Registro de visitas y clientes', 'Mapa de actividad en tiempo real', 'Dashboard para el manager', 'Soporte por WhatsApp'].map(f => (
                <div key={f} className="pricing-feature"><Check color="rgba(255,255,255,0.6)" />{f}</div>
              ))}
            </div>
            <div className="pricing-cta">
              <a href="#agendar" className="btn btn-outline-white">Agendá una demo</a>
            </div>
          </div>

          <div className="pricing-card featured reveal reveal-delay-2">
            <div className="pricing-badge">Más elegido</div>
            <div>
              <div className="pricing-plan-name">Team</div>
              <div className="pricing-price" style={{ marginTop: '1rem' }}>
                <span className="price-currency">USD</span>
                <span className="price-amount">179</span>
                <span className="price-period">/mes</span>
              </div>
              <div className="pricing-setup">+ costo único de setup</div>
            </div>
            <div className="pricing-features">
              {['Vendedores ilimitados', 'Todo lo del plan Starter', 'Gestión de rutas y zonas', 'Reportes y métricas avanzadas', 'Integraciones (WhatsApp, email)', 'Soporte prioritario + onboarding'].map(f => (
                <div key={f} className="pricing-feature"><Check color="#CC5225" />{f}</div>
              ))}
            </div>
            <div className="pricing-cta">
              <a href="#agendar" className="btn btn-primary btn-arrow">Agendá una demo &nbsp;</a>
            </div>
          </div>
        </div>
        <div className="founding-note reveal">
          <p>⭐ <strong>Precio fundador disponible para los primeros 3 clientes.</strong> Si estás leyendo esto, probablemente todavía llegás. Hablemos.</p>
        </div>
      </div>
    </section>
  )
}
