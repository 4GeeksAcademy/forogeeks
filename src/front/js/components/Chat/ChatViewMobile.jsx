import React, { useState } from "react";
import ChatSendedMessageMobile from "./ChatSendedMessageMobile.jsx";
import ChatTextBarMobile from "./ChatTextBarMobile.jsx";

const ChatViewMobile = () => {
    const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes

    // Función para enviar un mensaje
    const handleSendMessage = (messageContent) => {
        const newMessage = {
            author: "Me",
            date: new Date().toLocaleTimeString(),
            content: messageContent.trim(),
            sent: true
        };

        // Agregar el nuevo mensaje al estado de los mensajes
        setMessages([...messages, newMessage]);

        // Aquí puedes agregar la lógica para enviar el mensaje al backend si es necesario
    };

    return (
        <div className="chat-mobile-container shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column">
            <h1 className="p-3">Hola</h1>
            <div className="chat-container-messages-mobile overflow-auto">
                <div className="chat-container-card-mobile overflow-auto">
                    {/* Renderizar los mensajes enviados */}
                    {messages.map((message, index) => {
                        if (message.sent) {
                            return (
                                <ChatSendedMessageMobile
                                    key={index}
                                    author={message.author}
                                    date={message.date}
                                    content={message.content}
                                />
                            );
                        }
                    })}
                </div>
                {/* Componente para la barra de texto móvil */}
                <ChatTextBarMobile onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatViewMobile;
