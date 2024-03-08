import React, { useState } from "react";

const ChatTextBar = ({ sendMessage }) => {
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje

  // Función para manejar el cambio en el campo de texto
  const handleChange = (event) => {
    setMessage(event.target.value); // Actualizar el estado del mensaje
  };

  // Función para enviar el mensaje al presionar Enter o al hacer clic en el botón de enviar
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message.trim()); // Llamar a la función sendMessage con el contenido del mensaje
      setMessage(""); // Limpiar el campo de texto después de enviar el mensaje
    }
  };

  // Función para manejar el evento de tecla presionada
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(); // Llamar a la función handleSendMessage cuando se presiona Enter
    }
  };

  return (
    <div className="chat-textbar-container">
      <textarea
        className="chat-textbar form-control"
        rows="3"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange} // Manejar el cambio en el campo de texto
        onKeyPress={handleKeyPress} // Manejar el evento de tecla presionada
        style={{ appearance: "none" }} // Ocultar las flechas de incremento y decremento
      ></textarea>
    </div>
  );
};

export default ChatTextBar;
