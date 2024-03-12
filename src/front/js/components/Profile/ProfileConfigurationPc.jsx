import React, { useState, useContext } from "react";
import { IconPencil } from "@tabler/icons-react";
import ProfilePicture from "./ProfilePicture.jsx";
import { Context } from "../../store/appContext";

const ProfileConfigurationPc = ({ showEmail, showPassword, profileImg }) => {
  const { actions, store } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    // Verificar que todos los campos estén completos
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setAlertMessage("Por favor, completa todos los campos.");
      setAlertType("danger");
      return;
    }
  
    // Validar que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmNewPassword) {
      setAlertMessage("La nueva contraseña y la confirmación no coinciden.");
      setAlertType("danger");
      return;
    }
  
    try {
      // Llamar a la acción changePassword del flux para cambiar la contraseña
      const { success, error } = await actions.changePassword(currentPassword, newPassword);
      if (success) {
        setAlertMessage("La contraseña se ha cambiado exitosamente.");
        setAlertType("success");
      } else {
        setAlertMessage(error || "Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setAlertMessage("Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
      setAlertType("danger");
    }
  
    // Limpiar los campos de entrada después de un cambio exitoso o fallido
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column position-relative">
        {/* Contenedor de la imagen */}
        <div className="profile-image-container position-relative w-100">
          <img
            className="profile-image border rounded h-75"
            src={profileImg}
            alt=""
          />
        </div>
        {/* Título de la sección */}
        <div className="user-info">
          {/* Texto de usuario */}
          <div className="d-flex align-items-center">
            <h1 className="display-6 fw-semibold">username</h1>
            {/* Ícono superpuesto */}
            <IconPencil className="mb-4 ms-1" />
          </div>
          <div className="d-flex align-items-center">
            <ProfilePicture size="5rem" />
          </div>
          {/* Descripción */}
          <div className="d-flex align-items-center">
            <p>Me gusta React y JS</p>
            <IconPencil className="mb-4 ms-1" />
          </div>
        </div>
        {/* Resto del contenido */}
        <div className="profile-configuration">
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-group mb-3 w-50">
                <label htmlFor="newPassword">Nueva contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group mb-3 w-50">
                <label htmlFor="confirmNewPassword">
                  Confirmar nueva contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary text-white" onClick={handlePasswordChange}>
                Cambiar Contraseña
              </button>
              {/* Mostrar alerta si hay mensaje */}
              {alertMessage && (
                <div className={`alert alert-${alertType}`} role="alert">
                  {alertMessage}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileConfigurationPc;
