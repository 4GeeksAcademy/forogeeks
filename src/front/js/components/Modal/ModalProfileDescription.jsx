import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";

const ModalProfileDescription = ({ show, handleClose, title, updateChangesSaved }) => {
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
        updateChangesSaved(true);
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
    <div className={`modal fade ${show ? "show" : ""}`} tabIndex="-1" aria-hidden={!show}>
      {/* Modal */}
      <div className="modal-dialog m-auto  p-3 modal-dialog-centered">
        {/* Modal Content */}
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          {/* Modal Body */}
          <div className="modal-body m-auto">
            <div className=" m-auto ">
              <p className=" fw-bold  text-center pt-2  w-100" htmlFor="descripción">
                Descripción
              </p>
            </div>
            <div className=" mt-2 ">
              <div className="form group  m-auto mt-3">
                <textarea
                  placeholder="Información:"
                  className="form-control m-auto inputSignUpandRegister "
                  id="newDescription"
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setnewDescription(e.target.value)} style={{ height: "5rem", width: "20rem" }}
                />
              </div>
              <div className="mt-4 mb-2 ">
                <button className="btn  btn-primary text-white  buttonModal m-auto  text-center" onClick={handleSubmitDescription}>
                  Confirmar  <div className="arrow-wrapper">
                    <div className="arrow"></div>
                  </div>
                </button>
              </div>
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

export default ModalProfileDescription;
