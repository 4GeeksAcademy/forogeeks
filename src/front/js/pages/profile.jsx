import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
// IMPORT SCSS
import "../../scss/profile.scss";

// IMPORT ICONS
import { IconUserCircle } from "@tabler/icons-react";
import { IconUpload } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  // Variables para mostrar opciones de email y contraseña
  const [showEmail, setshowEmail] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  // Funciones para mostrar opciones de configuración
  //Función mostrar opciones de email
  const handleShowEmail = () => {
    setshowEmail(!showEmail);
    setshowPassword(false);
  };

  //Función mostrar opciones de contraseña
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
    setshowEmail(false);
  };

  return (
    // Comienzo del container
    <div className="container mt-3">
      <div className="row">
        {/* Div para tarjeta de usuario */}
        <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center align-items-center">
          <div className="shadow rounded-4 mb-4 p-3 text-center w-100 profile-container">
            {/* Actualizar imagen */}
            <div className="d-flex align-items-center justify-content-center mt-3">
              <IconUserCircle size={80} strokeWidth={0.5} />
              <IconUpload size={25} strokeWidth={2} />
            </div>
            {/* Actualizar usuario */}
            <div className="d-flex align-items-center justify-content-center mt-2">
              <p className="mb-0 ml-2 mx-2 fw-bold">username</p>
              <IconPencil size={20} strokeWidth={1} />
            </div>
            {/* Actualizar descripción */}
            <div className="d-flex align-items-center justify-content-center mb-3">
              <p className="mb-0 ml-2 mx-2 fw-bold">Me gusta react y JS.</p>
              <IconPencil size={20} strokeWidth={1} />
            </div>
            {/* Separador */}
            <hr className="separator" />
            {/* Mostrar opciones de email */}
            <div>
              <p className="mb-0 ml-2 mb-2" onClick={handleShowEmail}>
                Cambiar email
              </p>
            </div>
            {/* Mostrar opciones de contraseña */}
            <div>
              <p className="mb-0 ml-2 mb-2" onClick={handleShowPassword}>
                Cambiar contraseña
              </p>
            </div>
          </div>
        </div>

        {/* Div para configuración */}
        <div className="col-md-8">
          <div className="shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column align-items-center">
            <h4 className="text-center mb-4">Configuración</h4>
            {/* Configuración de email */}
            {showEmail && (
              <>
                {/* Email actual */}
                <div className="form-group mb-3 w-50">
                  <label htmlFor="editEmail">Email actual:</label>
                  <input type="email" className="form-control" id="editEmail" />
                </div>
                {/* Nuevo email */}
                <div className="form-group mb-3 w-50">
                  <label htmlFor="newEmail">Nuevo email:</label>
                  <input type="email" className="form-control" id="newEmail" />
                </div>
              </>
            )}
            {/* Configuración de contraseña */}
            {showPassword && (
              <>
                {/* Contraseña actual */}
                <div className="form-group mb-3 w-50">
                  <label htmlFor="currentPassword">Contraseña actual:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                  />
                </div>
                {/* Nueva contraseña */}
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
    </div>
  );
};
