import { useState, useEffect } from 'react';
import './ConfiguracionUsuario.css';

const CLAVE = 'config-usuario';
const DEFAULTS = { nombre: '', tema: 'claro', notificaciones: true };

function leerStorage() {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export default function ConfiguracionUsuario() {
  const [config, setConfig] = useState(leerStorage);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(config));
      setGuardado(true);
      const t = setTimeout(() => setGuardado(false), 1500);
      return () => clearTimeout(t);
    } catch (e) {
      console.error('No se pudo guardar en localStorage', e);
    }
  }, [config]);

  const handleChange = (campo, valor) =>
    setConfig(prev => ({ ...prev, [campo]: valor }));

  const handleRestablecer = () => {
    localStorage.removeItem(CLAVE);
    setConfig(DEFAULTS);
  };

  return (
    <div className="config-card card">
      <div className="config-header">
        <span className="badge badge-mint">Ejercicio 3</span>
        <h2 className="config-title">Configuración de Usuario</h2>
        <p className="config-subtitle">Los cambios se persisten automáticamente en localStorage.</p>
      </div>

      <div className="config-body">
        {/* Formulario */}
        <div className="config-form">
          <div className="form-group">
            <label className="form-label">Nombre de usuario</label>
            <input
              className="form-input"
              type="text"
              placeholder="Tu nombre..."
              value={config.nombre}
              onChange={e => handleChange('nombre', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tema de interfaz</label>
            <select
              className="form-select"
              value={config.tema}
              onChange={e => handleChange('tema', e.target.value)}
            >
              <option value="claro">☀️ Claro</option>
              <option value="oscuro">🌙 Oscuro</option>
            </select>
          </div>

          <div className="config-checkbox-row">
            <label className="config-checkbox-label">
              <input
                type="checkbox"
                className="config-checkbox"
                checked={config.notificaciones}
                onChange={e => handleChange('notificaciones', e.target.checked)}
              />
              <span className="config-checkbox-custom" />
              <div>
                <span className="config-checkbox-text">Activar notificaciones</span>
                <span className="config-checkbox-hint">Recibe alertas en tiempo real</span>
              </div>
            </label>
          </div>
        </div>

        {/* Vista previa */}
        <div className="config-preview">
          <div className="preview-header">
            <span className="preview-title">Vista previa guardada</span>
            {guardado && <span className="preview-saved">✓ Guardado</span>}
          </div>
          <pre className="preview-json">
{JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </div>

      <div className="config-footer">
        <button className="btn btn-danger" onClick={handleRestablecer}>
          ↺ Restablecer valores
        </button>
      </div>
    </div>
  );
}
