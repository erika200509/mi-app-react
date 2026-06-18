function Dashboard() {
  const usuario = {
    nombre: 'Hubert Castro Vazquez',
    email: 'hubertCV@gmail.com',
    rol: 'Colaborador tecnico'
  }

  const notificaciones = [
    { id: 1, mensaje: 'Tu reporte semanal está listo para revisar',   leida: false },
    { id: 2, mensaje: 'Nuevo comentario en el proyecto academico',         leida: true  },
    { id: 3, mensaje: 'Recordatorio: reunión mañana a las 10:00 AM',  leida: false },
    { id: 4, mensaje: 'Actualización de seguridad disponible',         leida: true  },
  ]

  const actividadReciente = [
    { id: 1, accion: 'Creó el proyecto "Dashboard v2"',  fecha: 'Hoy, 09:14' },
    { id: 2, accion: 'Aprobó solicitud de acceso #142',  fecha: 'Hoy, 08:50' },
    { id: 3, accion: 'Actualizó el perfil del equipo',   fecha: 'Ayer, 17:30' },
  ]

  const noLeidas = notificaciones.filter(n => !n.leida)
  const todasLeidas = noLeidas.length === 0

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600 }}>
          Información del usuario
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--pastel-rose)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: 'var(--accent-rose)', fontSize: 16
          }}>
            {usuario.nombre.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{usuario.nombre}</p>
            <p style={{ fontSize: 13, margin: 0 }}>{usuario.email}</p>
          </div>
          <span className="badge" style={{
            background: 'var(--pastel-lavender)', color: 'var(--accent-purple)',
            marginLeft: 'auto'
          }}>
            {usuario.rol}
          </span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
            Notificaciones
          </p>
          {!todasLeidas && (
            <span className="badge" style={{ background: '#fde8e8', color: '#b94040' }}>
              {noLeidas.length} sin leer
            </span>
          )}
        </div>

        {todasLeidas ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem 0' }}>
            No tienes notificaciones pendientes ✓
          </p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notificaciones.map(n => (
              <li key={n.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                background: n.leida ? 'transparent' : 'var(--pastel-sky)',
                opacity: n.leida ? 0.55 : 1,
                border: `0.5px solid ${n.leida ? 'transparent' : '#b5d4f040'}`
              }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{n.leida ? '○' : '●'}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: n.leida ? 400 : 600,
                  color: n.leida ? 'var(--text-muted)' : 'var(--text-primary)'
                }}>
                  {n.mensaje}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14, fontWeight: 600 }}>
          Actividad reciente
        </p>
        {actividadReciente.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
            No hay actividad reciente
          </p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {actividadReciente.map((a, i) => (
              <li key={a.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < actividadReciente.length - 1 ? '0.5px solid var(--border)' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--accent-teal)', flexShrink: 0
                  }} />
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{a.accion}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 12 }}>
                  {a.fecha}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Dashboard