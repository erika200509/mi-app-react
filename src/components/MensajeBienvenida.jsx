function MensajeBienvenida() {
  const usuario = { nombre: 'Maite Colina Cal', rol: 'admin' }
  // Prueba con null: const usuario = null

  if (!usuario) {
    return (
      <div className="card" style={{ maxWidth: 380, textAlign: 'center', padding: '2rem' }}>
        <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🔒</span>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          Por favor, inicia sesión para continuar
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 380 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--pastel-lavender)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, color: 'var(--accent-purple)', fontSize: 16
        }}>
          {usuario.nombre.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h2 style={{ fontSize: 16, marginBottom: 2 }}>Bienvenido, {usuario.nombre}</h2>
          <p style={{ fontSize: 13, margin: 0 }}>Rol: {usuario.rol}</p>
        </div>
      </div>

      {usuario.rol === 'admin' && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', borderRadius: 'var(--radius-md)',
          background: 'var(--pastel-lavender)', border: '0.5px solid #c4b8f0'
        }}>
          <span>🛡️</span>
          <p style={{ fontSize: 13, color: 'var(--accent-purple)', margin: 0, fontWeight: 500 }}>
            Tienes acceso completo al sistema
          </p>
        </div>
      )}
    </div>
  )
}

export default MensajeBienvenida