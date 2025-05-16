import React from 'react';

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container text-center p-4 shadow-sm bg-white rounded" style={{ maxWidth: '500px' }}>
        <h1 className="display-4 text-danger">401</h1>
        <p className="lead">Acceso no autorizado. Necesitas iniciar sesión para ver esta página.</p>
        <a href="/login" className="btn btn-primary mt-3 w-100">Ir al login</a>
      </div>
    </div>
  );
};

export default Unauthorized;
