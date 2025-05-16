import React from 'react';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="text-center mb-4 text-primary">Tablero de Tareas</h2>
      <TaskList />
    </div>
  );
};

export default TaskPage;
