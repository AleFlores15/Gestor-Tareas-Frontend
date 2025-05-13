import React, { useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ nombre, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
