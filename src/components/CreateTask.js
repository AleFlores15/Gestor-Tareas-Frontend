import React, { useState } from 'react';

const CreateTask = ({ onSubmit }) => {
  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fechaLimite: '',
  });

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tarea);
  };

  // Fecha mínima hoy, respetando zona horaria local
  const getTodayLocal = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };

  const today = getTodayLocal();

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">
          <i className="bi bi-plus-circle me-2"></i>Crear nueva tarea
        </h2>

        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            <i className="bi bi-card-text me-1"></i>Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="form-control"
            value={tarea.titulo}
            onChange={handleChange}
            placeholder="Ingrese el título de la tarea"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            <i className="bi bi-journal-text me-1"></i>Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            rows="4"
            value={tarea.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la tarea (opcional)"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="fechaLimite" className="form-label">
            <i className="bi bi-calendar-event me-1"></i>Fecha límite
          </label>
          <input
            type="date"
            id="fechaLimite"
            name="fechaLimite"
            className="form-control"
            value={tarea.fechaLimite}
            onChange={handleChange}
            min={today}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          <i className="bi bi-check2-circle me-2"></i>Crear tarea
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
