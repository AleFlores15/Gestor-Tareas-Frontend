import React from 'react';

const Task = ({ tarea, onDragStart }) => {
  return (
    <div
      className="card mb-3 shadow-sm task-card"
      draggable
      onDragStart={(e) => onDragStart(e, tarea.id)}
    >
      <div className="card-body">
        <h5 className="card-title">{tarea.titulo}</h5>
        <p className="card-text">{tarea.descripcion}</p>
        <p className="card-text">
          <small className="text-muted">
            Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString()}
          </small>
        </p>
        <span className={`badge bg-${getBadgeColor(tarea.estado)}`}>
          {tarea.estado.toUpperCase()}
        </span>
      </div>
    </div>
  );
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

export default Task;
