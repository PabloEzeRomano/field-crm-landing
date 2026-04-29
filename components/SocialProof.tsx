export default function SocialProof() {
  return (
    <section className="section-proof" id="testimonios">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Lo que dicen</p>
          <h2>Primeros clientes, resultados reales</h2>
        </div>
        <div className="proof-layout">
          <div className="proof-card reveal reveal-delay-1">
            <p className="proof-card-quote">&ldquo;Antes tenía que llamar a cada vendedor al final del día para saber qué había pasado. Ahora entro a Field y en dos minutos tengo el resumen completo. Recuperé horas de mi semana.&rdquo;</p>
            <div className="proof-card-author">
              <div className="proof-avatar">MR</div>
              <div>
                <div className="proof-author-name">Marcelo R.</div>
                <div className="proof-author-role">Gerente comercial · Distribuidora, Buenos Aires</div>
              </div>
            </div>
          </div>
          <div className="proof-card reveal reveal-delay-2">
            <p className="proof-card-quote">&ldquo;Lo difícil no era convencer a los vendedores de usar la herramienta — era encontrar una que no fuera un dolor de cabeza. Field lo resolvió. La adoptaron solos.&rdquo;</p>
            <div className="proof-card-author">
              <div className="proof-avatar">SL</div>
              <div>
                <div className="proof-author-name">Sofía L.</div>
                <div className="proof-author-role">Dueña · Agencia de seguros, Córdoba</div>
              </div>
            </div>
          </div>
        </div>
        <div className="proof-pilot-badge reveal" style={{ marginTop: '1.25rem' }}>
          <div className="pilot-dot" />
          <p className="pilot-text"><strong>Actualmente en piloto</strong> con tres empresas en Argentina — los primeros clientes fundadores tienen acceso anticipado y precio especial.</p>
        </div>
      </div>
    </section>
  )
}
