import React, { useState } from "react";
import { IconFilePlus } from "@tabler/icons-react";

const ChatTextBarMobile = ({ onSendMessage }) => {
  const [messageContent, setMessageContent] = useState(""); // Estado para almacenar el contenido del mensaje

  // Función para manejar el cambio en el campo de texto
  const handleChange = (event) => {
    setMessageContent(event.target.value); // Actualizar el estado del contenido del mensaje
  };

  // Función para manejar el evento de tecla presionada
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(); // Llamar a la función sendMessage cuando se presiona Enter
    }
  };

  // Función para enviar el mensaje
  const sendMessage = () => {
    if (messageContent.trim() !== "") {
      onSendMessage(messageContent); // Llamar a la función onSendMessage con el contenido del mensaje
      setMessageContent(""); // Limpiar el contenido del mensaje después de enviarlo
    }
  };

  return (
    <div className="chat-textbar-container-mobile">
      <IconFilePlus className="chat-icon-mobile" />
      <textarea
        className="chat-textbar-mobile form-control h-50"
        placeholder="Type a message..."
        value={messageContent}
        onChange={handleChange} // Manejar el cambio en el campo de texto
        onKeyPress={handleKeyPress} // Manejar el evento de tecla presionada
      ></textarea>
    </div>
  );
};

export default ChatTextBarMobile;
