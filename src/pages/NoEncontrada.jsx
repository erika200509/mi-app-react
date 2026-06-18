export default function NoEncontrada({ navegar }) {
  return (
    <div className="page-404">
      <div className="error-404-card">
        <span className="error-404-num">404</span>
        <h1 className="error-404-title">Página no encontrada</h1>
        <p className="error-404-sub">La ruta que buscas no existe.</p>
        <button className="btn btn--primary btn--lg" onClick={() => navegar('/')}>
          🏠 Volver al inicio
        </button>
      </div>
    </div>
  );
}
