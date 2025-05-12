import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { loginUser, saveToken } from '../services/authService';

function LoginPage() {
  const [error, setError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await loginUser(email, password);
      saveToken(data.token);

      return (
        <div className="alert alert-success">
          Bienvenido 
        </div>
      );
      
    } catch (err) {
      setError(err.message || 'Error desconocido');
    }
  };
  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );



  
}

export default LoginPage;
