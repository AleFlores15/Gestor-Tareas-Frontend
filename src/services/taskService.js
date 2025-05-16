import axios from 'axios';
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/tasks`;

export const obtenerTareas = async (filtros = {}) => {
  try {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(filtros).toString();

    const response = await axios.get(`${API_URL}?${params}`, {
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
//eliminar una tarea
export const eliminarTarea = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};
// Actualizar una tarea
export const actualizarTarea = async (id, tarea) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, tarea, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    throw error;
  }
};