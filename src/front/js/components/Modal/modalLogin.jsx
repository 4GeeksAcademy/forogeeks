import React, { useState, useContext } from "react";
import { ModalRegister } from "./modalRegister.jsx";
import { Context } from "../../store/appContext";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate de React 

// ICONS
import { IconMail } from '@tabler/icons-react';
import { IconLock } from '@tabler/icons-react';

export const ModalLogin = ({ showLogin, handleCloseLogin }) => {
    const { actions, store } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    const navigate = useNavigate(); // Obtener la función de navegación

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await actions.login(email, password);
            // Si el inicio de sesión es exitoso, navegar a la página de perfil
            navigate("/");
            // Cerrar el modal después de la redirección
            handleCloseLogin();
            window.location.reload();
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <Modal className="Modal" show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton className="ModalHeader">  </Modal.Header>
                <Modal.Body className="ModalBody p-0">

                    {/* TITULO MODAL LOGIN */}
                    <div className="ContentBody container d-flex flex-column justifycontent-center">

                        <div className="DivForm row">

                            <div className="group p-0">

                                <form className="" onSubmit={handleLogin} >
                                    <h3 className="titleR d-flex align-items-center mt-3">Iniciar sesión</h3>

                                    <div className="d-flex justifycontent-center flex-column">
                                        {/* INPUT EMAIL */}
                                        <div className="group mt-2 ">
                                            <IconMail stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister " type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} id="inputEmailLogin" aria-describedby="emailHelp" />
                                        </div>

                                        {/* INPUT PASSWORD */}
                                        <div className="group mt-3 w-100">
                                            <IconLock stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />

                                            <input className="inputSignUpandRegister" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} id="inputPasswordLogin" />
                                        </div>

                                        {/* FORGOT PASSWORD */}
                                        <div className="m-auto mt-2">
                                            <span className="text-muted small">¿Olvidaste tu{" "}<a className="txt2 col-4" href="#" style={{ textDecoration: "none" }}>contraseña</a>?</span>

                                        </div>

                                        {/* BUTTON LOGIN */}
                                        <button type="submit" className="buttonModal w-100 m-auto mt-4 ">
                                            <span className="m-auto">Iniciar sesión</span>
                                            <div className="arrow-wrapper">
                                                <div className="arrow"></div>
                                            </div>
                                        </button>

                                        {/* FORMAS DE SIGN IN */}
                                        <div className="text-center mt-3 d-flex flex-column justify-content-between">
                                            <div className="text-center mt-2 d-flex align-items-center justify-content-between">
                                                <div className="border-top flex-grow-1 mx-2"></div>
                                                <span className="mx-2 text-muted">o</span>
                                                <div className="border-top flex-grow-1 mx-2"></div>
                                            </div>


                                            {/* INICIA CON GITHUB */}

                                            <button type="submit" className=" w-100 m-auto mt-4 mb-3 btn btn-dark rounded-4">
                                                <span className="IconGithub me-2"><IconBrandGithub /></span>
                                                Inicia con GitHub
                                                <div className="arrow-wrapper">
                                                    <div className="arrow"></div>
                                                </div>
                                            </button>

                                        </div>

                                        {/* REGISTER */}
                                        <div className="text-center mt-2 mb-4 px-2">
                                            <span>¿Aún no tienes una cuenta? </span>
                                            <a className="" style={{textDecoration:"none"}} href="#" onClick={() => { handleShowRegister(); handleCloseLogin(); }} >
                                                Regístrate gratis
                                            </a>

                                        </div>



                                    </div>



                                </form>


                            </div>

                        </div>

                    </div>







                </Modal.Body>

            </Modal>
            {/* Modal de registro */}
            < ModalRegister showRegister={showRegister} handleCloseRegister={handleCloseRegister} />
        </>
    );
};
