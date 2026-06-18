function ListaHabilidades() {
  const habilidades = ['React', 'JavaScript', 'CSS', 'Node.js', 'Git', 'TypeScript', 'Python', 'SQL']

  const colores = [
    { bg: 'var(--pastel-lavender)', color: 'var(--accent-purple)' },
    { bg: 'var(--pastel-sky)',      color: 'var(--accent-blue)'   },
    { bg: 'var(--pastel-mint)',     color: 'var(--accent-teal)'   },
    { bg: 'var(--pastel-peach)',    color: 'var(--accent-coral)'  },
    { bg: 'var(--pastel-rose)',     color: 'var(--accent-rose)'   },
    { bg: 'var(--pastel-butter)',   color: 'var(--accent-amber)'  },
  ]

  return (
    <div className="card" style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16 }}>Habilidades técnicas</h3>
        <span className="badge" style={{ background: 'var(--pastel-lavender)', color: 'var(--accent-purple)' }}>
          {habilidades.length} habilidades
        </span>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {habilidades.map((habilidad, i) => {
          const c = colores[i % colores.length]
          return (
            <li key={habilidad}>
              <span className="badge" style={{ background: c.bg, color: c.color, fontSize: 13, padding: '5px 12px' }}>
                {habilidad}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListaHabilidades