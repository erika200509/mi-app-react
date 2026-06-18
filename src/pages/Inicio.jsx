import { useNotas } from '../context/NotasContext';

const CATEGORIAS = ['personal', 'trabajo', 'estudio', 'ideas'];
const ETIQUETAS = { personal: 'Personal', trabajo: 'Trabajo', estudio: 'Estudio', ideas: 'Ideas' };
const EMOJIS = { personal: '🏠', trabajo: '💼', estudio: '📚', ideas: '💡' };

export default function Inicio({ navegar }) {
  const { notas } = useNotas();
  const fijadas = notas.filter((n) => n.fijada).length;
  const porCategoria = CATEGORIAS.map((cat) => ({
    cat,
    total: notas.filter((n) => n.categoria === cat).length,
  }));

  return (
    <div className="page-inicio">
      <section className="hero">
        <h1 className="hero-title">
          Bienvenido a <span className="hero-accent">MisNotas</span>
        </h1>
        <p className="hero-subtitle">
          Tu espacio personal para capturar ideas, tareas y apuntes en un solo lugar.
        </p>
        <div className="hero-actions">
          <button className="btn btn--primary btn--lg" onClick={() => navegar('/notas/nueva')}>
            ✏️ Crear nota
          </button>
          <button className="btn btn--secondary btn--lg" onClick={() => navegar('/notas')}>
            Ver todas
          </button>
        </div>
      </section>

      <section className="resumen">
        <h2 className="section-title">Resumen</h2>
        <div className="stats-grid">
          <div className="stat-card stat-card--total">
            <span className="stat-number">{notas.length}</span>
            <span className="stat-label">Total de notas</span>
          </div>
          <div className="stat-card stat-card--fijadas">
            <span className="stat-number">{fijadas}</span>
            <span className="stat-label">Notas fijadas</span>
          </div>
        </div>

        <h3 className="subsection-title">Por categoría</h3>
        <div className="categoria-grid">
          {porCategoria.map(({ cat, total }) => (
            <button
              key={cat}
              className={`categoria-card categoria-card--${cat}`}
              onClick={() => navegar('/notas')}
            >
              <span className="categoria-emoji">{EMOJIS[cat]}</span>
              <span className="categoria-nombre">{ETIQUETAS[cat]}</span>
              <span className="categoria-total">{total}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
