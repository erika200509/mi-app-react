function Modal({ titulo, abierto, children }) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenedor">
        <h3 className="modal-titulo">{titulo}</h3>
        <div className="modal-cuerpo">{children}</div>
      </div>
    </div>
  );
}

export default Modal;