import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../store/appContext";
import { useNavigate } from 'react-router-dom';
import SuccessModal from "./ModalRegisterSuccessFull.jsx";

export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    const {store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

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
                <Modal.Header closeButton />
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
                            <button type="button" className="submit" onClick={() => { handleSignup();handleCloseRegister(); }}>Submit</button>
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

            {/* Pasar las props al componente SuccessModal */}
        </>
    );
};
