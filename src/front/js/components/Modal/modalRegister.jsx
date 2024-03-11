import React, { useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../store/appContext";
import { useNavigate } from 'react-router-dom';

// Modal Login para boton de iniciar sesion
// import { ModalLogin } from "./modalLogin.jsx";


// Icons
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { IconMail } from '@tabler/icons-react';
import { IconLock } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';


export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // Gestion de errores
    const [usernameError, setUsernameError] = useState({ isError: false, message: '' });
    const [emailError, setEmailError] = useState({ isError: false, message: '' });
    const [passwordError, setPasswordError] = useState({ isError: false, message: '' });

    const navigate = useNavigate();

    //Login para Ya tienes cuenta?
    // const [showLogin, setShowLogin] = useState(false); 
    // const handleCloseLogin = () => setShowLogin(false); 
    // const handleShowLogin = () => setShowLogin(true);

    const handleSignup = async () => {
        try {
            // Reiniciar los errores antes de realizar las verificaciones
            setPasswordError({ isError: false, message: '' });
            setUsernameError({ isError: false, message: '' });
            setEmailError({ isError: false, message: '' });

            let hasError = false; // Flag para verificar si hay errores

            // Verificaciones de errores
            if (password !== confirmPassword) {
                setPasswordError({ isError: true, message: 'Las contraseñas no coinciden' });
                hasError = true; // Set the flag if there's an error
            }
            if (password.length < 6) {
                setPasswordError({ isError: true, message: 'La contraseña debe tener al menos 6 caracteres' });
                hasError = true; // Set the flag if there's an error
            }
            if (username.length < 3) {
                setUsernameError({ isError: true, message: 'El nombre de usuario debe tener al menos 3 caracteres' });
                hasError = true; // Set the flag if there's an error
            }
            if (email.length < 4 || !email.includes("@") || !email.includes(".")) {
                if (email.length < 4) setEmailError({ isError: true, message: 'El correo electrónico debe tener al menos 4 caracteres' });
                if (!email.includes("@")) setEmailError({ isError: true, message: 'El correo electrónico debe tener un @' });
                if (!email.includes(".")) setEmailError({ isError: true, message: 'El correo electrónico debe tener un .' });
                hasError = true; // Set the flag if there's an error
            }

            // Verificación de errores...
            const userExists = await actions.checkUserExists(username, email);
            if (userExists) {
                setUsernameError({ isError: true, message: 'El nombre de usuario o el correo electrónico ya están registrados' });
                return;
            }

            // Verificar si hay errores antes de continuar
            if (!hasError) {
                const response = await actions.signup(username, email, password, confirmPassword);

                // Verificar si hay un error de registro en el servidor
                if (response.error) {
                    if (response.error === 'user-exists') {
                        setUsernameError({ isError: true, message: 'El nombre de usuario ya está registrado' });
                    } else {
                        // Manejar otros errores de registro
                    }
                } else {
                    // Registro exitoso
                    actions.setModalRegistersuccess(true);
                    navigate("/");
                    handleCloseRegister();
                }
            }
        } catch (error) {
            console.error('[component.modalRegister] Error registering:\n\n', error);
        }
    };


    return (
        <>
            <Modal className="background-modal" show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header closeButton className="ModalHeader" />
                <Modal.Body className="ModalBody p-0">

                    {/* TITULO MODAL REGISTRO */}
                    <div className="ContentBody container d-flex flex-column justifycontent-center">

                        <div className="DivForm row">

                            <div className="group p-0">

                                <form className="form" >
                                    <h3 className="titleR d-flex align-items-center mt-3">Crea tu cuenta</h3>

                                    <div className="d-flex justifycontent-center flex-column">
                                        {/* INPUT USERNAME */}
                                        <div className="group mt-2 ">
                                            <IconUser stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        {usernameError.isError && <span className="small" style={{ color: "red" }}>{usernameError.message}</span>}

                                        {/* INPUT EMAIL */}
                                        <div className="group mt-3 ">
                                            <IconMail stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        {emailError.isError && <span className="small" style={{ color: "red" }}>{emailError.message}</span>}

                                        {/* INPUT PASSWORD */}
                                        <div className="group mt-3 w-100">
                                            <IconLock stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {passwordError.isError && <span className="small" style={{ color: "red" }}>{passwordError.message}</span>}


                                        {/* CONFIRM PASSWORD */}
                                        <div className="group mt-3 w-100">
                                            <IconLock stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                                            <input className="inputSignUpandRegister" type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        {passwordError.isError && <span className="small" style={{ color: "red" }}>{passwordError.message}</span>}

                                        {/* BUTTON REGISTER */}
                                        <button type="button" onClick={handleSignup} className="buttonModal w-100 m-auto mt-4" >
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

            {/* <ModalLogin showLogin={showLogin} handleCloseLogin={handleCloseLogin}></ModalLogin> */}


        </>
    );
};
