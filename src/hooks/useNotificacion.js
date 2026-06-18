import { useState, useEffect, useRef, useCallback } from 'react';

let _idCounter = 0;

/**
 * useNotificacion
 * Gestiona una cola de notificaciones temporales con manejo de tiempo de expiración.
 * 
 * @param {number} duracion - Milisegundos antes de ocultar la notificación (por defecto 3000ms)
 * @returns {{
 *   notificacion: { id: number, mensaje: string, tipo: string } | null,
 *   mostrar: (mensaje: string, tipo?: string) => void,
 *   cerrar: () => void,
 *   limpiar: () => void
 * }}
 */
export function useNotificacion(duracion = 3000) {
  const [notificacion, setNotificacion] = useState(null);
  const timeoutRef = useRef(null);

  // Limpiar el timeout cuando la notificación cambia o el componente se desmonta
  const limpiarTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Efecto para manejar el temporizador de la notificación
  useEffect(() => {
    if (!notificacion) return;

    // Cancela cualquier timeout anterior
    limpiarTimeout();

    // Configura nuevo timeout para ocultar la notificación
    timeoutRef.current = setTimeout(() => {
      setNotificacion(null);
    }, duracion);

    return limpiarTimeout;
  }, [notificacion, duracion, limpiarTimeout]);

  // Limpieza al desmontar el componente
  useEffect(() => {
    return limpiarTimeout;
  }, [limpiarTimeout]);

  /**
   * Muestra una notificación
   * @param {string} mensaje - Texto de la notificación
   * @param {string} tipo - Tipo de notificación: 'exito', 'info', 'advertencia', 'error' (por defecto 'info')
   */
  const mostrar = useCallback((mensaje, tipo = 'info') => {
    limpiarTimeout();
    setNotificacion({
      id: ++_idCounter,
      mensaje,
      tipo,
    });
  }, [limpiarTimeout]);

  /**
   * Cierra la notificación actual
   */
  const cerrar = useCallback(() => {
    limpiarTimeout();
    setNotificacion(null);
  }, [limpiarTimeout]);

  /**
   * Alias de cerrar para compatibilidad con ambas APIs
   */
  const limpiar = useCallback(() => {
    limpiarTimeout();
    setNotificacion(null);
  }, [limpiarTimeout]);

  return {
    notificacion,
    mostrar,
    cerrar,
    limpiar, // Alias para compatibilidad
  };
}