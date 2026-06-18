import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

export default function NuevaNota({ navegar, notificar }) {
  const { agregarNota } = useNotas();

  function handleGuardar(valores) {
    agregarNota(valores);
    notificar?.('¡Nota creada correctamente!', 'exito');
    navegar('/notas');
  }

  return (
    <div className="page-form">
      <div className="form-page-header">
        <h1 className="page-title">Nueva nota</h1>
        <p className="page-subtitle">Captura tu idea, tarea o apunte.</p>
      </div>
      <div className="form-card">
        <FormularioNota
          textoBtnGuardar="✓ Guardar nota"
          onGuardar={handleGuardar}
          onCancelar={() => navegar('/notas')}
        />
      </div>
    </div>
  );
}
