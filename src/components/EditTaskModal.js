import React, { useState } from 'react';

const EditTaskModal = ({ show, onHide, onConfirm, tarea }) => {
  const [titulo, setTitulo] = useState(tarea.titulo || '');
  const [descripcion, setDescripcion] = useState(tarea.descripcion || '');
  const [fechaLimite, setFechaLimite] = useState(tarea.fechaLimite?.slice(0, 10) || '');

  // Obtener la fecha de hoy en formato yyyy-MM-dd con zona horaria de Bolivia
  const getFechaHoy = () => {
    const ahora = new Date();
    const fechaBolivia = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/La_Paz' }));
    return fechaBolivia.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (!titulo.trim()) return alert('El título no puede estar vacío');
    if (!fechaLimite) return alert('Debes establecer una fecha límite');

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
      style={{ backgroundColor: show ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content rounded-4">
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha límite</label>
              <input
                type="date"
                className="form-control"
                min={getFechaHoy()}
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onHide}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
