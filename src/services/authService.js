import axios from 'axios';
//importar desde .env


const API_URL = 'http://localhost:3001/api/auth';

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


/*
//crear un interceptor para agregar el token a las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//crear un interceptor para manejar los errores
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);*/
