import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const ModalProfileEmail = ({ show, handleClose, title }) => {
  const { actions, store } = useContext(Context);
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    // Validar que los correos electrónicos coincidan
    if (newEmail !== confirmNewEmail) {
        setAlertMessage("Los correos no coinciden.");
        setAlertType("danger");
        return;
    }

    try {
        // Obtener el token del estado
        const token = store.token;

        // Enviar la solicitud para cambiar el correo electrónico utilizando el token obtenido
        const { success, error } = await actions.changeEmail(token, newEmail);
        
        if (success) {
            // Mostrar alerta de éxito
            setAlertMessage("Tu correo se ha actualizado. Inicia sesión con tu nuevo correo.");
            setAlertType("success");
            // Vaciar los campos de entrada después de un envío exitoso
            setNewEmail("");
            setConfirmNewEmail("");
            actions.logout();
        } else {
            // Mostrar alerta de error
            setAlertMessage(error || "Error al cambiar el correo. Por favor, inténtalo de nuevo.");
            setAlertType("danger");
        }
    } catch (error) {
        // Manejar cualquier error que ocurra al obtener el token del usuario
        console.error("Error al cambiar el correo:", error);
        setAlertMessage("Error al cambiar el correo. Por favor, inténtalo de nuevo.");
        setAlertType("danger");
    }
};

  return (
    <div className={`modal fade ${show ? "show" : ""}`} tabIndex="-1" aria-labelledby="emailModalLabel" aria-hidden={!show}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-group mb-3 w-50">
              <label htmlFor="newEmail">Nuevo email:</label>
              <input
                type="email"
                className="form-control"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3 w-50">
              <label htmlFor="confirmNewEmail">Confirmar nuevo email:</label>
              <input
                type="email"
                className="form-control"
                id="confirmNewEmail"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary text-white" onClick={handleSubmitEmail}>
              Cambiar Email
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
    </div>
  );
};

export default ModalProfileEmail;
