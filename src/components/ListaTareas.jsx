function ListaTareas() {
  const tareas = [
    { id: 1, titulo: 'Estudiar React',completada: false, prioridad: 'alta'  },
    { id: 2, titulo: 'Hacer laboratorio',completada: true,  prioridad: 'alta'  },
    { id: 3, titulo: 'Comprar comida',completada: false, prioridad: 'media' },
    { id: 4, titulo: 'Lavar ropa',completada: false, prioridad: 'alta'  },
    { id: 5, titulo: 'Leer libro',completada: true,  prioridad: 'baja'  },
    { id: 6, titulo: 'Ir al gimnasio',completada: false, prioridad: 'media' },
    { id: 7, titulo: 'Pagar facturas',completada: true,  prioridad: 'alta'  },
  ]

  const pendientes  = tareas.filter(t => !t.completada)
  const completadas = tareas.filter(t =>  t.completada)

  const prioridadBadge = (p) => {
    const map = {
      alta:  { bg: '#fde8e8', color: '#b94040' },
      media: { bg: 'var(--pastel-butter)', color: 'var(--accent-amber)' },
      baja:  { bg: 'var(--pastel-mint)',   color: 'var(--accent-teal)'  },
    }
    return map[p]
  }

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>

      <div className="card" style={{ flex: '1 1 260px', minWidth: 260 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 15 }}>Tareas pendientes</h3>
          <span className="badge" style={{ background: '#fde8e8', color: '#b94040' }}>{pendientes.length}</span>
        </div>
        {pendientes.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
            No hay tareas pendientes 🎉
          </p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pendientes.map(t => {
              const c = prioridadBadge(t.prioridad)
              return (
                <li key={t.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-2)',
                  borderLeft: t.prioridad === 'alta' ? '3px solid #d45050' : '3px solid transparent'
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: t.prioridad === 'alta' ? 600 : 400,
                    color: t.prioridad === 'alta' ? '#b94040' : 'var(--text-primary)'
                  }}>{t.titulo}</span>
                  <span className="badge" style={{ background: c.bg, color: c.color, fontSize: 11, marginLeft: 8, flexShrink: 0 }}>
                    {t.prioridad}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="card" style={{ flex: '1 1 260px', minWidth: 260 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 15 }}>Tareas completadas</h3>
          <span className="badge" style={{ background: 'var(--pastel-mint)', color: 'var(--accent-teal)' }}>{completadas.length}</span>
        </div>
        {completadas.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
            No hay tareas completadas
          </p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {completadas.map(t => (
              <li key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-2)'
              }}>
                <span style={{ color: 'var(--accent-teal)', fontSize: 14 }}>✓</span>
                <span style={{
                  fontSize: 13,
                  textDecoration: 'line-through',
                  color: 'var(--text-muted)'
                }}>{t.titulo}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default ListaTareas