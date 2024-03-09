import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Context } from "../../store/appContext";

export const ModalLogin = ({ showLogin, handleCloseLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context); // Obtener el contexto y las acciones

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        // Llamar a la acción login con los datos del formulario
        actions.login(email, password);
    };

    return (
        <>
            <Modal className="Modal col-sm" show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton className="ModalHeader">
                </Modal.Header>
                <Modal.Body className="ModalBody col-sm col-md">
                    <div className="ContentBody m-auto p-5 col-sm col-md">
                        <div className="TOP d-flex m-auto">
                            <h3>Sign In</h3>
                        </div>
                        <div className="m-auto">
                            <form id="loginForm" className="login100-form validate-form m-auto">
                                <div className="group mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2v-10"></path>
                                        <path d="M3 7l9 6l9 -6"></path>
                                    </svg>
                                    <input className="input" type="text" name="email" placeholder="user123@gmail.com"  onChange={ev => setEmail(ev.target.value)}/>
                                </div>
                                <div className="group mt-4">
                                    <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                                    </svg>
                                    <input className="input" type="password" name="password" placeholder="password" onChange={ev => setPassword(ev.target.value)}/>
                                </div>
                                <div className="text-center p-t-136 mt-2 d-flex flex-column justify-content-between">
                                    <span>or continue with </span>
                                    <a className="txt2" href="#">
                                        <div className="IconsModalLogin d-flex justify-content-between p-3">
                                            <span className="IconGoogle"><IconBrandGoogle className="Google m-auto" /></span>
                                            <span><IconBrandGithub /></span>
                                            <span><IconBrandFacebook /></span>
                                        </div>
                                    </a>
                                </div>
                                <div className="text-center p-t-136 mt-2.3">
                                    <span>Don't have an account yet? </span>
                                    <a className="txt2" href="#" onClick={handleCloseLogin} >
                                        Register for free
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter" bg-light>
                    <Button className="Signup m-auto" onClick={handleLogin}>
                        <span className="m-auto">Sign in</span>
                        <div className="arrow-wrapper">
                            <div className="arrow"></div>
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
