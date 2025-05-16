import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/auth`;
console.log('API_URL:', API_URL); 
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al iniciar sesión' };
  }
};

//guardar el token en con una cookie
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
}
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const registerUser = async (nombre, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombre,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al registrar usuario' };
  }
};
export const getUser = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al obtener usuario' };
    }
};

