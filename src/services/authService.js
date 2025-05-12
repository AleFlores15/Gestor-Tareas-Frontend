import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data; // Aquí normalmente viene el token o los datos del usuario
  } catch (error) {
    throw error.response?.data || { message: 'Error al iniciar sesión' };
  }
};
