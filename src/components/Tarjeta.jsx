function Tarjeta() {
  const datos = {
    titulo: 'Proyecto Final — App de Gestión',
    descripcion: 'Sistema para administrar tareas, usuarios y reportes de desempeño en equipos de trabajo remotos.',
    etiquetas: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    destacado: true,
  }

  const colores = [
    { bg: 'var(--pastel-lavender)', color: 'var(--accent-purple)' },
    { bg: 'var(--pastel-sky)',      color: 'var(--accent-blue)'   },
    { bg: 'var(--pastel-mint)',     color: 'var(--accent-teal)'   },
    { bg: 'var(--pastel-peach)',    color: 'var(--accent-coral)'  },
  ]

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: datos.destacado
        ? '1.5px solid #b5a7e8'
        : '0.5px solid var(--border)',
      padding: '1.25rem',
      maxWidth: 400,
      boxShadow: datos.destacado
        ? '0 0 0 4px #e8e4f740'
        : 'var(--shadow-sm)'
    }}>
      {datos.destacado && (
        <span className="badge" style={{
          background: 'var(--pastel-lavender)', color: 'var(--accent-purple)',
          fontSize: 11, marginBottom: 10, display: 'inline-block'
        }}>
          ★ Destacado
        </span>
      )}

      <h3 style={{ fontSize: 15, marginBottom: 8 }}>{datos.titulo}</h3>
      <p style={{ fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{datos.descripcion}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {datos.etiquetas.map((etiqueta, i) => {
          const c = colores[i % colores.length]
          return (
            <span key={etiqueta} className="badge" style={{
              background: c.bg, color: c.color,
              fontSize: 12, padding: '4px 10px'
            }}>
              {etiqueta}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Tarjeta