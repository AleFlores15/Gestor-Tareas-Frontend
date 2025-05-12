import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { registerUser } from '../services/authService';

function RegisterPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async ({ nombre, email, password }) => {
    try {
      const data = await registerUser(nombre, email, password);
      console.log('Usuario registrado:', data);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error desconocido');
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      {success && <div className="alert alert-success">¡Registro exitoso!</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
