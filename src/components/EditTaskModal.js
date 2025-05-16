import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ show, onHide, onConfirm, tarea }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo || '');
      setDescripcion(tarea.descripcion || '');
      setFechaLimite(tarea.fechaLimite?.split('T')[0] || '');
    }
  }, [tarea]);

  const handleSubmit = () => {
    onConfirm({
      titulo,
      descripcion,
      fechaLimite,
    });
  };

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: show ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Editar tarea</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha límite</label>
              <input
                type="date"
                className="form-control"
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
            <button className="btn btn-outline-secondary w-100" onClick={onHide}>
              Cancelar
            </button>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
