import React from "react";

const ChatView = ({ showEmail, showPassword }) => {
  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 chat-container d-flex flex-column position-relative">
        {/* Contenedor de la imagen */}
        {/* Resto del contenido */}
        <div className="profile-configuration">
          {showEmail && (
            <>
              <div className="form-group mb-3 w-50">
                <label htmlFor="editEmail">Email actual:</label>
                <input
                  type="email"
                  className="form-control"
                  id="editEmail"
                />
              </div>
              <div className="form-group mb-3 w-50">
                <label htmlFor="newEmail">Nuevo email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="newEmail"
                />
              </div>
            </>
          )}
          {/* Formulario para cambiar contraseña */}
          {showPassword && (
            <>
              <div className="form-group mb-3 w-50">
                <label htmlFor="currentPassword">
                  Contraseña actual:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                />
              </div>
              <div className="form-group mb-3 w-50">
                <label htmlFor="newPassword">Nueva contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
