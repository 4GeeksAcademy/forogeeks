// Componente ModalConfirmDelete.jsx
import React from "react";

export const ModalConfirmarDeleteThread = ({ isOpen, onClose, onDelete }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p className="text-center">¿Estás seguro de que quieres eliminar este hilo?</p>
                    </div>

                        <button type="button" className="btn btn-danger text-white rounded-5 align-self-center mb-3" onClick={onDelete}>Eliminar</button>

                </div>
            </div>
        </div>
    );
};