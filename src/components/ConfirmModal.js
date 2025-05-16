import React from 'react';

const ConfirmModal = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: show ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-semibold">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <p className="mb-0 text-secondary">{message}</p>
          </div>
          <div className="modal-footer border-0 d-flex flex-column flex-sm-row gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={onHide}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
