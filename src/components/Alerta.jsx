const TIPOS = {
  exito: {
    icono: '✓',
    clase: 'alerta-exito',
  },
  advertencia: {
    icono: '⚠',
    clase: 'alerta-advertencia',
  },
  error: {
    icono: '✕',
    clase: 'alerta-error',
  },
  info: {
    icono: 'ℹ',
    clase: 'alerta-info',
  },
};

function Alerta({ tipo = 'info', titulo, children }) {
  const config = TIPOS[tipo] || TIPOS.info;

  return (
    <div className={`alerta ${config.clase}`}>
      <div className="alerta-encabezado">
        <span className="alerta-icono">{config.icono}</span>
        {titulo && <span className="alerta-titulo">{titulo}</span>}
      </div>
      {children && <div className="alerta-contenido">{children}</div>}
    </div>
  );
}

export default Alerta;