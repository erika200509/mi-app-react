import { NavLink, Outlet } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

export default function Layout() {
  const { notas } = useNotas();

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-logo">📝</span>
            <span className="header-title">MisNotas</span>
          </div>

          <nav className="nav" aria-label="Navegación principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/notas"
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              Notas
            </NavLink>
            <NavLink
              to="/notas/nueva"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link--active nav-link--cta'
                  : 'nav-link nav-link--cta'
              }
            >
              + Nueva nota
            </NavLink>
          </nav>

          <div className="header-counter">
            <span className="counter-badge">{notas.length}</span>
            <span className="counter-label">
              nota{notas.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 MisNotas — Organiza tus ideas con estilo</p>
      </footer>
    </div>
  );
}
