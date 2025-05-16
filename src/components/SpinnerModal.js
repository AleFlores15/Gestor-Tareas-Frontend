import React, { useState } from 'react';
import { crearTarea } from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import SpinnerModal from '../components/SpinnerModal'; // Asegúrate de que el path sea correcto

const CreateTask = () => {
  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fechaLimite: '',
  });

  const [spinner, setSpinner] = useState({ show: false, type: 'loading', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];

    if (tarea.fechaLimite < today) {
      setSpinner({
        show: true,
        type: 'error',
        message: 'La fecha límite no puede ser anterior a hoy.',
      });

      setTimeout(() => {
        setSpinner({ show: false, type: 'loading', message: '' });
      }, 2500);

      return;
    }

    setSpinner({ show: true, type: 'loading', message: 'Creando tarea...' });

    try {
      await crearTarea(tarea);
      setSpinner({ show: true, type: 'success', message: 'Tarea creada correctamente.' });

      setTimeout(() => {
        setSpinner({ show: false, type: 'loading', message: '' });
        navigate('/tasks');
      }, 1500);
    } catch (err) {
      setSpinner({ show: true, type: 'error', message: 'No se pudo crear la tarea.' });

      setTimeout(() => {
        setSpinner({ show: false, type: 'loading', message: '' });
      }, 2500);
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Crear nueva tarea</h2>

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
            min={todayDate}
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear tarea</button>
      </form>

      <SpinnerModal
        show={spinner.show}
        type={spinner.type}
        message={spinner.message}
      />
    </>
  );
};

export default CreateTask;
