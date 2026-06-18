import { useNotas } from '../context/NotasContext';

export default function DetalleNota({ id, navegar, notificar }) {
  const { notas, eliminarNota, toggleFijada } = useNotas();
  const nota = notas.find((n) => n.id === id);

  if (!nota) {
    return (
      <div className="not-found-card">
        <span className="not-found-icon">🔍</span>
        <h2>Nota no encontrada</h2>
        <p>La nota que buscas no existe o fue eliminada.</p>
        <button className="btn btn--primary" onClick={() => navegar('/notas')}>Volver a notas</button>
      </div>
    );
  }

  function handleEliminar() {
    if (window.confirm(`¿Eliminar la nota "${nota.titulo}"? Esta acción no se puede deshacer.`)) {
      eliminarNota(nota.id);
      notificar?.('Nota eliminada correctamente', 'exito');
      navegar('/notas');
    }
  }

  function handleToggleFijada() {
    toggleFijada(nota.id);
    notificar?.(nota.fijada ? 'Nota desfijada' : 'Nota fijada 📌', 'info');
  }

  return (
    <div className="page-detalle">
      <div className="detalle-nav">
        <button className="btn-volver" onClick={() => navegar('/notas')}>← Volver a notas</button>
      </div>

      <article className={`detalle-card${nota.fijada ? ' detalle-card--fijada' : ''}`}>
        <header className="detalle-header">
          <div className="detalle-meta">
            <span className={`badge badge--${nota.categoria}`}>{nota.categoria}</span>
            {nota.fijada && <span className="fijada-tag">📌 Fijada</span>}
          </div>
          <h1 className="detalle-titulo">{nota.titulo}</h1>
          <time className="detalle-fecha">
            🗓 Creada el{' '}
            {new Date(nota.fechaCreacion).toLocaleDateString('es-ES', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
            })}
          </time>
        </header>
        <div className="detalle-contenido">
          {nota.contenido.split('\n').map((linea, i) => <p key={i}>{linea}</p>)}
        </div>
      </article>

      <div className="detalle-acciones">
        <button className="btn btn--secondary" onClick={handleToggleFijada}>
          {nota.fijada ? '📌 Desfijar' : '📌 Fijar'}
        </button>
        <button className="btn btn--primary" onClick={() => navegar(`/notas/${nota.id}/editar`)}>
          ✏️ Editar
        </button>
        <button className="btn btn--danger" onClick={handleEliminar}>
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
}
