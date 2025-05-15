import React, { useState } from 'react';
import { crearTarea } from '../services/taskService';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fechaLimite: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearTarea(tarea);
      navigate('/tasks');
    } catch (err) {
      setError('No se pudo crear la tarea.');
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Crear nueva tarea</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          value={tarea.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="3"
          value={tarea.descripcion}
          onChange={handleChange}
        ></textarea>
      </div>

      
      <div className="mb-3">
        <label className="form-label">Fecha límite</label>
        <input
          type="date"
          name="fechaLimite"
          className="form-control"
          value={tarea.fechaLimite}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Crear tarea</button>
    </form>
  );
};

export default CreateTask;
