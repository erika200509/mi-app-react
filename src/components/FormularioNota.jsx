import { useState } from 'react';

const valoresVacios = {
  titulo: '',
  contenido: '',
  categoria: 'personal',
  fijada: false,
};

export default function FormularioNota({
  valoresIniciales = valoresVacios,
  textoBtnGuardar = 'Guardar nota',
  onGuardar,
  onCancelar,
}) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  function validar(campos) {
    const e = {};
    if (!campos.titulo || campos.titulo.trim().length < 3)
      e.titulo = 'El título debe tener al menos 3 caracteres.';
    if (!campos.contenido || campos.contenido.trim().length < 10)
      e.contenido = 'El contenido debe tener al menos 10 caracteres.';
    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const nuevos = { ...valores, [name]: type === 'checkbox' ? checked : value };
    setValores(nuevos);
    if (tocado[name]) {
      setErrores(validar(nuevos));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTocado((t) => ({ ...t, [name]: true }));
    setErrores(validar(valores));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todoTocado = { titulo: true, contenido: true };
    setTocado(todoTocado);
    const errs = validar(valores);
    setErrores(errs);
    if (Object.keys(errs).length === 0) {
      onGuardar(valores);
    }
  }

  const hayErrores = Object.keys(validar(valores)).length > 0;

  return (
    <form className="nota-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="titulo" className="form-label">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          className={`form-input${errores.titulo && tocado.titulo ? ' form-input--error' : ''}`}
          value={valores.titulo}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe un título..."
        />
        {errores.titulo && tocado.titulo && (
          <span className="form-error">{errores.titulo}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contenido" className="form-label">
          Contenido
        </label>
        <textarea
          id="contenido"
          name="contenido"
          className={`form-textarea${errores.contenido && tocado.contenido ? ' form-input--error' : ''}`}
          value={valores.contenido}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe el contenido de tu nota..."
          rows={6}
        />
        {errores.contenido && tocado.contenido && (
          <span className="form-error">{errores.contenido}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="categoria" className="form-label">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          className="form-select"
          value={valores.categoria}
          onChange={handleChange}
        >
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="ideas">Ideas</option>
        </select>
      </div>

      <div className="form-group form-group--checkbox">
        <label className="form-checkbox-label">
          <input
            name="fijada"
            type="checkbox"
            className="form-checkbox"
            checked={valores.fijada}
            onChange={handleChange}
          />
          <span>📌 Fijar esta nota</span>
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onCancelar}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={hayErrores && Object.keys(tocado).length > 0}
        >
          {textoBtnGuardar}
        </button>
      </div>
    </form>
  );
}
