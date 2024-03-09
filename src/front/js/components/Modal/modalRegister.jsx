import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../store/appContext";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate desde React Router

export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { actions } = useContext(Context); // Obtener el contexto y las acciones
    const navigate = useNavigate(); // Obtener la función navigate para redirigir

    // Función para manejar el envío del formulario de registro
    const handleSignup = async () => {
        try {
            // Llamar a la acción signup con los datos del formulario
            await actions.signup(username, email, password);
            // Redirigir a la página de perfil después de registrar exitosamente
            navigate('/profile');
            // Cerrar el modal después de la redirección
            handleCloseRegister();
        } catch (error) {
            // Manejar cualquier error de registro aquí
            console.error('Error registering:', error);
        }
    };

    return (
        <Modal show={showRegister} onHide={handleCloseRegister}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="ModalBody m-auto">
                <div className="m-auto">
                    <form className="form">
                        <p className="title">Register </p>
                        <div className="flex">
                            <label>
                                <input required="" placeholder="" type="text" name="username" className="input" onChange={ev => setUsername(ev.target.value)} />
                                <span>Username</span>
                            </label>
                            <label>
                                <input required="" placeholder="" type="email" name="email" className="input" onChange={ev => setEmail(ev.target.value)} />
                                <span>Email</span>
                            </label>
                        </div>
                        <label>
                            <input required="" placeholder="" type="password" name="password" className="input" onChange={ev => setPassword(ev.target.value)} />
                            <span>Password</span>
                        </label>
                        <button className="submit" onClick={handleSignup}>Submit</button>
                        <p className="signin">Already have an account? <a href="#">Sign in</a> </p>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRegister}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
