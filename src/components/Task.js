import React from 'react';
import { actualizarTarea, eliminarTarea } from '../services/taskService';

const Task = ({ tarea, onTareaActualizada, onTareaEliminada }) => {
  const handleMarcarEnProgreso = async () => {
    try {
      await actualizarTarea(tarea.id, { estado: 'en progreso' });
      onTareaActualizada();
    } catch (error) {
      onTareaActualizada?.();
    }
  };

  const handleMarcarCompletada = async () => {
    try {
      await actualizarTarea(tarea.id, { estado: 'completada' });
      onTareaActualizada();
    } catch (error) {
      onTareaActualizada?.();
    }
  };

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea completada?')) {
      try {
        await eliminarTarea(tarea.id);
        onTareaEliminada();
      } catch (error) {
        onTareaEliminada?.();
      }
    }
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'warning';
      case 'en progreso':
        return 'info';
      case 'completada':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="card mb-3 shadow-sm task-card">
      <div className="card-body">
        <h5 className="card-title">{tarea.titulo}</h5>
        <p className="card-text">{tarea.descripcion}</p>
        <p className="card-text">
          <small className="text-muted">
            Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString()}
          </small>
        </p>
        <span className={`badge bg-${getBadgeColor(tarea.estado)} mb-2`}>
          {tarea.estado.toUpperCase()}
        </span>

        <div className="d-grid gap-2">
          {tarea.estado === 'pendiente' && (
            <button className="btn btn-outline-info btn-sm" onClick={handleMarcarEnProgreso}>
              Marcar como En Progreso
            </button>
          )}
          {tarea.estado === 'en progreso' && (
            <button className="btn btn-outline-success btn-sm" onClick={handleMarcarCompletada}>
              Marcar como Completada
            </button>
          )}
          {tarea.estado === 'completada' && (
            <button className="btn btn-outline-danger btn-sm" onClick={handleEliminar}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
