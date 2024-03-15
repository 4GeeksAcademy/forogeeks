import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext.js";
import { IconRecordMail } from "@tabler/icons-react";
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
      {/* Modal */}
      <div className="modal-dialog modal-dialog-centered">
        {/* Modal Content*/}
        <div className="modal-content p-3 m-auto">
          {/* Modal Header*/}
          <div className="modal-header">
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          {/* Modal Body*/}
          <div className="modal-body">
            <div className="m-auto mt-2">
              <p className=" fw-bold  pt-2  text-center  w-100" htmlFor="email">
                Nuevo email:
              </p>
            </div>
            <div className="mt-2">
              <div className="form group w-75 m-auto" >
                <IconRecordMail stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                <input
                  type="email"
                  className="form-control  inputSignUpandRegister"
                  placeholder="Nuevo email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="m-auto mt-2">
              <p className=" fw-bold  pt-2 text-center  w-100" htmlFor="email">
                Confirmar nuevo email:
              </p>
            </div>
            <div className="form group w-75 m-auto" >
              <IconRecordMail stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
              <input
                type="email"
                placeholder="Confirmar nuevo email"
                className="form-control inputSignUpandRegister  "
                id="confirmNewEmail"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
              />
            </div>
            {/* Modal Button*/}
            <div className="mt-4 mb-2 ">
              <button className="btn  btn-primary text-white  buttonModal m-auto  text-center" onClick={handleSubmitEmail}>
                Confirmar  <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div >
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