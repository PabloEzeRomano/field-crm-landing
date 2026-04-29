export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <a href="#" className="wordmark" style={{ fontSize: '1.1rem' }}>
          <span className="wordmark-field">Field</span>
          <span className="wordmark-crm">CRM</span>
        </a>
        <span className="footer-tagline">Tu equipo de campo, bajo control.</span>
        <span className="footer-credit">Hecho con ❤ por <a href="#">gemm-apps</a> · <em>&ldquo;apps with soul&rdquo;</em></span>
      </div>
      <div className="footer-right">
        <a href="#problema" style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}>El problema</a>
        <a href="#como-funciona" style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}>Cómo funciona</a>
        <a href="#precios" style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}>Precios</a>
        <a href="#agendar" className="btn btn-primary" style={{ fontSize: '0.8125rem' }}>Agendá una demo</a>
      </div>
    </footer>
  )
}
