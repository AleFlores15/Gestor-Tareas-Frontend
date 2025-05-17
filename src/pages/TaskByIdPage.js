import React from "react";
import TaskById from "../components/TaskById";
import Task from "../components/Task";

const TaskByIdPage = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <h2 className="text-center mb-4">
        <i className="bi bi-search text-primary me-2"></i>Buscar Tarea por ID
      </h2>
      <TaskById />
    </div>
  );
};

export default TaskByIdPage;
