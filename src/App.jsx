import { useState } from 'react';
import './index.css';
import './App.css';

// Componentes del Laboratorio 2
import Perfil from './components/Perfil';
import Clima from './components/Clima';
import EstadoPedido from './components/EstadoPedido';
import MensajeBienvenida from './components/MensajeBienvenida';
import ListaHabilidades from './components/ListaHabilidades';
import ListaProductos from './components/ListaProductos';
import ListaTareas from './components/ListaTareas';
import Tarjeta from './components/Tarjeta';
import Dashboard from './components/Dashboard';

// Componentes del Laboratorio 3
import Alerta from './components/Alerta';
import Acordeon from './components/Acordeon';
import Modal from './components/Modal';
import BotonAccion from './components/BotonAccion';
import Contador from './components/Contador';
import ListaContactos from './components/ListaContactos';
import FormularioEvento from './components/FormularioEvento';

// Componentes del Laboratorio 4
import VisorDocumento from './components/VisorDocumento';
import TemporizadorPomodoro from './components/TemporizadorPomodoro';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import DemoHooks from './components/DemoHooks';

// Ejercicios del Laboratorio 2
const ejerciciosLab2 = [
  {
    num: '01',
    titulo: 'Componente con expresiones dinámicas',
    comp: <Perfil />,
    color: 'var(--pastel-lavender)',
    accent: 'var(--accent-purple)',
  },
  {
    num: '02',
    titulo: 'Lógica previa al return',
    comp: <Clima />,
    color: 'var(--pastel-mint)',
    accent: 'var(--accent-teal)',
  },
  {
    num: '03',
    titulo: 'Renderizado condicional con ternario',
    comp: <EstadoPedido />,
    color: 'var(--pastel-sky)',
    accent: 'var(--accent-blue)',
  },
  {
    num: '04',
    titulo: 'Renderizado condicional con early return',
    comp: <MensajeBienvenida />,
    color: 'var(--pastel-peach)',
    accent: 'var(--accent-coral)',
  },
  {
    num: '05',
    titulo: 'Renderizado de lista simple',
    comp: <ListaHabilidades />,
    color: 'var(--pastel-rose)',
    accent: 'var(--accent-rose)',
  },
  {
    num: '06',
    titulo: 'Renderizado de lista con objetos',
    comp: <ListaProductos />,
    color: 'var(--pastel-butter)',
    accent: 'var(--accent-amber)',
  },
  {
    num: '07',
    titulo: 'Combinación de filter y map',
    comp: <ListaTareas />,
    color: 'var(--pastel-lavender)',
    accent: 'var(--accent-purple)',
  },
  {
    num: '08',
    titulo: 'Componente reutilizable — tarjeta',
    comp: <Tarjeta />,
    color: 'var(--pastel-mint)',
    accent: 'var(--accent-teal)',
  },
  {
    num: '09',
    titulo: 'Fragment y múltiples secciones — Dashboard',
    comp: <Dashboard />,
    color: 'var(--pastel-sky)',
    accent: 'var(--accent-blue)',
    wide: true,
  },
];

// Pestañas principales de la aplicación
const MAIN_TABS = [
  { id: 'lab2', label: 'Laboratorio 2', icon: '📘' },
  { id: 'lab3', label: 'Laboratorio 3', icon: '🎮' },
  { id: 'lab4', label: 'Laboratorio 4', icon: '⚛️' },
];

// Sub-pestañas del Laboratorio 4
const LAB4_TABS = [
  { id: 'ej1', label: 'Ej. 1 — Visor', icon: '📄' },
  { id: 'ej2', label: 'Ej. 2 — Pomodoro', icon: '🍅' },
  { id: 'ej3', label: 'Ej. 3 — Config', icon: '⚙️' },
  { id: 'ej4', label: 'Ej. 4 — Custom Hooks', icon: '🪝' },
];

