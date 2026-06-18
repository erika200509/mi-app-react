import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

export default function EditarNota({ id, navegar, notificar }) {
  const { notas, editarNota } = useNotas();
  const nota = notas.find((n) => n.id === id);

  if (!nota) {
    return (
      <div className="not-found-card">
        <span className="not-found-icon">🔍</span>
        <h2>Nota no encontrada</h2>
        <p>La nota que intentas editar no existe.</p>
        <button className="btn btn--primary" onClick={() => navegar('/notas')}>Volver a notas</button>
      </div>
    );
  }

  const valoresIniciales = {
    titulo: nota.titulo,
    contenido: nota.contenido,
    categoria: nota.categoria,
    fijada: nota.fijada,
  };

  function handleGuardar(valores) {
    editarNota(nota.id, valores);
    notificar?.('Nota actualizada correctamente', 'exito');
    navegar(`/notas/${nota.id}`);
  }

  return (
    <div className="page-form">
      <div className="form-page-header">
        <h1 className="page-title">Editar nota</h1>
        <p className="page-subtitle">Modifica los datos de tu nota.</p>
      </div>
      <div className="form-card">
        <FormularioNota
          valoresIniciales={valoresIniciales}
          textoBtnGuardar="✓ Guardar cambios"
          onGuardar={handleGuardar}
          onCancelar={() => navegar(`/notas/${nota.id}`)}
        />
      </div>
    </div>
  );
}
