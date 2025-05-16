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

  const getBorderColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'border-start border-2 border-warning';
      case 'en progreso':
        return 'border-start border-2 border-info';
      case 'completada':
        return 'border-start border-2 border-success';
      default:
        return 'border-start border-2 border-secondary';
    }
  };

  return (
    <div className={`card mb-4 bg-white shadow-lg ${getBorderColor(tarea.estado)}`} style={{ borderRadius: '1rem' }}>
      <div className="card-body">
        <h5 className="card-title mb-2">
          <i className="bi bi-list-task me-2 text-primary"></i>{tarea.titulo}
        </h5>

        {tarea.descripcion && (
          <p className="card-text text-muted">
            <i className="bi bi-chat-left-text me-1"></i>{tarea.descripcion}
          </p>
        )}

        <p className="card-text">
          <small className="text-muted">
            <i className="bi bi-calendar-event me-1"></i>
            Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString()}
          </small>
        </p>

        <span className={`badge bg-${getBadgeColor(tarea.estado)} mb-3`}>
          {tarea.estado.toUpperCase()}
        </span>

        <div className="d-grid gap-2 mt-2">
          {tarea.estado === 'pendiente' && (
            <button className="btn btn-outline-info btn-sm" onClick={handleMarcarEnProgreso}>
              <i className="bi bi-hourglass-split me-1"></i>Marcar como En Progreso
            </button>
          )}
          {tarea.estado === 'en progreso' && (
            <button className="btn btn-outline-success btn-sm" onClick={handleMarcarCompletada}>
              <i className="bi bi-check2-circle me-1"></i>Marcar como Completada
            </button>
          )}
          {tarea.estado === 'completada' && (
            <button className="btn btn-outline-danger btn-sm" onClick={handleEliminar}>
              <i className="bi bi-trash3 me-1"></i>Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
