// ModalProfile.jsx
import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
const ModalProfile = ({
  // Indica si el modal debe mostrarse o no
  show,
  // Función para cerrar el modal
  handleClose,
  // Tipo de entrada para determinar qué contenido mostrar en el modal
  inputType,
  // Función para guardar los cambios
  handleSave,
  // Título para modal
  title,
}) => {
  const { actions, store } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
        setAlertMessage("Las contraseñas no coinciden.");
        setAlertType("danger");
        return;
    }

    try {
        // Obtener el token del estado
        const token = store.token;
  
        // Enviar la solicitud para cambiar la contraseña utilizando el token obtenido
        const { success, error } = await actions.changePassword(token, newPassword);
        
        if (success) {
            // Mostrar alerta de éxito
            setAlertMessage("Tu contraseña se ha actualizado.");
            setAlertType("success");
            // Vaciar los campos de entrada después de un envío exitoso
            setNewPassword("");
            setConfirmNewPassword("");
        } else {
            // Mostrar alerta de error
            setAlertMessage(error || "Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
            setAlertType("danger");
        }
    } catch (error) {
        // Manejar cualquier error que ocurra al obtener el token del usuario
        console.error("Error al cambiar la contraseña:", error);
        setAlertMessage("Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
        setAlertType("danger");
    }
};


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
              <button className="btn btn-primary text-white" onClick={handleSubmit}>
                Cambiar Contraseña
              </button>
              {/* Mostrar alerta si hay mensaje */}
              {alertMessage && (
                <div className={`alert alert-${alertType}`} role="alert">
                  {alertMessage}
                </div>
              )}
          </div>
        </div>
      </div>
  );
};

export default ModalProfile;
