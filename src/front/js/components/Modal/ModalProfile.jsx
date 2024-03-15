// ModalProfile.jsx
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { IconPassword } from "@tabler/icons-react";
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
  updateChangesSaved,
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
        updateChangesSaved(true);
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
      {/* Modal*/}
      <div className="modal-dialog modal-dialog-centered">
        {/* Modal Content*/}
        <div className="modal-content p-3 m-auto">
          {/* Modal Header*/}
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          {/* Modal Body*/}
          <div className="modalBody">
            <div className="m-auto mt-2">
              <p className=" fw-bold  pt-2  text-center  w-100" htmlFor="email">
                Nueva contraseña:
              </p>
            </div>
            <div className="mt-2">
              <div className="form group w-75 m-auto" >
                <IconPassword stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                <input
                  type="password"
                  className="form-control  inputSignUpandRegister"
                  placeholder="Contraseña"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="m-auto mt-2">
              <p className=" fw-bold  pt-2  text-center  w-100" htmlFor="email">
                Confirmar nueva contraseña:
              </p>
            </div>
            <div className="form group w-75 m-auto" >
              <IconPassword stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
              <input
                type="password"
                className="form-control  inputSignUpandRegister"
                id="confirmNewPassword"
                placeholder="Confirmar contraseña"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {/* Modal Button*/}
            <div className="mt-4 mb-2 ">
              <button className="btn  btn-primary text-white  buttonModal m-auto  text-center" onClick={handleSubmit}>
                Confirmar  <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div>
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

export default ModalProfile;
