import './index.css'
import Perfil          from './components/Perfil'
import Clima           from './components/Clima'
import EstadoPedido    from './components/EstadoPedido'
import MensajeBienvenida from './components/MensajeBienvenida'
import ListaHabilidades from './components/ListaHabilidades'
import ListaProductos  from './components/ListaProductos'
import ListaTareas     from './components/ListaTareas'
import Tarjeta         from './components/Tarjeta'
import Dashboard       from './components/Dashboard'

const ejercicios = [
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
]

function App() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem 4rem', maxWidth: 960, margin: '0 auto' }}>

      <header style={{ maxWidth: 900, margin: '0 auto 3rem', textAlign: 'center' }}>
        <p style={{
          fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--accent-purple)', fontWeight: 600, marginBottom: 8
        }}>
          Programación Web Avanzada
        </p>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Laboratorio 2— Fundamentos de React</h1>
        <p style={{ fontSize: 15 }}>Primeros componentes con JSX</p>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {ejercicios.map(({ num, titulo, comp, color, accent, wide }) => (
          <section key={num}>
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
              <h2 style={{ fontSize: 15, fontWeight: 600 }}>{titulo}</h2>
            </div>

            <div style={wide ? {} : { display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {comp}
            </div>
          </section>
        ))}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)', fontSize: 13 }}>
        Laboratorio 2 · PWA · React + Vite
      </footer>
    </div>
  )
}

export default App