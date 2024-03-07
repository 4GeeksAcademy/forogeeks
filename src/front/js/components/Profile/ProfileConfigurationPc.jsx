import React from "react";
import { IconUserCircle } from "@tabler/icons-react";

const ProfileConfigurationPc = ({ showEmail, showPassword }) => {
  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column position-relative">
        {/* Contenedor de la imagen */}
        <div className="profile-image-container position-relative w-100">
          <img
            className="profile-image border rounded h-75"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/558/861/small/blue-background-with-hexagonal-grid-header-abstract-stainless-steel-banner-modern-creative-design-temlates-colorful-illustration-vector.jpg"
            alt=""
          />
          {/* Ícono superpuesto */}
          <IconUserCircle size={100} className="icon-sticker" />
        </div>
        {/* Título de la sección */}
        <div className="user-info">
          <h1 className="display-6 fw-semibold">username</h1>
          <p>Me gusta React y JS</p>
        </div>
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

export default ProfileConfigurationPc;
