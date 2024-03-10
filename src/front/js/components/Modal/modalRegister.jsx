import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../store/appContext";
import { useNavigate } from 'react-router-dom';
import { ModalLogin } from "./modalLogin.jsx";


// Icons
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { IconMail } from '@tabler/icons-react';
import { IconLock } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';

export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    //Login para Ya tienes cuenta?
	const [showLogin, setShowLogin] = useState(false); 
	const handleCloseLogin = () => setShowLogin(false); 
	const handleShowLogin = () => setShowLogin(true);

    const handleSignup = async () => {
        try {
            await actions.signup(username, email, password);
            actions.setModalRegistersuccess(true); // Cambiar el estado a true para mostrar el modal de éxito
            navigate('/'); // Navegar a la página de inicio después de actualizar el estado
        } catch (error) {
            console.error('Error registering:', error);
        }
    };
    return (
        <>
            <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header closeButton className="ModalHeader" />
                <Modal.Body className="ModalBody p-0">

                    {/* TITULO MODAL REGISTRO */}
                    <div className="ContentBody container d-flex flex-column justifycontent-center">

                        <div className="DivForm row">

                            <div className="group p-0">

                                <form className="form" onSubmit={handleSignup}>
                                    <h3 className="titleR d-flex align-items-center mt-3">Crea tu cuenta</h3>

                                    <div className="d-flex justifycontent-center flex-column">
                                        {/* INPUT USERNAME */}
                                        <div className="group mt-2 ">
                                            <IconUser stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
                                        </div>

                                        {/* INPUT EMAIL */}
                                        <div className="group mt-3 ">
                                            <IconMail stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        {/* INPUT PASSWORD */}
                                        <div className="group mt-3 w-100">
                                            <IconLock stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />

                                            <input className="inputSignUpandRegister" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        </div>

                                        {/* CONFIRM PASSWORD */}
                                        <div className="group mt-3 w-100">
                                            <IconLock stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>

                                        {/* BUTTON REGISTER */}
                                        <button type="submit" className="buttonModal w-100 m-auto mt-4">
                                            <span className="m-auto">Registrarse</span>
                                            <div className="arrow-wrapper">
                                                <div className="arrow"></div>
                                            </div>
                                        </button>

                                        {/* INICIA CON GITHUB */}
                                        <div className="text-center mt-3 d-flex flex-column justify-content-between">
                                            <div className="text-center mt-2 d-flex align-items-center justify-content-between">
                                                <div className="border-top flex-grow-1 mx-2"></div>
                                                <span className="mx-2 text-muted">o</span>
                                                <div className="border-top flex-grow-1 mx-2"></div>
                                            </div>

                                            <button type="submit" className="w-100 m-auto mt-4 mb-3 btn btn-dark rounded-4">
                                                <span className="IconGithub me-2"><IconBrandGithub /></span>
                                                Inicia con GitHub
                                                <div className="arrow-wrapper">
                                                    <div className="arrow"></div>
                                                </div>
                                            </button>
                                        </div>

                                        {/* SIGN IN LINK */}
                                        <div className="text-center mt-2 mb-4">
                                            <span>¿Ya tienes una cuenta? </span>
                                            <a className="" style={{ textDecoration: "none" }} href="#" onClick={() => { handleShowLogin(); handleCloseRegister(); }} >
                                                Iniciar sesión
                                            </a>
                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </Modal.Body>
            </Modal>

            <ModalLogin showLogin={showLogin} handleCloseLogin={handleCloseLogin}></ModalLogin>


        </>
    );
};
