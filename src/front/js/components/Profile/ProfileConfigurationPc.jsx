import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";

const ProfileConfigurationPc = ({ showPassword, showEmail }) => {
  const { actions, store } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await actions.getUserInfo();
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setUserInfo(store.userInfo);
  }, [store.userInfo]);

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
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column position-relative">
        {/* Resto del contenido */}
        <div className="profile-configuration">
          <div className="user-info">
            {userInfo && (
              <>
                <div>
                  <strong>Nombre de usuario:</strong> {userInfo.user_name}
                </div>
                <div>
                  <strong>Email:</strong> {userInfo.email}
                </div>
                <div>
                  <strong>Descripción:</strong> {userInfo.description}
                </div>
                <div>
                  <img src={userInfo.profile_picture} alt="Profile" style={{ width: "20px" }} />
                </div>
              </>
            )}
          </div>
          {showPassword && (
            <>
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
            </>
          )}
          {showEmail && (
            <>
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
                <label htmlFor="confirmNewEmail">
                  Confirmar nuevo email
                </label>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileConfigurationPc;
