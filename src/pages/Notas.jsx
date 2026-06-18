import { useNotas } from '../context/NotasContext';

export default function Notas({ navegar, notificar }) {
  const { notas, filtroCategoria, busqueda, cambiarFiltro, cambiarBusqueda, toggleFijada } = useNotas();

  const notasFiltradas = notas.filter((n) => {
    const termino = busqueda.toLowerCase();
    const coincideBusqueda =
      n.titulo.toLowerCase().includes(termino) ||
      n.contenido.toLowerCase().includes(termino);
    const coincideCategoria =
      filtroCategoria === 'todas' || n.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const fijadas = notasFiltradas.filter((n) => n.fijada);
  const noFijadas = notasFiltradas.filter((n) => !n.fijada);

  return (
    <div className="page-notas">
      <div className="notas-header">
        <h1 className="page-title">Mis notas</h1>
        <span className="resultados-contador">
          {notasFiltradas.length} de {notas.length} nota{notas.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="filtros">
        <div className="filtro-busqueda">
          <span className="filtro-icono">🔍</span>
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por título o contenido..."
            value={busqueda}
            onChange={(e) => cambiarBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="filtro-limpiar" onClick={() => cambiarBusqueda('')}>✕</button>
          )}
        </div>
        <select
          className="form-select filtro-select"
          value={filtroCategoria}
          onChange={(e) => cambiarFiltro(e.target.value)}
        >
          <option value="todas">Todas las categorías</option>
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="ideas">Ideas</option>
        </select>
      </div>

      {notasFiltradas.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🗒️</span>
          <p className="empty-title">No hay notas que coincidan</p>
          <p className="empty-sub">Intenta con otros filtros o crea una nueva nota.</p>
          <button className="btn btn--primary" onClick={() => navegar('/notas/nueva')}>Crear nota</button>
        </div>
      ) : (
        <>
          {fijadas.length > 0 && (
            <section className="notas-seccion">
              <h2 className="seccion-label">📌 Fijadas</h2>
              <div className="notas-grid">
                {fijadas.map((nota) => (
                  <TarjetaNota key={nota.id} nota={nota} onToggle={toggleFijada} onVer={() => navegar(`/notas/${nota.id}`)} notificar={notificar} />
                ))}
              </div>
            </section>
          )}
          {noFijadas.length > 0 && (
            <section className="notas-seccion">
              {fijadas.length > 0 && <h2 className="seccion-label">📄 Otras notas</h2>}
              <div className="notas-grid">
                {noFijadas.map((nota) => (
                  <TarjetaNota key={nota.id} nota={nota} onToggle={toggleFijada} onVer={() => navegar(`/notas/${nota.id}`)} notificar={notificar} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function TarjetaNota({ nota, onToggle, onVer, notificar }) {
  const resumen = nota.contenido.length > 100 ? nota.contenido.slice(0, 100) + '...' : nota.contenido;

  return (
    <div
      className={`nota-card${nota.fijada ? ' nota-card--fijada' : ''}`}
      onClick={onVer}
      style={{ cursor: 'pointer' }}
    >
      <div className="nota-card-header">
        <span className={`badge badge--${nota.categoria}`}>{nota.categoria}</span>
        <button
          className={`btn-fijar${nota.fijada ? ' btn-fijar--activo' : ''}`}
          title={nota.fijada ? 'Desfijar' : 'Fijar'}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(nota.id);
            notificar?.(nota.fijada ? 'Nota desfijada' : 'Nota fijada 📌', 'info');
          }}
        >
          📌
        </button>
      </div>
      <h3 className="nota-card-titulo">{nota.titulo}</h3>
      <p className="nota-card-contenido">{resumen}</p>
      <div className="nota-card-footer">
        <span className="nota-card-fecha">
          🗓 {new Date(nota.fechaCreacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
}
