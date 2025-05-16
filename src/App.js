import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/unauthorized'];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <PrivateRoute>
              <CreateTaskPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
