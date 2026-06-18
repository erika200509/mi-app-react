function Clima() {
  const temperatura = 22

  let sensacion
  let recomendacion
  let color
  let bg
  let emoji

  if (temperatura < 15) {
    sensacion = 'frío'
    recomendacion = 'Lleva abrigo y mantente abrigado'
    color = 'var(--accent-blue)'
    bg = 'var(--pastel-sky)'
    emoji = '🧥'
  } else if (temperatura <= 25) {
    sensacion = 'agradable'
    recomendacion = 'Disfruta el día al máximo'
    color = 'var(--accent-teal)'
    bg = 'var(--pastel-mint)'
    emoji = '😊'
  } else {
    sensacion = 'caluroso'
    recomendacion = 'Mantente hidratado y busca sombra'
    color = 'var(--accent-coral)'
    bg = 'var(--pastel-peach)'
    emoji = '☀️'
  }

  return (
    <div className="card" style={{ maxWidth: 380, background: bg, border: `0.5px solid ${color}30` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 36 }}>{emoji}</span>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 2 }}>Temperatura actual</p>
          <p style={{ fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{temperatura}°C</p>
        </div>
      </div>
      <div style={{ borderTop: `0.5px solid ${color}25`, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Sensación térmica</span>
          <span className="badge" style={{ background: `${color}18`, color }}>
            {sensacion}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>💡 {recomendacion}</p>
      </div>
    </div>
  )
}

export default Clima