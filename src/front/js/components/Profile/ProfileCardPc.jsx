import React from "react";
import { IconLock, IconMail } from "@tabler/icons-react";

const ProfileCardPc = ({ handleShowEmail, handleShowPassword }) => {
  return (
    <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-start align-items-start">
      {/* Contenedor del perfil en versión de escritorio */}
      <div className="shadow rounded-4 mb-4 p-3 w-100 profile-container-card">
        {/* Icono de usuario y opción para subir foto */}
        {/* Título editar */}
        <div className="d-flex mt-2">
          <h1 className="display-4">Editar</h1>
        </div>
        <hr className="separator" />
        {/* Sección para cambiar email y contraseña */}
        <div className="user-option d-flex">
          <IconMail size={20} className="mt-1 mx-1"></IconMail>
          <p className="mb-0 ml-2 mb-2" onClick={handleShowEmail}>
            Cambiar email
          </p>
        </div>
        <div className="user-option d-flex">
          <IconLock size={20} className="mt-1 mx-1"></IconLock>
          <p className="mb-0 ml-2 mb-2" onClick={handleShowPassword}>
            Cambiar contraseña
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardPc;
