import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";

// IMPORTAR SCSS
import "../../scss/profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORTAR COMPONENTES
import ProfileCardPc from "../components/Profile/ProfileCardPc.jsx";
import ProfileConfigurationPc from "../components/Profile/ProfileConfigurationPc.jsx";
import ProfileCardMobile from "../components/Profile/ProfileCardMobile.jsx";

export const Profile = () => {
  // Determinar el contenido a mostrar según la resolución
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Acceso al contexto de la aplicación
  const { store, actions } = useContext(Context);
  // Estado para el tamaño de la pantalla
  const [isMobile, setIsMobile] = useState(false);
  // Estado para el modal de econtraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // Estado para la confirmación de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Estado para la configuración de email en pantallas grandes
  const [showEmail, setshowEmail] = useState(false);
  // Estado para la configuración de contraseña en pantallas grandes
  const [showPassword, setshowPassword] = useState(false);

  // Funciones para mostrar opciones de configuración
  // Función para mostrar opciones de email
  const handleShowEmail = () => {
    setshowEmail(!showEmail);
    setshowPassword(false);
  };

  // Función para mostrar opciones de contraseña
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
    setshowEmail(false);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {isMobile ? (
          <ProfileCardMobile />
        ) : (
          <>
            <ProfileCardPc
              handleShowEmail={handleShowEmail}
              handleShowPassword={handleShowPassword}
            />
            <ProfileConfigurationPc
              showEmail={showEmail}
              showPassword={showPassword}
            />
          </>
        )}
      </div>
    </div>
  );
};
