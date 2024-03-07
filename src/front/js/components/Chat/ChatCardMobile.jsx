import React, { useState } from "react";
import { IconUserCircle, IconArrowRight } from "@tabler/icons-react";
import ModalProfile from "../Modal/ModalProfile.jsx";

const ChatCardMobile = () => {
  // Estados y funciones para controlar los modales
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="mobile-container shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column">
      {/* Contenido del perfil móvil */}
      <div className="profile-image-container position-relative w-100">
        <img
          className="profile-image border rounded h-75"
          src="https://static.vecteezy.com/system/resources/thumbnails/002/558/861/small/blue-background-with-hexagonal-grid-header-abstract-stainless-steel-banner-modern-creative-design-temlates-colorful-illustration-vector.jpg"
          alt=""
        />
        {/* Ícono superpuesto */}
        <IconUserCircle size={100} className="icon-sticker" />
      </div>
      {/* Opciones del perfil */}
      <div className="d-flex align-items-start justify-content-between mb-4" onClick={() => handleOpenModal("username")}>
        <p className="mb-0 ml-2 fw-bold mt-2">username</p>
        <IconArrowRight className="mt-4" size={20} strokeWidth={1} />
      </div>
      <div className="d-flex align-items-start justify-content-between mb-2" onClick={() => handleOpenModal("description")}>
        <p className="mb-0 ml-2 fw-bold">Me gusta React y JS.</p>
        <IconArrowRight className="mt-2" size={20} strokeWidth={1} />
      </div>
      <hr className="separator" />
      {/* Abrir el modal correspondiente al hacer clic en "Cambiar email" */}
      <div className={`d-flex align-items-start justify-content-between mb-4 ${activeModal === "email" && "active"}`} onClick={() => handleOpenModal("email")}>
        <p className="mb-0 ml-2 fw-bold">Cambiar email.</p>
        <IconArrowRight className="mt-2" size={20} strokeWidth={1} />
      </div>
      {/* Abrir el modal correspondiente al hacer clic en "Cambiar contraseña" */}
      <div className={`d-flex align-items-start justify-content-between mb-4 ${activeModal === "password" && "active"}`} onClick={() => handleOpenModal("password")}>
        <p className="mb-0 ml-2 fw-bold">Cambiar contraseña.</p>
        <IconArrowRight className="mt-2" size={20} strokeWidth={1} />
      </div>

      {/* Modales */}
      {/* Modal para cambiar el nombre de usuario */}
      <ModalProfile
        show={activeModal === "username"}
        handleClose={handleCloseModal}
        title="Nombre de usuario"
        inputType="username"
        username="InitialUsername"
        description="InitialDescription"
      />
      {/* Modal para cambiar la descripción */}
      <ModalProfile
        show={activeModal === "description"}
        handleClose={handleCloseModal}
        title="Descripción"
        inputType="description"
        username="InitialUsername"
        description="InitialDescription"
      />
      {/* Modal para cambiar el correo electrónico */}
      <ModalProfile
        show={activeModal === "email"}
        handleClose={handleCloseModal}
        title="Email"
        inputType="email"
        username="InitialUsername"
        description="InitialDescription"
      />
      {/* Modal para cambiar la contraseña */}
      <ModalProfile
        show={activeModal === "password"}
        handleClose={handleCloseModal}
        title="Contraseña"
        inputType="password"
        username="InitialUsername"
        description="InitialDescription"
      />
    </div>
  );
};

export default ChatCardMobile;
