import { useState, useEffect, useRef } from 'react';

let _idCounter = 0;

/**
 * useNotificacion
 * Gestiona una cola de notificaciones temporales.
 * @param {number} duracion - Milisegundos antes de ocultar (por defecto 3000ms)
 * @returns {{ notificacion, mostrar, cerrar }}
 */
export function useNotificacion(duracion = 3000) {
  const [notificacion, setNotificacion] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!notificacion) return;

    // Cancela cualquier timeout anterior
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setNotificacion(null);
    }, duracion);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [notificacion, duracion]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const mostrar = (mensaje, tipo = 'info') => {
    setNotificacion({ id: ++_idCounter, mensaje, tipo });
  };

  const cerrar = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNotificacion(null);
  };

  return { notificacion, mostrar, cerrar };
}
