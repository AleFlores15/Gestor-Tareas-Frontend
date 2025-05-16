import React, { useEffect, useState } from "react";
import Task from "./Task";
import { obtenerTareas } from "../services/taskService";

const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
  const [filtros, setFiltros] = useState({
    search: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async (filtrosActivos = filtros) => {
    try {
      setLoading(true);
      const tareasObtenidas = await obtenerTareas(filtrosActivos);
      setTareas(tareasObtenidas);
    } catch (error) {
      mostrarAlerta("Error al cargar tareas", "danger");
    } finally {
      setLoading(false);
    }
  };

  const mostrarAlerta = (mensaje, tipo = "success") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => {
      setAlerta({ mensaje: "", tipo: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);
    cargarTareas(nuevosFiltros); // Aplica los filtros automáticamente
  };

  const handleReset = () => {
    const valoresIniciales = {
      search: "",
      estado: "",
      fechaInicio: "",
      fechaFin: "",
    };
    setFiltros(valoresIniciales);
    cargarTareas(valoresIniciales);
  };

  const tareasPorEstado = {
    pendiente: tareas.filter((t) => t.estado === "pendiente"),
    "en progreso": tareas.filter((t) => t.estado === "en progreso"),
    completada: tareas.filter((t) => t.estado === "completada"),
  };

  return (
    <div className="container my-4">
      {/* Formulario de filtros */}
      <form className="card shadow-sm p-3 mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="row gy-3 gx-3">
          <div className="col-md-4">
            <label htmlFor="search" className="form-label">
              <i className="bi bi-search me-1"></i>Buscar
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                placeholder="Título o descripción"
                value={filtros.search}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-md-2">
            <label htmlFor="estado" className="form-label">
              <i className="bi bi-filter-circle me-1"></i>Estado
            </label>
            <select
              name="estado"
              id="estado"
              className="form-select"
              value={filtros.estado}
              onChange={handleInputChange}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div className="col-md-2">
            <label htmlFor="fechaInicio" className="form-label">
              <i className="bi bi-calendar-event me-1"></i>Desde
            </label>
            <input
              type="date"
              name="fechaInicio"
              id="fechaInicio"
              className="form-control"
              value={filtros.fechaInicio}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="fechaFin" className="form-label">
              <i className="bi bi-calendar-check me-1"></i>Hasta
            </label>
            <input
              type="date"
              name="fechaFin"
              id="fechaFin"
              className="form-control"
              value={filtros.fechaFin}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              <i className="bi bi-x-circle me-1"></i>Limpiar
            </button>
          </div>
        </div>
      </form>

      {/* Pools de tareas */}
      <div className="row">
        {Object.entries(tareasPorEstado).map(([estado, lista]) => (
          <div className="col-12 col-md-4 mb-4" key={estado}>
            <div className="card h-100 shadow-sm">
              <div
                className={`card-header text-center text-white text-capitalize ${
                  estado === "pendiente"
                    ? "bg-warning"
                    : estado === "en progreso"
                    ? "bg-primary"
                    : "bg-success"
                }`}
              >
                <i
                  className={`bi me-1 ${
                    estado === "pendiente"
                      ? "bi-hourglass-split"
                      : estado === "en progreso"
                      ? "bi-arrow-repeat"
                      : "bi-check-circle-fill"
                  }`}
                ></i>
                {estado}
              </div>
              <div
                className="card-body p-3"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {lista.length === 0 ? (
                  <p className="text-muted text-center">Sin tareas</p>
                ) : (
                  lista.map((tarea) => (
                    <Task
                      key={tarea.id}
                      tarea={tarea}
                      onTareaActualizada={() => {
                        cargarTareas();
                        mostrarAlerta("Tarea actualizada correctamente");
                      }}
                      onTareaEliminada={() => {
                        cargarTareas();
                        mostrarAlerta("Tarea eliminada", "warning");
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
