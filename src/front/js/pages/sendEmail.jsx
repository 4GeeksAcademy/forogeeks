import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const SendEmail = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        actions.sendPasswordResetEmail(email, alert);
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="shadow-sm rounded-3 mb-4 py-4 px-3 bg-white">
                        <h1 className="text-center mb-4">Recuperar contraseña</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <h1 className="text-center mb-4 small">Escribe tu email para acceder a la recuperación de tu contraseña.</h1>
                                <label htmlFor="currentEmail" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="currentEmail"
                                    name="currentEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado local cuando el usuario escribe en el campo de entrada
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary text-white">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
