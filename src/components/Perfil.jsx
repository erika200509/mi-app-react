function Perfil() {
  const nombre = "Erika Calle Colina"
  const profesion = "Desarrolladora Full Stack"
  const experiencia = 2
  const disponible = true

  return (
    <div className="card" style={{ maxWidth: 420 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--pastel-lavender)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 700, color: 'var(--accent-purple)'
        }}>
          {nombre.charAt(0)}
        </div>
        <div>
          <h2 style={{ fontSize: 18, marginBottom: 2 }}>{nombre}</h2>
          <p style={{ fontSize: 14, margin: 0 }}>{profesion}</p>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 10, flexWrap: 'wrap'
      }}>
        <span className="badge" style={{
          background: 'var(--pastel-sky)', color: 'var(--accent-blue)'
        }}>
          ✦ {experiencia} años de experiencia
        </span>
        <span className="badge" style={{
          background: disponible ? 'var(--pastel-mint)' : 'var(--pastel-peach)',
          color: disponible ? 'var(--accent-teal)' : 'var(--accent-coral)'
        }}>
          {disponible ? '● Disponible para contratar' : '● No disponible'}
        </span>
      </div>
    </div>
  )
}

export default Perfil