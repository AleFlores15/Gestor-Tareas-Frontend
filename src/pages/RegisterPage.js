import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../services/authService";
import Spinner from "../components/SpinnerModal"; // asegúrate de tenerlo

function RegisterPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async ({ nombre, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(nombre, email, password);
      setError(null);
      // Redirige al login después de un registro exitoso
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <Spinner /> : <RegisterForm onSubmit={handleRegister} />}
    </div>
  );
}

export default RegisterPage;
