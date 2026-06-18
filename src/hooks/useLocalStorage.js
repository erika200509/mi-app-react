import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * Hook reutilizable que sincroniza estado con localStorage.
 * @param {string} clave - Clave en localStorage
 * @param {*} valorInicial - Valor por defecto si no existe la clave
 * @returns {[*, Function]} - [valorActual, setter]
 */
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(clave);
      return item !== null ? JSON.parse(item) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // localStorage no disponible o cuota superada — falla silenciosamente
    }
  }, [clave, valor]);

  return [valor, setValor];
}
