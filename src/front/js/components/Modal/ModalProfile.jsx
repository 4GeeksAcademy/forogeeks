import React from "react";

const ModalProfile = ({
  // Indica si el modal debe mostrarse o no
  show,
  // Función para cerrar el modal
  handleClose,
  // Tipo de entrada para determinar qué contenido mostrar en el modal
  inputType,
  // Función para guardar los cambios
  handleSave,
  // Valor del nombre de usuario
  username,
  // Valor de la descripción
  description,
  // Título para modal
  title,
}) => {
  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      aria-labelledby="passwordModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          {/* Mostrar campos para cambiar el nombre de usuario si inputType es "username" */}
          <div className="modal-body">
            {inputType === "username" && (
              <div className="mb-3">
                <label htmlFor="newUsername" className="form-label">
                  Nuevo nombre de usuario:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newUsername"
                  defaultValue={username}
                />
              </div>
            )}
            {/* Mostrar campo para cambiar la descripción si inputType es "description" */}
            {inputType === "description" && (
              <div className="mb-3">
                <label htmlFor="newDescription" className="form-label">
                  Nueva descripción:
                </label>
                <textarea
                  className="form-control"
                  id="newDescription"
                  rows="3"
                  defaultValue={description}
                ></textarea>
              </div>
            )}
            {/* Mostrar campos para cambiar el correo electrónico si inputType es "email" */}
            {inputType === "email" && (
              <>
                <div className="mb-3">
                  <label htmlFor="currentEmail" className="form-label">
                    Email actual:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="currentEmail"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newEmail" className="form-label">
                    Nuevo email:
                  </label>
                  <input type="email" className="form-control" id="newEmail" />
                </div>
              </>
            )}
            {/*Mostrar campos para cambiar la contraseña si inputType es "password" */}
            {inputType === "password" && (
              <>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Contraseña actual:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    Nueva contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirmar nueva contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary text-white"
              onClick={handleSave}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