function App() {
  const [mainTab, setMainTab] = useState('lab2');
  const [lab4SubTab, setLab4SubTab] = useState('ej1');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarVisor, setMostrarVisor] = useState(true);

  // Renderizado del Laboratorio 2
  const renderLab2 = () => (
    <div>
      <div style={{ 
        borderBottom: '2px solid var(--pastel-lavender)', 
        marginBottom: '1.5rem', 
        paddingBottom: '0.5rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}>Laboratorio 2 — Fundamentos de React</h2>
      </div>
      
      {ejerciciosLab2.map(({ num, titulo, comp, color, accent, wide }) => (
        <section key={num} style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: 'var(--radius-sm)',
              background: color, color: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0
            }}>
              {num}
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>{titulo}</h3>
          </div>

          <div style={wide ? {} : { display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {comp}
          </div>
        </section>
      ))}
    </div>
  );

  // Renderizado del Laboratorio 3
  const renderLab3 = () => (
    <div>
      <div style={{ 
        borderBottom: '2px solid var(--pastel-sky)', 
        marginBottom: '1.5rem', 
        paddingBottom: '0.5rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-blue)' }}>Laboratorio 3 — Componentes interactivos con Props y Estado</h2>
      </div>

      {/* Ejercicio 1 — Props, Children y Acordeón */}
      <Acordeon titulo="Ejercicio 1 — Props, Children y Acordeón" defaultAbierto={true}>
        <section className="seccion">
          <h3 className="seccion-titulo">Componente Alerta</h3>
          <div className="demo-stack">
            <Alerta tipo="exito" titulo="Operación completada">
              Los cambios se guardaron correctamente en el servidor.
            </Alerta>
            <Alerta tipo="advertencia" titulo="Revisa tu conexión">
              Tu sesión expirará en 5 minutos. Guarda tu progreso.
            </Alerta>
            <Alerta tipo="error" titulo="Error al procesar">
              No se pudo completar la solicitud. Inténtalo de nuevo.
            </Alerta>
            <Alerta tipo="info" titulo="¿Sabías que…?">
              Puedes usar el atajo <kbd>Ctrl + S</kbd> para guardar rápidamente.
            </Alerta>
          </div>

          <h3 className="seccion-titulo" style={{ marginTop: '2rem' }}>
            Componente Acordeón (independiente)
          </h3>
          <div className="demo-stack">
            <Acordeon titulo="¿Qué es React?">
              React es una biblioteca de JavaScript para construir interfaces de
              usuario. Fue creada por Meta y se basa en componentes reutilizables.
            </Acordeon>
            <Acordeon titulo="¿Qué son los hooks?">
              Los hooks son funciones especiales que permiten usar estado y otras
              características de React en componentes funcionales, como{' '}
              <code>useState</code> y <code>useEffect</code>.
            </Acordeon>
            <Acordeon titulo="¿Qué es Vite?">
              Vite es una herramienta de construcción moderna que ofrece un
              servidor de desarrollo muy rápido gracias al uso de módulos ES
              nativos del navegador.
            </Acordeon>
          </div>
        </section>
      </Acordeon>

      {/* Ejercicio 2 — Composición, Estado y Eventos */}
      <Acordeon titulo="Ejercicio 2 — Composición, Estado y Eventos">
        <section className="seccion">
          <h3 className="seccion-titulo">Modal y BotonAccion</h3>
          <div className="demo-row">
            <BotonAccion
              texto="Abrir Modal"
              variante="primario"
              onClick={() => setModalAbierto(true)}
            />
            <BotonAccion texto="Botón secundario" variante="secundario" />
            <BotonAccion texto="Acción peligrosa" variante="peligro" />
            <BotonAccion texto="Deshabilitado" variante="primario" disabled />
          </div>

          <Modal titulo="Detalle del componente" abierto={modalAbierto}>
            <p className="modal-mensaje">
              Este modal fue abierto desde App.jsx usando un estado booleano
              controlado con <code>useState</code>.
            </p>
            <div className="modal-acciones">
              <BotonAccion
                texto="Cerrar"
                variante="secundario"
                onClick={() => setModalAbierto(false)}
              />
            </div>
          </Modal>

          <h3 className="seccion-titulo" style={{ marginTop: '2rem' }}>
            Contador
          </h3>
          <Contador />
        </section>
      </Acordeon>

      {/* Ejercicio 3 — Lista Dinámica con Inmutabilidad */}
      <Acordeon titulo="Ejercicio 3 — Lista Dinámica con Inmutabilidad">
        <section className="seccion">
          <ListaContactos />
        </section>
      </Acordeon>

      {/* Ejercicio 4 — Formulario Controlado con Validación */}
      <Acordeon titulo="Ejercicio 4 — Formulario Controlado con Validación">
        <section className="seccion">
          <FormularioEvento />
        </section>
      </Acordeon>
    </div>
  );

  // Renderizado del Laboratorio 4
  const renderLab4 = () => (
    <div>
      <div style={{ 
        borderBottom: '2px solid var(--pastel-mint)', 
        marginBottom: '1.5rem', 
        paddingBottom: '0.5rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-teal)' }}>Laboratorio 4 — Efectos Secundarios · Persistencia · Custom Hooks</h2>
      </div>

      {/* Sub-pestañas del Lab 4 */}
      <nav className="app-nav" style={{ marginBottom: '2rem' }}>
        <div className="app-nav-inner">
          {LAB4_TABS.map(t => (
            <button
              key={t.id}
              className={`nav-tab ${lab4SubTab === t.id ? 'nav-tab-active' : ''}`}
              onClick={() => setLab4SubTab(t.id)}
            >
              <span>{t.icon}</span>
              <span className="nav-tab-label">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido del Lab 4 */}
      <div className="exercise-wrapper">
        {lab4SubTab === 'ej1' && (
          <>
            {mostrarVisor ? (
              <>
                <VisorDocumento />
                <div className="dismount-row">
                  <button
                    className="btn btn-danger"
                    onClick={() => setMostrarVisor(false)}
                  >
                    🧪 Simular desmontaje
                  </button>
                  <span className="dismount-hint">
                    El título volverá a "Mi App" al desmontar.
                  </span>
                </div>
              </>
            ) : (
              <div className="card dismount-msg">
                <span className="dismount-emoji">🔌</span>
                <h3>Componente desmontado</h3>
                <p>El título de la pestaña fue restaurado a <strong>"Mi App"</strong>. La función de limpieza funcionó correctamente.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setMostrarVisor(true)}
                >
                  ↩ Remontar componente
                </button>
              </div>
            )}
          </>
        )}

        {lab4SubTab === 'ej2' && (
          <TemporizadorPomodoro />
        )}

        {lab4SubTab === 'ej3' && (
          <ConfiguracionUsuario />
        )}

        {lab4SubTab === 'ej4' && (
          <DemoHooks />
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem 4rem', maxWidth: 960, margin: '0 auto' }}>

      {/* Cabecera principal */}
      <header style={{ maxWidth: 900, margin: '0 auto 3rem', textAlign: 'center' }}>
        <p style={{
          fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--accent-purple)', fontWeight: 600, marginBottom: 8
        }}>
          Programación Web Avanzada
        </p>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Laboratorios — Web avanzada</h1>
      </header>

      {/* Pestañas principales */}
      <nav className="app-nav" style={{ marginBottom: '2rem', backgroundColor: 'transparent' }}>
        <div className="app-nav-inner" style={{ justifyContent: 'center' }}>
          {MAIN_TABS.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${mainTab === tab.id ? 'nav-tab-active' : ''}`}
              onClick={() => setMainTab(tab.id)}
              style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
            >
              <span>{tab.icon}</span>
              <span className="nav-tab-label" style={{ marginLeft: '0.5rem' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {mainTab === 'lab2' && renderLab2()}
        {mainTab === 'lab3' && renderLab3()}
        {mainTab === 'lab4' && renderLab4()}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)', fontSize: 13 }}>
        Laboratorios 2, 3 y 4 · Programación Web Avanzada · React + Vite
      </footer>
    </div>
  );
}

export default App;