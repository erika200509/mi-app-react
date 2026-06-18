import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'misnotas_data';

const notasIniciales = [
  {
    id: '1700000001000',
    titulo: 'Bienvenido a MisNotas',
    contenido: 'Esta es tu aplicación de notas personal. Puedes crear, editar, eliminar y fijar notas según tus necesidades.',
    categoria: 'personal',
    fijada: true,
    fechaCreacion: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '1700000002000',
    titulo: 'Reunión de equipo',
    contenido: 'Revisar avances del sprint actual, planificar tareas para la próxima semana y discutir bloqueos del equipo.',
    categoria: 'trabajo',
    fijada: true,
    fechaCreacion: '2024-01-16T09:00:00.000Z',
  },
  {
    id: '1700000003000',
    titulo: 'Fórmulas de cálculo diferencial',
    contenido: 'Repasar reglas de derivación: regla de la cadena, producto y cociente. Estudiar para el examen del viernes.',
    categoria: 'estudio',
    fijada: false,
    fechaCreacion: '2024-01-17T14:00:00.000Z',
  },
  {
    id: '1700000004000',
    titulo: 'Idea: app de recetas',
    contenido: 'Crear una aplicación web para guardar recetas favoritas con fotos, ingredientes y pasos detallados. Podría usar React y una API de recetas.',
    categoria: 'ideas',
    fijada: false,
    fechaCreacion: '2024-01-18T16:45:00.000Z',
  },
  {
    id: '1700000005000',
    titulo: 'Lista de compras semanal',
    contenido: 'Leche, pan, huevos, frutas variadas, verduras, pasta, arroz, aceite de oliva y jabón de manos.',
    categoria: 'personal',
    fijada: false,
    fechaCreacion: '2024-01-19T08:20:00.000Z',
  },
];

const estadoInicial = {
  notas: notasIniciales,
  filtroCategoria: 'todas',
  busqueda: '',
};

function cargarEstado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      return JSON.parse(guardado);
    }
  } catch {
    /* noop */
  }
  return estadoInicial;
}

function reducer(state, action) {
  switch (action.type) {
    case 'AGREGAR_NOTA':
      return { ...state, notas: [action.payload, ...state.notas] };

    case 'ELIMINAR_NOTA':
      return { ...state, notas: state.notas.filter((n) => n.id !== action.payload) };

    case 'EDITAR_NOTA':
      return {
        ...state,
        notas: state.notas.map((n) =>
          n.id === action.payload.id ? { ...n, ...action.payload.datos } : n
        ),
      };

    case 'TOGGLE_FIJADA':
      return {
        ...state,
        notas: state.notas.map((n) =>
          n.id === action.payload ? { ...n, fijada: !n.fijada } : n
        ),
      };

    case 'CAMBIAR_FILTRO':
      return { ...state, filtroCategoria: action.payload };

    case 'CAMBIAR_BUSQUEDA':
      return { ...state, busqueda: action.payload };

    default:
      return state;
  }
}

const NotasContext = createContext(null);

export function NotasProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, cargarEstado);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state]);

  const agregarNota = (datos) => {
    const nueva = {
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString(),
      fijada: false,
      ...datos,
    };
    dispatch({ type: 'AGREGAR_NOTA', payload: nueva });
  };

  const eliminarNota = (id) => dispatch({ type: 'ELIMINAR_NOTA', payload: id });

  const editarNota = (id, datos) =>
    dispatch({ type: 'EDITAR_NOTA', payload: { id, datos } });

  const toggleFijada = (id) => dispatch({ type: 'TOGGLE_FIJADA', payload: id });

  const cambiarFiltro = (filtro) =>
    dispatch({ type: 'CAMBIAR_FILTRO', payload: filtro });

  const cambiarBusqueda = (texto) =>
    dispatch({ type: 'CAMBIAR_BUSQUEDA', payload: texto });

  return (
    <NotasContext.Provider
      value={{
        ...state,
        agregarNota,
        eliminarNota,
        editarNota,
        toggleFijada,
        cambiarFiltro,
        cambiarBusqueda,
      }}
    >
      {children}
    </NotasContext.Provider>
  );
}

export function useNotas() {
  const ctx = useContext(NotasContext);
  if (!ctx) {
    throw new Error('useNotas debe usarse dentro de NotasProvider');
  }
  return ctx;
}
