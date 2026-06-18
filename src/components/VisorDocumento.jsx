import { useState, useEffect } from 'react';
import './VisorDocumento.css';

export default function VisorDocumento() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    document.title = `Contador: ${contador} - Mi App`;
    return () => {
      document.title = 'Mi App';
    };
  }, [contador]);

  return (
    <div className="visor-card card">
      <div className="visor-header">
        <span className="badge badge-lavender">Ejercicio 1</span>
        <h2 className="visor-title">Visor de Documento</h2>
        <p className="visor-subtitle">
          El título de la pestaña se sincroniza con el contador.
        </p>
      </div>

      <div className="visor-display">
        <div className="visor-counter-ring">
          <span className="visor-counter-value">{contador}</span>
          <span className="visor-counter-label">contador</span>
        </div>
      </div>

      <div className="visor-actions">
        <button
          className="btn btn-secondary"
          onClick={() => setContador(c => c - 1)}
        >
          − Decrementar
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setContador(c => c + 1)}
        >
          + Incrementar
        </button>
      </div>
    </div>
  );
}