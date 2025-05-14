import React from 'react';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="text-center mb-4">Tablero de Tareas (Kanban)</h2>
      <TaskList />
    </div>
  );
};

export default TaskPage;
