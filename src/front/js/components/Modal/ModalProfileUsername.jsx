// ModalProfileUsername.jsx
import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
const ModalProfileUsername = ({
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
    const [newUsername, setNewUsername] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleSubmitUsername = async () => {
        try {
          // Obtener el token del estado
          const token = store.token;
    
          // Enviar la solicitud para cambiar el correo electrónico utilizando el token obtenido
          const { success, error } = await actions.changeUsername(token, newUsername);
    
          if (success) {
            // Mostrar alerta de éxito
            setAlertMessage("Tu nombre de usuario se ha actualizado.");
            setAlertType("success");
            // Vaciar los campos de entrada después de un envío exitoso
            setNewUsername("");
          } else {
            // Mostrar alerta de error
            setAlertMessage(error || "Error al cambiar el nombre de usuario. Por favor, inténtalo de nuevo.");
            setAlertType("danger");
          }
        } catch (error) {
          // Manejar cualquier error que ocurra al obtener el token del usuario
          console.error("Error al cambiar el nombre de usuario", error);
          setAlertMessage("Error al cambiar el nombre de usuario. Por favor, inténtalo de nuevo.");
          setAlertType("danger");
        }
      };

    return (
        <div
            className={`modal fade ${show ? "show" : ""}`}
            tabIndex="-1"
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
                        <label htmlFor="confirmnewUsername">
                            Confirmar nuevo nombre de usuario
                        </label>
                        <textarea
                            className="form-control"
                            id="newUsername"
                            rows="1"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary text-white" onClick={handleSubmitUsername}>
                        Cambiar nombre de usuario
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

export default ModalProfileUsername;
