import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const SendEmail = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await actions.sendForgotPasswordEmail(email, setAlertMessage, setAlertType);
    
            if (data && data.status === 200) {
                setAlertMessage("Comprueba tu email para restablecer la contraseña.");
                setAlertType("success");
            } 
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            setAlertMessage("Error al enviar la solicitud. Comprueba que el email es correcto.");
            setAlertType("danger");
        }
    };
    

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="shadow-sm rounded-3 mb-4 py-4 px-3 bg-white">
                        <h1 className="text-center mb-4">Recuperar contraseña</h1>
                        {alertMessage && (
                            <div className={`alert alert-${alertType}`} role="alert">
                                {alertMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <h1 className="text-center mb-4 small">Escribe tu email para acceder a la recuperación de tu contraseña.</h1>
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
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
