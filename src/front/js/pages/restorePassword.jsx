import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const RestorePassword = () => {
  const { actions } = useContext(Context);
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

    // Extraer el token del query string de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    // Enviar la solicitud para restablecer la contraseña utilizando la nueva acción en el flujo de datos
    const { success, error } = await actions.resetPassword(token, newPassword);
    
    if (success) {
      // Mostrar alerta de éxito
      setAlertMessage("Tu contraseña se ha actualizado.");
      setAlertType("success");
      // Vaciar los campos de entrada después de un envío exitoso
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      // Mostrar alerta de error
      setAlertMessage(error || "Error al restablecer la contraseña. Por favor, inténtalo de nuevo.");
      setAlertType("danger");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* CONTENEDOR DEL HILO */}
          <div className="shadow-sm rounded-3 mb-4 py-4 px-3 bg-white">
            <h1 className="text-center mb-4">Recuperar contraseña</h1>
            {alertMessage && (
              <div className={`alert alert-${alertType}`} role="alert">
                {alertMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary text-white">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
