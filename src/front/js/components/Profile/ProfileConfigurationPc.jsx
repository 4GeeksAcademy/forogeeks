import React from "react";

const ProfileConfigurationPc = ({ showEmail, showPassword }) => {
  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column align-items-center">
        {/* Título de la sección */}
        <h4 className="text-center mb-4">Configuración</h4>
        {/* Formulario para cambiar email */}
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
  );
};

export default ProfileConfigurationPc;
