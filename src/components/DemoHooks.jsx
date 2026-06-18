import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotificacion } from '../hooks/useNotificacion';
import './DemoHooks.css';

const TIPOS = ['info', 'success', 'error'];

export default function DemoHooks() {
  const [visitas, setVisitas] = useLocalStorage('demo-visitas', 0);
  const [nombre, setNombre] = useLocalStorage('demo-nombre', '');
  const { notificacion, mostrar, cerrar } = useNotificacion(3000);

  const handleVisita = () => {
    setVisitas(v => v + 1);
    mostrar(`Visitas registradas: ${visitas + 1}`, 'success');
  };

  const handleResetear = () => {
    setVisitas(0);
    setNombre('');
    mostrar('Datos reseteados correctamente', 'info');
  };

  return (
    <div className="demo-card card">
      <div className="demo-header">
        <span className="badge badge-lavender">Ejercicio 4</span>
        <h2 className="demo-title">Custom Hooks en Acción</h2>
        <p className="demo-subtitle">
          <code>useLocalStorage</code> y <code>useNotificacion</code> trabajando juntos.
        </p>
      </div>

      <div className="demo-hooks-grid">
        {/* useLocalStorage demo */}
        <div className="demo-section">
          <div className="demo-section-label">useLocalStorage</div>
          <div className="form-group">
            <label className="form-label">Tu nombre (persiste)</label>
            <input
              className="form-input"
              type="text"
              placeholder="Escribe tu nombre..."
              value={nombre}
              onChange={e => {
                setNombre(e.target.value);
                mostrar('Nombre guardado en localStorage ✓', 'success');
              }}
            />
          </div>
          <div className="demo-stat-row">
            <div className="demo-stat">
              <span className="demo-stat-value">{visitas}</span>
              <span className="demo-stat-label">visitas registradas</span>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleVisita}>
              + Registrar visita
            </button>
          </div>
          <p className="demo-hint">
            🔄 Recarga la página — el nombre y las visitas persisten.
          </p>
        </div>

        {/* useNotificacion demo */}
        <div className="demo-section">
          <div className="demo-section-label">useNotificacion</div>
          <p className="demo-section-desc">
            Dispara notificaciones de distintos tipos. Desaparecen solas tras 3 segundos.
          </p>
          <div className="demo-notif-buttons">
            {TIPOS.map(tipo => (
              <button
                key={tipo}
                className={`btn btn-notif btn-notif-${tipo}`}
                onClick={() => mostrar(`Notificación de tipo "${tipo}"`, tipo)}
              >
                {tipo === 'success' ? '✓' : tipo === 'error' ? '✕' : 'ℹ'} {tipo}
              </button>
            ))}
          </div>
          <button className="btn btn-ghost demo-reset" onClick={handleResetear}>
            ↺ Limpiar todo
          </button>
        </div>
      </div>

      {/* Toast */}
      {notificacion && (
        <div className={`notification-toast ${notificacion.tipo}`}>
          <span className="notif-icon">
            {notificacion.tipo === 'success' ? '✓' : notificacion.tipo === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className="notif-msg">{notificacion.mensaje}</span>
          <button className="notif-close" onClick={cerrar}>×</button>
        </div>
      )}
    </div>
  );
}
