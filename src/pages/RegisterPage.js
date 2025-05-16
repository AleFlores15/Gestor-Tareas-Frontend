import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../services/authService";
import SpinnerModal from "../components/SpinnerModal";

function RegisterPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("Cargando...");
  const [spinnerType, setSpinnerType] = useState("loading");
  const navigate = useNavigate();

  const handleRegister = async ({ nombre, email, password }) => {
    setLoading(true);
    setError(null);
    setSpinnerMessage("Registrando usuario...");
    setSpinnerType("loading");

    const MIN_SPINNER_TIME = 600;
    const startTime = Date.now();

    try {
      const data = await registerUser(nombre, email, password);
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setSpinnerMessage(data.message || "Usuario registrado exitosamente");
      setSpinnerType("success");

      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, remaining > 0 ? remaining + 600 : 1000);

    } catch (err) {
      console.log(err);
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

const msg = (Array.isArray(err.errores) && err.errores.length > 0 && err.errores[0].msg)
  || err.message
  || (err.errores?.msg)
  || "Error desconocido";
      setSpinnerMessage(msg);
      setSpinnerType("error");

      setTimeout(() => {
        setError(msg);
        setLoading(false);
      }, remaining > 0 ? remaining + 600 : 1000);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <RegisterForm onSubmit={handleRegister} />
        {error && (
          <div className="alert alert-danger text-center mt-3" role="alert">
            {error}
          </div>
        )}
        <SpinnerModal 
          show={loading}
          message={spinnerMessage}
          loading={spinnerType === "loading"}
          type={spinnerType}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
