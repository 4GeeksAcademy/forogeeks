import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const ModalProfileEmail = ({ show, handleClose, title }) => {
  const { actions, store } = useContext(Context);
  const [newDescription, setnewDescription] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmitDescription = async () => {
    try {
      // Obtener el token del estado
      const token = store.token;

      // Enviar la solicitud para cambiar el correo electrónico utilizando el token obtenido
      const { success, error } = await actions.changeDescription(token, newDescription);

      if (success) {
        // Mostrar alerta de éxito
        setAlertMessage("Tu descripción se ha actualizado.");
        setAlertType("success");
        // Vaciar los campos de entrada después de un envío exitoso
        setnewDescription("");
      } else {
        // Mostrar alerta de error
        setAlertMessage(error || "Error al cambiar la descripción. Por favor, inténtalo de nuevo.");
        setAlertType("danger");
      }
    } catch (error) {
      // Manejar cualquier error que ocurra al obtener el token del usuario
      console.error("Error al cambiar la descripción", error);
      setAlertMessage("Error al cambiar la descripción. Por favor, inténtalo de nuevo.");
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
            <div className="form-group mb-3">
              <label htmlFor="newDescription">Nueva descripción:</label>
              <textarea
                className="form-control"
                id="newDescription"
                rows="3"
                value={newDescription}
                onChange={(e) => setnewDescription(e.target.value)}
              />
            </div>
            <button className="btn btn-primary text-white" onClick={handleSubmitDescription}>
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
