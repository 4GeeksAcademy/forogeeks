import React from "react";
import ChatReceivedMessageMobile from "./ChatReceivedMessageMobile.jsx";
import ChatSendedMessageMobile from "./ChatSendedMessageMobile.jsx";
import ChatTextBarMobile from "./ChatTextBarMobile.jsx";
const ChatViewMobile = () => {
    return (
        <div className="chat-mobile-container shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column">
            <h1 className="p-3">Hola</h1>
            <div className="chat-container-messages-mobile overflow-auto">
                <div className="chat-container-card-mobile overflow-auto">
                    <ChatReceivedMessageMobile
                        author="@manuel22"
                        date="12:00"
                        content="Hola, necesito ayuda"
                    />
                    <ChatSendedMessageMobile
                        author="@javier_lol"
                        date="12:00"
                        content="Dime"
                    />
                    <ChatSendedMessageMobile
                        author="@javier_lol"
                        date="12:00"
                        content="¿Que sucede?"
                    />
                    <ChatReceivedMessageMobile
                        author="@manuel22"
                        date="12:00"
                        content="No puedo hacer login"
                    />
                    <ChatSendedMessageMobile
                        author="@javier_lol"
                        date="12:00"
                        content="Prueba a cambiar la contraseña"
                    />
                    <ChatReceivedMessageMobile
                        author="@manuel22"
                        date="12:00"
                        content="Okey gracias"
                    />
                </div>
                <ChatTextBarMobile />
            </div>
        </div>
    );
};

export default ChatViewMobile;
