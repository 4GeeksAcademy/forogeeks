import React from "react";
import { IconUserCircle, IconUpload, IconPencil } from "@tabler/icons-react";

const ProfileCardPc = ({ handleShowEmail, handleShowPassword }) => {
  return (
    <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center align-items-center">
      {/* Contenedor del perfil en versión de escritorio */}
      <div className="shadow rounded-4 mb-4 p-3 text-center w-100 profile-container">
        {/* Icono de usuario y opción para subir foto */}
        <div className="d-flex align-items-center justify-content-center mt-3">
          <IconUserCircle size={80} strokeWidth={1} />
          <IconUpload size={25} strokeWidth={2} />
        </div>
        {/* Nombre de usuario editable */}
        <div className="d-flex align-items-center justify-content-center mt-2">
          <p className="mb-0 ml-2 mx-2 fw-bold">username</p>
          <IconPencil size={20} strokeWidth={1} />
        </div>
        {/* Descripción editable */}
        <div className="d-flex align-items-center justify-content-center mb-3">
          <p className="mb-0 ml-2 mx-2 fw-bold">Me gusta react y JS.</p>
          <IconPencil size={20} strokeWidth={1} />
        </div>
        <hr className="separator" />
        {/* Sección para cambiar email y contraseña */}
        <div>
          <p className="mb-0 ml-2 mb-2" onClick={handleShowEmail}>
            Cambiar email
          </p>
        </div>
        <div>
          <p className="mb-0 ml-2 mb-2" onClick={handleShowPassword}>
            Cambiar contraseña
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardPc;
