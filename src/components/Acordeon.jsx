import { useState } from 'react';

function Acordeon({ titulo, children, defaultAbierto = false }) {
  const [expandido, setExpandido] = useState(defaultAbierto);

  return (
    <div className={`acordeon ${expandido ? 'acordeon-abierto' : ''}`}>
      <button
        className="acordeon-header"
        onClick={() => setExpandido((prev) => !prev)}
      >
        <span className="acordeon-titulo">{titulo}</span>
        <span className="acordeon-indicador">{expandido ? '▼' : '▶'}</span>
      </button>
      {expandido && <div className="acordeon-body">{children}</div>}
    </div>
  );
}

export default Acordeon;