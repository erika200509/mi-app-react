import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotasProvider } from './context/NotasContext';
import { NotificacionProvider } from './context/NotificacionContext';
import './index.css';
import './App.css';

// Laboratorio 2
import Perfil from './components/Perfil';
import Clima from './components/Clima';
import EstadoPedido from './components/EstadoPedido';
import MensajeBienvenida from './components/MensajeBienvenida';
import ListaHabilidades from './components/ListaHabilidades';
import ListaProductos from './components/ListaProductos';
import ListaTareas from './components/ListaTareas';
import Tarjeta from './components/Tarjeta';
import Dashboard from './components/Dashboard';

// Laboratorio 3
import Alerta from './components/Alerta';
import Acordeon from './components/Acordeon';
import Modal from './components/Modal';
import BotonAccion from './components/BotonAccion';
import Contador from './components/Contador';
import ListaContactos from './components/ListaContactos';
import FormularioEvento from './components/FormularioEvento';

// Laboratorio 4
import VisorDocumento from './components/VisorDocumento';
import TemporizadorPomodoro from './components/TemporizadorPomodoro';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import DemoHooks from './components/DemoHooks';

// Laboratorio 5 — páginas
import Inicio from './pages/Inicio';
import Notas from './pages/Notas';
import NuevaNota from './pages/NuevaNota';
import DetalleNota from './pages/DetalleNota';
import EditarNota from './pages/EditarNota';
import NoEncontrada from './pages/NoEncontrada';
import Toast from './components/Toast';
import { useNotificacion } from './hooks/useNotificacion';
import { useNotas } from './context/NotasContext';
import { NavLink as RouterNavLink, useNavigate, useParams } from 'react-router-dom';

// ─── Layout interno para el Lab 5 ────────────────────────────────────────────
// Usa navegación con useState en lugar de BrowserRouter para convivir
// con el sistema de pestañas existente.

