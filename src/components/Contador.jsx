import { useState } from 'react';
import BotonAccion from './BotonAccion';
import Alerta from './Alerta';

function Contador() {
  const [valor, setValor] = useState(0);

  return (
    <div className="contador-card">
      <div className="contador-display">
        <span className="contador-numero">{valor}</span>
      </div>

      {valor === 0 && (
        <Alerta tipo="info" titulo="Información">
          El contador está en cero
        </Alerta>
      )}
      {valor > 10 && (
        <Alerta tipo="advertencia" titulo="Atención">
          ¡Valor alto!
        </Alerta>
      )}

      <div className="contador-botones">
        <BotonAccion
          texto="− Decrementar"
          variante="secundario"
          disabled={valor === 0}
          onClick={() => setValor((prev) => prev - 1)}
        />
        <BotonAccion
          texto="+ Incrementar"
          variante="primario"
          onClick={() => setValor((prev) => prev + 1)}
        />
        <BotonAccion
          texto="+ 5"
          variante="primario"
          onClick={() => setValor((prev) => prev + 5)}
        />
        <BotonAccion
          texto="Reiniciar"
          variante="peligro"
          onClick={() => setValor(0)}
        />
      </div>
    </div>
  );
}

export default Contador;