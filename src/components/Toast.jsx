export default function Toast({ notificacion }) {
  if (!notificacion) return null;

  const clases = {
    exito: 'toast toast--exito',
    error: 'toast toast--error',
    info: 'toast toast--info',
  };

  return (
    <div className={clases[notificacion.tipo] || 'toast toast--info'} role="alert">
      <span className="toast-icono">
        {notificacion.tipo === 'exito' && '✓'}
        {notificacion.tipo === 'error' && '✕'}
        {notificacion.tipo === 'info' && 'ℹ'}
      </span>
      {notificacion.mensaje}
    </div>
  );
}