function NotasApp() {
  const [ruta, setRuta] = useState('/');  // ruta interna simulada
  const [rutaAnterior, setRutaAnterior] = useState('/');
  const { notas } = useNotas();
  const { notificacion, mostrar } = useNotificacion();

  // Mini-router interno
  function navegar(destino) {
    setRutaAnterior(ruta);
    setRuta(destino);
  }

  // Parsear ruta interna
  let paginaActual = 'inicio';
  let idParam = null;
  let modoEditar = false;

  if (ruta === '/') {
    paginaActual = 'inicio';
  } else if (ruta === '/notas') {
    paginaActual = 'notas';
  } else if (ruta === '/notas/nueva') {
    paginaActual = 'nueva';
  } else if (/^\/notas\/[^/]+\/editar$/.test(ruta)) {
    paginaActual = 'editar';
    idParam = ruta.split('/')[2];
    modoEditar = true;
  } else if (/^\/notas\/[^/]+$/.test(ruta)) {
    paginaActual = 'detalle';
    idParam = ruta.split('/')[2];
  } else {
    paginaActual = '404';
  }

  function NavItem({ a, label }) {
    const activo = 
      (a === '/' && ruta === '/') ||
      (a !== '/' && ruta.startsWith(a) && !(a === '/notas' && ruta === '/notas/nueva'));
    return (
      <button
        className={`nav-link${activo ? ' nav-link--active' : ''}${a === '/notas/nueva' ? ' nav-link--cta' : ''}`}
        onClick={() => navegar(a)}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Toast global */}
      <Toast notificacion={notificacion} />

      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-logo">📝</span>
            <span className="header-title">MisNotas</span>
          </div>
          <nav className="nav">
            <NavItem a="/" label="Inicio" />
            <NavItem a="/notas" label="Notas" />
            <NavItem a="/notas/nueva" label="+ Nueva nota" />
          </nav>
          <div className="header-counter">
            <span className="counter-badge">{notas.length}</span>
            <span className="counter-label">nota{notas.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {paginaActual === 'inicio' && <Inicio navegar={navegar} />}
        {paginaActual === 'notas' && <Notas navegar={navegar} notificar={mostrar} />}
        {paginaActual === 'nueva' && <NuevaNota navegar={navegar} notificar={mostrar} />}
        {paginaActual === 'detalle' && <DetalleNota id={idParam} navegar={navegar} notificar={mostrar} />}
        {paginaActual === 'editar' && <EditarNota id={idParam} navegar={navegar} notificar={mostrar} />}
        {paginaActual === '404' && <NoEncontrada navegar={navegar} />}
      </main>

      <footer className="footer">
        <p>© 2026 MisNotas — Organiza tus ideas con estilo</p>
      </footer>
    </div>
  );
}

// ─── Lab 2 ───────────────────────────────────────────────────────────────────
const ejerciciosLab2 = [
  { num: '01', titulo: 'Componente con expresiones dinámicas', comp: <Perfil />, color: 'var(--pastel-lavender)', accent: 'var(--accent-purple)' },
  { num: '02', titulo: 'Lógica previa al return', comp: <Clima />, color: 'var(--pastel-mint)', accent: 'var(--accent-teal)' },
  { num: '03', titulo: 'Renderizado condicional con ternario', comp: <EstadoPedido />, color: 'var(--pastel-sky)', accent: 'var(--accent-blue)' },
  { num: '04', titulo: 'Renderizado condicional con early return', comp: <MensajeBienvenida />, color: 'var(--pastel-peach)', accent: 'var(--accent-coral)' },
  { num: '05', titulo: 'Renderizado de lista simple', comp: <ListaHabilidades />, color: 'var(--pastel-rose)', accent: 'var(--accent-rose)' },
  { num: '06', titulo: 'Renderizado de lista con objetos', comp: <ListaProductos />, color: 'var(--pastel-butter)', accent: 'var(--accent-amber)' },
  { num: '07', titulo: 'Combinación de filter y map', comp: <ListaTareas />, color: 'var(--pastel-lavender)', accent: 'var(--accent-purple)' },
  { num: '08', titulo: 'Componente reutilizable — tarjeta', comp: <Tarjeta />, color: 'var(--pastel-mint)', accent: 'var(--accent-teal)' },
  { num: '09', titulo: 'Fragment y múltiples secciones — Dashboard', comp: <Dashboard />, color: 'var(--pastel-sky)', accent: 'var(--accent-blue)', wide: true },
];

const MAIN_TABS = [
  { id: 'lab2', label: 'Laboratorio 2', icon: '📘' },
  { id: 'lab3', label: 'Laboratorio 3', icon: '🎮' },
  { id: 'lab4', label: 'Laboratorio 4', icon: '⚛️' },
  { id: 'notas', label: 'Laboratorio 5', icon: '📝' },
];

const LAB4_TABS = [
  { id: 'ej1', label: 'Ej. 1 — Visor', icon: '📄' },
  { id: 'ej2', label: 'Ej. 2 — Pomodoro', icon: '🍅' },
  { id: 'ej3', label: 'Ej. 3 — Config', icon: '⚙️' },
  { id: 'ej4', label: 'Ej. 4 — Custom Hooks', icon: '🪝' },
];

function LaboratoriosApp() {
  const [mainTab, setMainTab] = useState('lab2');
  const [lab4SubTab, setLab4SubTab] = useState('ej1');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarVisor, setMostrarVisor] = useState(true);

  const renderLab2 = () => (
    <div>
      <div style={{ borderBottom: '2px solid var(--pastel-lavender)', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}>Laboratorio 2 — Fundamentos de React</h2>
      </div>
      {ejerciciosLab2.map(({ num, titulo, comp, color, accent, wide }) => (
        <section key={num} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: color, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{num}</span>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>{titulo}</h3>
          </div>
          <div style={wide ? {} : { display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>{comp}</div>
        </section>
      ))}
    </div>
  );

  const renderLab3 = () => (
    <div>
      <div style={{ borderBottom: '2px solid var(--pastel-sky)', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-blue)' }}>Laboratorio 3 — Componentes interactivos con Props y Estado</h2>
      </div>
      <Acordeon titulo="Ejercicio 1 — Props, Children y Acordeón" defaultAbierto={true}>
        <section className="seccion">
          <h3 className="seccion-titulo">Componente Alerta</h3>
          <div className="demo-stack">
            <Alerta tipo="exito" titulo="Operación completada">Los cambios se guardaron correctamente en el servidor.</Alerta>
            <Alerta tipo="advertencia" titulo="Revisa tu conexión">Tu sesión expirará en 5 minutos. Guarda tu progreso.</Alerta>
            <Alerta tipo="error" titulo="Error al procesar">No se pudo completar la solicitud. Inténtalo de nuevo.</Alerta>
            <Alerta tipo="info" titulo="¿Sabías que…?">Puedes usar el atajo <kbd>Ctrl + S</kbd> para guardar rápidamente.</Alerta>
          </div>
          <h3 className="seccion-titulo" style={{ marginTop: '2rem' }}>Componente Acordeón (independiente)</h3>
          <div className="demo-stack">
            <Acordeon titulo="¿Qué es React?">React es una biblioteca de JavaScript para construir interfaces de usuario.</Acordeon>
            <Acordeon titulo="¿Qué son los hooks?">Los hooks son funciones especiales que permiten usar estado en componentes funcionales.</Acordeon>
            <Acordeon titulo="¿Qué es Vite?">Vite es una herramienta de construcción moderna con servidor de desarrollo muy rápido.</Acordeon>
          </div>
        </section>
      </Acordeon>
      <Acordeon titulo="Ejercicio 2 — Composición, Estado y Eventos">
        <section className="seccion">
          <h3 className="seccion-titulo">Modal y BotonAccion</h3>
          <div className="demo-row">
            <BotonAccion texto="Abrir Modal" variante="primario" onClick={() => setModalAbierto(true)} />
            <BotonAccion texto="Botón secundario" variante="secundario" />
            <BotonAccion texto="Acción peligrosa" variante="peligro" />
            <BotonAccion texto="Deshabilitado" variante="primario" disabled />
          </div>
          <Modal titulo="Detalle del componente" abierto={modalAbierto}>
            <p className="modal-mensaje">Este modal fue abierto desde App.jsx usando un estado booleano controlado con <code>useState</code>.</p>
            <div className="modal-acciones"><BotonAccion texto="Cerrar" variante="secundario" onClick={() => setModalAbierto(false)} /></div>
          </Modal>
          <h3 className="seccion-titulo" style={{ marginTop: '2rem' }}>Contador</h3>
          <Contador />
        </section>
      </Acordeon>
      <Acordeon titulo="Ejercicio 3 — Lista Dinámica con Inmutabilidad"><section className="seccion"><ListaContactos /></section></Acordeon>
      <Acordeon titulo="Ejercicio 4 — Formulario Controlado con Validación"><section className="seccion"><FormularioEvento /></section></Acordeon>
    </div>
  );

  const renderLab4 = () => (
    <div>
      <div style={{ borderBottom: '2px solid var(--pastel-mint)', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-teal)' }}>Laboratorio 4 — Efectos Secundarios · Persistencia · Custom Hooks</h2>
      </div>
      <nav className="app-nav" style={{ marginBottom: '2rem' }}>
        <div className="app-nav-inner">
          {LAB4_TABS.map(t => (
            <button key={t.id} className={`nav-tab ${lab4SubTab === t.id ? 'nav-tab-active' : ''}`} onClick={() => setLab4SubTab(t.id)}>
              <span>{t.icon}</span>
              <span className="nav-tab-label">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
      <div className="exercise-wrapper">
        {lab4SubTab === 'ej1' && (
          <>
            {mostrarVisor ? (
              <>
                <VisorDocumento />
                <div className="dismount-row">
                  <button className="btn btn-danger" onClick={() => setMostrarVisor(false)}>🧪 Simular desmontaje</button>
                  <span className="dismount-hint">El título volverá a "Mi App" al desmontar.</span>
                </div>
              </>
            ) : (
              <div className="card dismount-msg">
                <span className="dismount-emoji">🔌</span>
                <h3>Componente desmontado</h3>
                <p>El título de la pestaña fue restaurado a <strong>"Mi App"</strong>.</p>
                <button className="btn btn-primary" onClick={() => setMostrarVisor(true)}>↩ Remontar componente</button>
              </div>
            )}
          </>
        )}
        {lab4SubTab === 'ej2' && <TemporizadorPomodoro />}
        {lab4SubTab === 'ej3' && <ConfiguracionUsuario />}
        {lab4SubTab === 'ej4' && <DemoHooks />}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem 4rem', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ maxWidth: 900, margin: '0 auto 3rem', textAlign: 'center' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-purple)', fontWeight: 600, marginBottom: 8 }}>Programación Web Avanzada</p>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Laboratorios — Web avanzada</h1>
      </header>

      <nav className="app-nav" style={{ marginBottom: '2rem', backgroundColor: 'transparent' }}>
        <div className="app-nav-inner" style={{ justifyContent: 'center' }}>
          {MAIN_TABS.map(tab => (
            <button key={tab.id} className={`nav-tab ${mainTab === tab.id ? 'nav-tab-active' : ''}`} onClick={() => setMainTab(tab.id)} style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
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
        {mainTab === 'notas' && (
          <NotasProvider>
            <NotificacionProvider>
              <NotasApp />
            </NotificacionProvider>
          </NotasProvider>
        )}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)', fontSize: 13 }}>
        Laboratorios 2, 3, 4 y Notas App · Programación Web Avanzada · React + Vite
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LaboratoriosApp />} />
      </Routes>
    </BrowserRouter>
  );
}
