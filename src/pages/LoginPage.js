import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SpinnerModal from "../components/SpinnerModal";
import { loginUser, saveToken } from "../services/authService";

function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    const MIN_SPINNER_TIME = 1000; 
    const startTime = Date.now();

    try {
      const data = await loginUser(email, password);
      saveToken(data.token);

      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setTimeout(
        () => {
          navigate("/dashboard"); // o donde redirijas
          setLoading(false);
        },
        remaining > 0 ? remaining : 0
      );
    } catch (err) {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setTimeout(
        () => {
          setError(err.message || "Error desconocido");
          setLoading(false);
        },
        remaining > 0 ? remaining : 0
      );
    }
  };

  /*
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      saveToken(data.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
*/
  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginForm onSubmit={handleLogin} />
      <SpinnerModal show={loading} />
    </div>
  );
}

export default LoginPage;
