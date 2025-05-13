import React from 'react';

function SpinnerModal({ show, loading = true, message = "Cargando...", type = "loading" }) {
  if (!show) return null;

  const getColor = () => {
    if (type === "success") return "text-success";
    if (type === "error") return "text-danger";
    return "text-primary";
  };

  const getIcon = () => {
    if (type === "success") {
      return <i className="bi bi-check-circle-fill text-success fs-1 mb-2"></i>;
    }
    if (type === "error") {
      return <i className="bi bi-x-circle-fill text-danger fs-1 mb-2"></i>;
    }
    return (
      <div 
        className="spinner-border text-primary mb-2" 
        role="status" 
        style={{ width: '2.5rem', height: '2.5rem' }}
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    );
  };

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
        style={{ maxWidth: '220px', margin: 'auto' }}
      >
        <div className="modal-content">
          <div className="modal-body d-flex flex-column align-items-center justify-content-center text-center py-4">
            {getIcon()}
            <p className={`mt-2 mb-0 fw-medium ${getColor()}`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinnerModal;
