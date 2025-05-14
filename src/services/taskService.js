import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tasks';

export const obtenerTareas = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tareas;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    throw error;
  }
};

// Crear una nueva tarea
export const crearTarea = async (tarea) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}`, tarea, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};
