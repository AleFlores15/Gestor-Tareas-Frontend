import React from 'react';

function SpinnerModal({ show, message = "Cargando..." }) {
  if (!show) return null;

  return (
    <div 
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1050 }}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: '200px', margin: 'auto' }} // 👈 aquí se ajusta el ancho
      >
        <div className="modal-content">
          <div className="modal-body d-flex flex-column align-items-center justify-content-center text-center py-4">
            <div 
              className="spinner-border text-primary" 
              role="status" 
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 mb-0">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinnerModal;
