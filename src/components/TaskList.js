import React, { useEffect, useState } from 'react';
import Task from './Task';
import { obtenerTareas } from '../services/taskService';

const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    search: '',
    estado: '',
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async (filtrosActivos = filtros) => {
    try {
      setLoading(true);
      const tareasObtenidas = await obtenerTareas(filtrosActivos);
      setTareas(tareasObtenidas);
    } catch (error) {
      console.error('No se pudieron cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargarTareas(filtros);
  };

  const handleReset = () => {
    const valoresIniciales = {
      search: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
    };
    setFiltros(valoresIniciales);
    cargarTareas(valoresIniciales);
  };

  const tareasPorEstado = {
    pendiente: tareas.filter(t => t.estado === 'pendiente'),
    'en progreso': tareas.filter(t => t.estado === 'en progreso'),
    completada: tareas.filter(t => t.estado === 'completada'),
  };


  return (
    <div className="container mt-4">
      <h3 className="mb-3">Tareas</h3>

      <form className="row g-3 mb-4" onSubmit={handleFiltrar}>
        <div className="col-md-4">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Buscar por título o descripción"
            value={filtros.search}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <select
            name="estado"
            className="form-select"
            value={filtros.estado}
            onChange={handleInputChange}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="fechaInicio"
            className="form-control"
            value={filtros.fechaInicio}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="fechaFin"
            className="form-control"
            value={filtros.fechaFin}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">Filtrar</button>
          <button type="button" className="btn btn-secondary w-100" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="row">
          {Object.entries(tareasPorEstado).map(([estado, lista]) => (
            <div className="col-md-4 mb-3" key={estado}>
              <h5 className="text-center text-capitalize">{estado}</h5>
              {lista.length === 0 ? (
                <p className="text-center text-muted">Sin tareas</p>
              ) : (
                lista.map((tarea) => (
                  <Task key={tarea.id} tarea={tarea}  />
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
