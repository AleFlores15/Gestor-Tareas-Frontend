import React, { useState } from "react";

function RegisterForm({ onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, email, password });
  };

  return (
    <div className="container-sm d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>

          <div className="text-center">
            <p className="text-muted mb-0">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-primary">
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
