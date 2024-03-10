import React, { useState, useContext } from "react";
import { ModalRegister } from "./modalRegister.jsx";
import { Context } from "../../store/appContext";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate de React Router

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

    const handleLogout = () => {
        // Llamar a la función de logout desde las acciones
        actions.logout();
        // Cerrar el modal de inicio de sesión
        handleCloseLogin();
    };

    return (
        <>
            <Modal className="Modal col-sm" show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton className="ModalHeader"> </Modal.Header>
                <Modal.Body className="ModalBody col-sm col-md">
                    <div className="ContentBody m-auto p-5 col-sm col-md">
                        <div className="ContentBody d-flex m-auto col-sm col-md">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="DivForm m-auto col-sm col-md">
                            <form onSubmit={handleLogin} className="Form m-auto">
                                <div className="group mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                                        <path d="M3 7l9 6l9 -6" />
                                    </svg>
                                    <input className="inputSignUpandRegister form-control" type="email" placeholder="user123@gmail.com" onChange={(e) => setEmail(e.target.value)} id="inputEmailLogin" aria-describedby="emailHelp" />
                                </div>
                                <div className="group mt-4">
                                    <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                                    </svg>
                                    <input className="inputSignUpandRegister" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} id="inputPasswordLogin" />
                                </div>
                                <div className="forget p-t-12 mt-5">
                                    <span className="txt1 col-1"> Did you forget your &nbsp; <a className="txt2 col-4" href="#"> Username and Password?</a> </span>
                                </div>
                                <div className="text-center p-t-136 mt-2 d-flex flex-column justify-content-between">
                                    <span>or continue with </span>
                                    <a className="txt2" href="#">
                                        <div className="IconsModalLogin d-flex justify-content-between p-3">
                                            <span className="IconGoogle"><IconBrandGoogle className="Google m-auto" /></span>
                                            <span className="IconGithub"><IconBrandGithub /></span>
                                            <span className="IconFacebook"><IconBrandFacebook /></span>
                                        </div>
                                    </a>
                                </div>
                                <div className="text-center p-t-136 mt-2.3">
                                    <span>Don`t have an account yet? </span>
                                    <a className="txt2" href="#" onClick={() => { handleShowRegister(); handleCloseLogin(); }} >
                                        Register for free
                                    </a>
                                </div>
                                <button type="submit" className="ButtonModal m-auto mt-5">
                                    <span className="m-auto">Sign up</span>
                                    <div className="arrow-wrapper">
                                        <div className="arrow"></div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* Botón para cerrar sesión */}

                    <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>

                </Modal.Footer>
            </Modal>
            {/* Modal de registro */}
            < ModalRegister showRegister={showRegister} handleCloseRegister={handleCloseRegister} />
        </>
    );
};
