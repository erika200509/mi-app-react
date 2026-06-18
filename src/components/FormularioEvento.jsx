import { useState } from 'react';
import BotonAccion from './BotonAccion';
import Alerta from './Alerta';

const ESTADO_INICIAL = {
  titulo: '',
  fecha: '',
  categoria: '',
  descripcion: '',
  esPublico: true,
};

function FormularioEvento() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState(null);
  const [eventos, setEventos] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const hoy = new Date().toISOString().split('T')[0];

    if (form.titulo.trim().length < 5)
      nuevosErrores.titulo = 'El título debe tener al menos 5 caracteres.';
    if (!form.fecha)
      nuevosErrores.fecha = 'La fecha es obligatoria.';
    else if (form.fecha < hoy)
      nuevosErrores.fecha = 'La fecha no puede ser en el pasado.';
    if (!form.categoria)
      nuevosErrores.categoria = 'Debes seleccionar una categoría.';
    if (form.descripcion.trim().length < 20)
      nuevosErrores.descripcion = 'La descripción debe tener al menos 20 caracteres.';

    return nuevosErrores;
  };

  const hayVacios =
    !form.titulo || !form.fecha || !form.categoria || !form.descripcion;

  const handleSubmit = () => {
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const nuevoEvento = { ...form, id: Date.now() };
    setEventos((prev) => [...prev, nuevoEvento]);
    setConfirmacion(nuevoEvento);
    setForm(ESTADO_INICIAL);
    setErrores({});

    setTimeout(() => setConfirmacion(null), 4000);
  };

  return (
    <div className="formulario-evento">
      <div className="form-grid">
        <div className="form-campo">
          <label className="form-label">Título del evento</label>
          <input
            className={`form-input ${errores.titulo ? 'input-error' : ''}`}
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ej. React Summit 2025"
          />
          {errores.titulo && (
            <Alerta tipo="error">{errores.titulo}</Alerta>
          )}
        </div>

        <div className="form-campo">
          <label className="form-label">Fecha</label>
          <input
            className={`form-input ${errores.fecha ? 'input-error' : ''}`}
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />
          {errores.fecha && (
            <Alerta tipo="error">{errores.fecha}</Alerta>
          )}
        </div>

        <div className="form-campo">
          <label className="form-label">Categoría</label>
          <select
            className={`form-input form-select ${errores.categoria ? 'input-error' : ''}`}
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="conferencia">Conferencia</option>
            <option value="taller">Taller</option>
            <option value="seminario">Seminario</option>
            <option value="otro">Otro</option>
          </select>
          {errores.categoria && (
            <Alerta tipo="error">{errores.categoria}</Alerta>
          )}
        </div>

        <div className="form-campo form-campo-full">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-input form-textarea ${errores.descripcion ? 'input-error' : ''}`}
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Describe el evento con al menos 20 caracteres…"
            rows={4}
          />
          {errores.descripcion && (
            <Alerta tipo="error">{errores.descripcion}</Alerta>
          )}
        </div>

        <div className="form-campo form-campo-check">
          <label className="form-label-check">
            <input
              type="checkbox"
              name="esPublico"
              checked={form.esPublico}
              onChange={handleChange}
            />
            Evento público
          </label>
        </div>
      </div>

      <div className="form-submit">
        <BotonAccion
          texto="Registrar evento"
          variante="primario"
          disabled={hayVacios}
          onClick={handleSubmit}
        />
      </div>

      {confirmacion && (
        <Alerta tipo="exito" titulo="Evento registrado">
          <strong>{confirmacion.titulo}</strong> — {confirmacion.fecha} —{' '}
          {confirmacion.categoria} —{' '}
          {confirmacion.esPublico ? 'Público' : 'Privado'}
        </Alerta>
      )}

      {eventos.length > 0 && (
        <div className="eventos-registrados">
          <h4 className="eventos-titulo">Eventos registrados en esta sesión</h4>
          <ul className="eventos-lista">
            {eventos.map((ev) => (
              <li key={ev.id} className="evento-item">
                <span className="evento-nombre">{ev.titulo}</span>
                <span className="evento-meta">
                  {ev.fecha} · {ev.categoria} ·{' '}
                  <span className={`badge-visibilidad ${ev.esPublico ? 'publico' : 'privado'}`}>
                    {ev.esPublico ? 'Público' : 'Privado'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FormularioEvento;