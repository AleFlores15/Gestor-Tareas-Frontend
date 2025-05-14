import React, { useEffect, useState } from 'react';
import Task from './Task';
import { obtenerTareas } from '../services/taskService';

const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setLoading(true);
        const tareasObtenidas = await obtenerTareas();
        setTareas(tareasObtenidas);
      } catch (error) {
        console.error('No se pudieron cargar las tareas');
      } finally {
        setLoading(false);
      }
    };

    cargarTareas();
  }, []);

  const tareasPorEstado = {
    pendiente: tareas.filter(t => t.estado === 'pendiente'),
    'en progreso': tareas.filter(t => t.estado === 'en progreso'),
    completada: tareas.filter(t => t.estado === 'completada'),
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('tareaId', id);
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="row">
          {Object.entries(tareasPorEstado).map(([estado, lista]) => (
            <div className="col-md-4 mb-3" key={estado}>
              <h4 className="text-capitalize text-center">{estado}</h4>
              {lista.map((tarea) => (
                <Task key={tarea.id} tarea={tarea} onDragStart={handleDragStart} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
