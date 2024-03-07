import React from "react";
import { IconLock, IconMail, IconMessageCircle2 } from "@tabler/icons-react";

const ChatCardPc = ({ handleShowEmail, handleShowPassword }) => {
    return (
        <div className="col-md-4 mb-3 mb-md-0 d-flex">
            {/* Contenedor del perfil en versión de escritorio */}
            <div className="shadow rounded-4 mb-4 p-3 w-100 profile-container-card">
                {/* Icono de usuario y opción para subir foto */}
                {/* Título editar */}
                <div className="chat p-3 border rounded" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <div className="d-flex">
                            <IconMail />
                            <h5 className="ms-1">AYUDA RAUL</h5>
                            </div>

                        <p className="fw-bold">@linse</p>
                    </div>
                    <div>
                    <div className="d-flex">
                            <IconMessageCircle2 />
                            <h5 className="ms-1">12</h5>
                            </div>
                    </div>
                </div>



                <hr className="separator" />
                {/* Sección para cambiar email y contraseña */}
                <div className="user-option d-flex">
                    <IconMail size={20} className="mt-1 mx-1"></IconMail>
                    <p className="mb-0 ml-2 mb-2" onClick={handleShowEmail}>
                        Cambiar email
                    </p>
                </div>
                <div className="user-option d-flex">
                    <IconLock size={20} className="mt-1 mx-1"></IconLock>
                    <p className="mb-0 ml-2 mb-2" onClick={handleShowPassword}>
                        Cambiar contraseña
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatCardPc;
