import { useState } from 'react';
import Modal from './Modal';
import BotonAccion from './BotonAccion';
import Alerta from './Alerta';

const CONTACTOS_INICIALES = [
  { id: 1, nombre: 'Ana García', telefono: '555-1001', favorito: true },
  { id: 2, nombre: 'Carlos López', telefono: '555-1002', favorito: false },
  { id: 3, nombre: 'María Rodríguez', telefono: '555-1003', favorito: true },
  { id: 4, nombre: 'Luis Martínez', telefono: '555-1004', favorito: false },
  { id: 5, nombre: 'Elena Pérez', telefono: '555-1005', favorito: true },
];

function ListaContactos() {
  const [contactos, setContactos] = useState(CONTACTOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(null); // contacto a eliminar

  const toggleFavorito = (id) => {
    setContactos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c))
    );
  };

  const confirmarEliminar = () => {
    setContactos((prev) => prev.filter((c) => c.id !== modalEliminar.id));
    setModalEliminar(null);
  };

  const filtrados = contactos
    .filter((c) => (soloFavoritos ? c.favorito : true))
    .filter(
      (c) =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.telefono.includes(busqueda)
    );

  const totalFavoritos = contactos.filter((c) => c.favorito).length;

  return (
    <div className="lista-contactos">
      <div className="contactos-stats">
        <span className="stat-badge">
          ★ {totalFavoritos} / {contactos.length} favoritos
        </span>
        <span className="stat-badge">
          🔍 {filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="contactos-controles">
        <input
          className="input-busqueda"
          type="text"
          placeholder="Buscar por nombre o teléfono…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <BotonAccion
          texto={soloFavoritos ? '★ Mostrar todos' : '☆ Solo favoritos'}
          variante="secundario"
          onClick={() => setSoloFavoritos((prev) => !prev)}
        />
      </div>

      {filtrados.length === 0 ? (
        <Alerta tipo="info" titulo="Sin resultados">
          No se encontraron contactos
        </Alerta>
      ) : (
        <ul className="contactos-lista">
          {filtrados.map((c) => (
            <li key={c.id} className="contacto-item">
              <div className="contacto-info">
                <span className="contacto-nombre">{c.nombre}</span>
                <span className="contacto-telefono">{c.telefono}</span>
              </div>
              <div className="contacto-acciones">
                <button
                  className="btn-favorito"
                  onClick={() => toggleFavorito(c.id)}
                  title={c.favorito ? 'Quitar favorito' : 'Agregar a favoritos'}
                >
                  {c.favorito ? '★' : '☆'}
                </button>
                <BotonAccion
                  texto="Eliminar"
                  variante="peligro"
                  onClick={() => setModalEliminar(c)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        titulo="Confirmar eliminación"
        abierto={modalEliminar !== null}
      >
        <p className="modal-mensaje">
          ¿Estás seguro de eliminar a <strong>{modalEliminar?.nombre}</strong>?
        </p>
        <div className="modal-acciones">
          <BotonAccion
            texto="Cancelar"
            variante="secundario"
            onClick={() => setModalEliminar(null)}
          />
          <BotonAccion
            texto="Eliminar"
            variante="peligro"
            onClick={confirmarEliminar}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ListaContactos;