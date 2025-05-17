import React, { useState } from "react";
import { obtenerTareaPorId } from "../services/taskService";
import Task from "./Task";
import "bootstrap-icons/font/bootstrap-icons.css";

const TaskById = () => {
  const [id, setId] = useState("");
  const [tarea, setTarea] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarTarea = async (e) => {
    e.preventDefault();
    setError("");
    setTarea(null);
    setLoading(true);

    try {
      const tareaEncontrada = await obtenerTareaPorId(id.trim());
      setTarea(tareaEncontrada.tarea);
    } catch (err) {
        console.error(err);
        console.error("Error al buscar tarea:", err);
        //onbtener el messaje de error del servidor
        const mensajeError = err.response?.data?.message || "Error desconocido";
        setError(mensajeError);
        setTarea(null);
        
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={buscarTarea} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el ID de la tarea"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search me-1"></i>Buscar
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {tarea && (
            <Task
              tarea={tarea}
              onTareaActualizada={() =>
                buscarTarea({ preventDefault: () => {} })
              }
              onTareaEliminada={() => setTarea(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskById;
