import React, { useState } from 'react';
import { actualizarTarea, eliminarTarea } from '../services/taskService';
import ConfirmModal from './ConfirmModal';
import EditTaskModal from './EditTaskModal';

const Task = ({ tarea, onTareaActualizada, onTareaEliminada }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [accionConfirmada, setAccionConfirmada] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const abrirModal = (accion, titulo, mensaje) => {
    setAccionConfirmada(() => accion);
    setModalTitle(titulo);
    setModalMessage(mensaje);
    setShowModal(true);
  };

  const handleConfirmacion = async () => {
    if (accionConfirmada) {
      await accionConfirmada();
    }
    setShowModal(false);
  };

  const marcarEnProgreso = async () => {
    try {
      await actualizarTarea(tarea.id, { estado: 'en progreso' });
      onTareaActualizada();
    } catch (error) {
      onTareaActualizada?.();
    }
  };

  const marcarCompletada = async () => {
    try {
      await actualizarTarea(tarea.id, { estado: 'completada' });
      onTareaActualizada();
    } catch (error) {
      onTareaActualizada?.();
    }
  };

  const eliminar = async () => {
    try {
      await eliminarTarea(tarea.id);
      onTareaEliminada();
    } catch (error) {
      onTareaEliminada?.();
    }
  };

  const actualizar = async (tareaActualizada) => {
    try {
      await actualizarTarea(tarea.id, tareaActualizada);
      onTareaActualizada();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    } finally {
      setShowEditModal(false);
    }
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'warning';
      case 'en progreso':
        return 'info';
      case 'completada':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getBorderColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'border-start border-2 border-warning';
      case 'en progreso':
        return 'border-start border-2 border-info';
      case 'completada':
        return 'border-start border-2 border-success';
      default:
        return 'border-start border-2 border-secondary';
    }
  };

  return (
    <>
      <div className={`card mb-4 bg-white shadow-lg ${getBorderColor(tarea.estado)}`} style={{ borderRadius: '1rem' }}>
        <div className="card-body">
          <h5 className="card-title mb-2">
            <i className="bi bi-list-task me-2 text-primary"></i>{tarea.titulo}
          </h5>

          {tarea.descripcion && (
            <p className="card-text text-muted">
              <i className="bi bi-chat-left-text me-1"></i>{tarea.descripcion}
            </p>
          )}

          <p className="card-text">
            <small className="text-muted">
              <i className="bi bi-calendar-event me-1"></i>
              Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString()}
            </small>
          </p>

          <span className={`badge bg-${getBadgeColor(tarea.estado)} mb-3`}>
            {tarea.estado.toUpperCase()}
          </span>

          <div className="d-grid gap-2 mt-2">
            {tarea.estado !== 'completada' && (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowEditModal(true)}
              >
                <i className="bi bi-pencil-square me-1"></i>Editar tarea
              </button>
            )}
            {tarea.estado === 'pendiente' && (
              <button
                className="btn btn-outline-info btn-sm"
                onClick={() =>
                  abrirModal(
                    marcarEnProgreso,
                    'Marcar como En Progreso',
                    '¿Estás segura de que quieres marcar esta tarea como "En Progreso"?'
                  )
                }
              >
                <i className="bi bi-hourglass-split me-1"></i>Marcar como En Progreso
              </button>
            )}
            {tarea.estado === 'en progreso' && (
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() =>
                  abrirModal(
                    marcarCompletada,
                    'Marcar como Completada',
                    '¿Quieres marcar esta tarea como completada?'
                  )
                }
              >
                <i className="bi bi-check2-circle me-1"></i>Marcar como Completada
              </button>
            )}
            {tarea.estado === 'completada' && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  abrirModal(
                    eliminar,
                    'Eliminar tarea',
                    '¿Estás segura de que quieres eliminar esta tarea completada?'
                  )
                }
              >
                <i className="bi bi-trash3 me-1"></i>Eliminar
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmacion}
        title={modalTitle}
        message={modalMessage}
      />

      <EditTaskModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onConfirm={actualizar}
        tarea={tarea}
      />
    </>
  );
};

export default Task;
