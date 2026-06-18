import { createContext, useContext } from 'react';
import { useNotificacion } from '../hooks/useNotificacion';
import Toast from '../components/Toast';

const NotificacionContext = createContext(null);

export function NotificacionProvider({ children }) {
  const { notificacion, mostrar } = useNotificacion();

  return (
    <NotificacionContext.Provider value={mostrar}>
      {children}
      <Toast notificacion={notificacion} />
    </NotificacionContext.Provider>
  );
}

export function useNotificacionGlobal() {
  return useContext(NotificacionContext);
}
