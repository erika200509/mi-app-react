function EstadoPedido() {
  const estado = 'enviado'

  const config = {
    pendiente:  { icono: '⏳', mensaje: 'Tu pedido está siendo procesado', color: 'var(--accent-amber)',  bg: 'var(--pastel-butter)' },
    enviado:    { icono: '🚚', mensaje: 'Tu pedido está en camino',          color: 'var(--accent-blue)',   bg: 'var(--pastel-sky)'    },
    entregado:  { icono: '✅', mensaje: 'Tu pedido ha sido entregado',       color: 'var(--accent-teal)',   bg: 'var(--pastel-mint)'   },
    cancelado:  { icono: '❌', mensaje: 'Tu pedido fue cancelado',           color: 'var(--accent-coral)',  bg: 'var(--pastel-peach)'  },
  }

  const actual = config[estado]

  return (
    <div className="card" style={{ maxWidth: 380 }}>
      <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600 }}>
        Estado del pedido
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', borderRadius: 'var(--radius-md)',
        background: actual.bg, border: `0.5px solid ${actual.color}30`
      }}>
        <span style={{ fontSize: 28 }}>{actual.icono}</span>
        <div>
          <p style={{ fontWeight: 600, color: actual.color, marginBottom: 2 }}>
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>{actual.mensaje}</p>
        </div>
      </div>

      {estado === 'enviado' && (
        <p style={{
          marginTop: 12, fontSize: 13, color: 'var(--accent-blue)',
          background: 'var(--pastel-sky)', padding: '8px 12px',
          borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-blue)'
        }}>
          Tiempo estimado de entrega: 2-3 días hábiles
        </p>
      )}
    </div>
  )
}

export default EstadoPedido