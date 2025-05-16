import React from 'react';

const Unauthorized = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">401</h1>
      <p className="lead">Acceso no autorizado. Necesitas iniciar sesión para ver esta página.</p>
      <a href="/login" className="btn btn-outline-primary mt-3">Ir al login</a>
    </div>
  );
};

export default Unauthorized;
