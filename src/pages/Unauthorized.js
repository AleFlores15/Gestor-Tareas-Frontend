import React from 'react';
// importa routas de react-router-dom
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-5 rounded shadow text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="display-4 text-danger">401</h1>
        <p className="lead text-muted">
          Acceso no autorizado.<br />Necesitas iniciar sesión para ver esta página.
        </p>
        <Link to="/login" className="btn btn-primary btn-block mt-3">
          Ir al login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
