import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTask from '../components/CreateTask';
import SpinnerModal from '../components/SpinnerModal';
import { crearTarea } from '../services/taskService';

const CreateTaskPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("Cargando...");
  const [spinnerType, setSpinnerType] = useState("loading");
  const navigate = useNavigate();

  const handleCreate = async (tarea) => {
    setLoading(true);
    setError(null);
    setSpinnerMessage("Creando tarea...");
    setSpinnerType("loading");

    const MIN_SPINNER_TIME = 600;
    const startTime = Date.now();

    try {
      const data = await crearTarea(tarea);

      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setSpinnerMessage(data.message || "Tarea creada exitosamente");
      setSpinnerType("success");

      setTimeout(() => {
        navigate("/tasks");
        setLoading(false);
      }, remaining > 0 ? remaining + 600 : 1000);

    } catch (err) {
      console.error(err);
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      const msg = "Completa los campos correctamente";

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
        <CreateTask onSubmit={handleCreate} />
        <SpinnerModal
          show={loading}
          message={spinnerMessage}
          loading={spinnerType === "loading"}
          type={spinnerType}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;
