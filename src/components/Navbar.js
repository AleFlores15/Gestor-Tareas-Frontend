import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../services/authService";
import SpinnerModal from "../components/SpinnerModal";

function Navbar() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerMsg, setSpinnerMsg] = useState("");
  const [spinnerType, setSpinnerType] = useState("success");
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowSpinner(true);
    setSpinnerMsg("Sesión cerrada con éxito");
    setSpinnerType("success");
    logoutUser();
    setTimeout(() => {
      setShowSpinner(false);
      navigate("/login");
    }, 1000);
  };

  const handleUserClick = async () => {
    if (!user) {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener usuario:", error.message);
      }
    }
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold"
            to="/tasks"
            style={{ color: "#2563eb" }}
          >
            <i className="bi bi-check2-square me-2"></i>To do App
          </Link>
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
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item mx-2">
                <Link
                  className="nav-link text-dark d-flex align-items-center gap-1"
                  to="/tasks"
                >
                  <i className="bi bi-list-task fs-5"></i>
                  <span>Tareas</span>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link text-dark d-flex align-items-center gap-1"
                  to="/create-task"
                >
                  <i className="bi bi-plus-square fs-5"></i>
                  <span>Crear Tarea</span>
                </Link>
              </li>

              {/* Mi cuenta dropdown */}
              <li className="nav-item dropdown mx-2">
                <button
                  className="btn nav-link dropdown-toggle d-flex align-items-center gap-1"
                  style={{ border: "none", background: "none" }}
                  id="accountDropdown"
                  onClick={handleUserClick}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  <span>Mi cuenta</span>
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    showUserMenu ? "show" : ""
                  }`}
                  aria-labelledby="accountDropdown"
                >
                  {user ? (
                    <>
                      <li className="dropdown-item">
                        <strong>ID:</strong> {user.id}
                      </li>
                      <li className="dropdown-item">
                        <strong>Nombre:</strong> {user.nombre}
                      </li>
                      <li className="dropdown-item">
                        <strong>Email:</strong> {user.email}
                      </li>
                    </>
                  ) : (
                    <li className="dropdown-item text-muted">
                      Cargando información...
                    </li>
                  )}
                </ul>
              </li>

              <li className="nav-item mx-2">
                <button
                  className="btn nav-link text-danger d-flex align-items-center gap-1"
                  style={{ border: "none", background: "none" }}
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right fs-5"></i>
                  <span>Cerrar Sesión</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <SpinnerModal
        show={showSpinner}
        message={spinnerMsg}
        type={spinnerType}
      />
    </>
  );
}

export default Navbar;
