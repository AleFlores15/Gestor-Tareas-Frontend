import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginUser, saveToken } from "../services/authService";
import SpinnerModal from "../components/SpinnerModal";
//router


function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("Cargando...");
  const [spinnerType, setSpinnerType] = useState("loading");
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    setSpinnerMessage("Iniciando sesión...");
    setSpinnerType("loading");

    const MIN_SPINNER_TIME = 500;
    const startTime = Date.now();

    try {
      const data = await loginUser(email, password);
      saveToken(data.token);

      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setSpinnerMessage(data.message || "Login exitoso");
      setSpinnerType("success");

      setTimeout(() => {
        navigate("/tasks");
        setLoading(false);
      }, remaining > 0 ? remaining + 500 : 1000); 

    } catch (err) {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      const msg = err.message || "Error desconocido";
      setSpinnerMessage(msg);
      setSpinnerType("error");

      setTimeout(() => {
        setError(msg);
        setLoading(false);
      }, remaining > 0 ? remaining + 500 : 1000); 
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
      <SpinnerModal 
        show={loading} 
        message={spinnerMessage} 
        loading={spinnerType === "loading"} 
        type={spinnerType}
      />
    </>
  );
}

export default LoginPage;
