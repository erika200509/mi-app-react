function BotonAccion({ texto, variante = 'primario', disabled = false, onClick }) {
  return (
    <button
      className={`boton boton-${variante}`}
      disabled={disabled}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default BotonAccion;