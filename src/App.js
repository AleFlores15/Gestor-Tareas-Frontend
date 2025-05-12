import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Bienvenido a la gestión de tareas</h1>
        </header>
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/about" element={<h1>Acerca de</h1>} />
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
