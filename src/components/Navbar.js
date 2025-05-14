import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import SpinnerModal from '../components/SpinnerModal';

function Navbar() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerMsg, setSpinnerMsg] = useState('');
  const [spinnerType, setSpinnerType] = useState('success');

  const handleLogout = () => {
    setShowSpinner(true);
    setSpinnerMsg('Sesión cerrada con éxito');

    setSpinnerType('success');
    logoutUser();

    setTimeout(() => {
      setShowSpinner(false);
      navigate('/login');
    }, 1000); // 1 segundo de spinner
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">To do App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Acerca de</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registro</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">Tareas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-task">Crear Tarea</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SpinnerModal show={showSpinner} message={spinnerMsg} type={spinnerType} />
    </>
  );
}

export default Navbar;
