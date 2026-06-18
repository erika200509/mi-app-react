import { useState, useEffect, useRef } from 'react';
import './TemporizadorPomodoro.css';

const DURACION_INICIAL = 25 * 60; // 1500 segundos

function formatTime(segundos) {
  const m = Math.floor(segundos / 60).toString().padStart(2, '0');
  const s = (segundos % 60).toString().padStart(2, '0');
  return { m, s };
}

export default function TemporizadorPomodoro() {
  const [segundos, setSegundos] = useState(DURACION_INICIAL);
  const [activo, setActivo] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const alertadoRef = useRef(false);

  useEffect(() => {
    if (!activo) return;

    const intervalo = setInterval(() => {
      setSegundos(prev => {
        if (prev <= 1) {
          clearInterval(intervalo);
          setActivo(false);
          setTerminado(true);
          if (!alertadoRef.current) {
            alertadoRef.current = true;
            setTimeout(() => alert('¡Sesión Pomodoro completada! 🍅'), 50);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [activo]);

  const handleReiniciar = () => {
    setActivo(false);
    setSegundos(DURACION_INICIAL);
    setTerminado(false);
    alertadoRef.current = false;
  };

  const progreso = ((DURACION_INICIAL - segundos) / DURACION_INICIAL) * 100;
  const { m, s } = formatTime(segundos);
  const circunferencia = 2 * Math.PI * 54;
  const offset = circunferencia - (progreso / 100) * circunferencia;

  return (
    <div className="pomodoro-card card">
      <div className="pomodoro-header">
        <span className="badge badge-peach">Ejercicio 2</span>
        <h2 className="pomodoro-title">Temporizador Pomodoro</h2>
        <p className="pomodoro-subtitle">25 minutos de enfoque profundo</p>
      </div>

      <div className="pomodoro-ring-container">
        <svg className="pomodoro-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="ring-track" />
          <circle
            cx="60" cy="60" r="54"
            className={`ring-progress ${terminado ? 'ring-done' : ''}`}
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="pomodoro-time">
          <span className="pomodoro-digits">{m}<span className="colon">:</span>{s}</span>
          <span className="pomodoro-status">
            {terminado ? '¡Completado! 🍅' : activo ? 'En progreso' : segundos === DURACION_INICIAL ? 'Listo' : 'Pausado'}
          </span>
        </div>
      </div>

      <div className="pomodoro-controls">
        {!activo && !terminado && (
          <button className="btn btn-primary" onClick={() => setActivo(true)}>
            ▶ {segundos === DURACION_INICIAL ? 'Iniciar' : 'Continuar'}
          </button>
        )}
        {activo && (
          <button className="btn btn-mint" onClick={() => setActivo(false)}>
            ⏸ Pausar
          </button>
        )}
        <button className="btn btn-ghost" onClick={handleReiniciar}>
          ↺ Reiniciar
        </button>
      </div>

      {terminado && (
        <div className="pomodoro-done-banner">
          🎉 ¡Sesión completada! Tómate un descanso de 5 minutos.
        </div>
      )}
    </div>
  );
}
