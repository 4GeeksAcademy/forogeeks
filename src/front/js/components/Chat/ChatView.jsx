import React, { useEffect, useState } from "react";
import ChatTextBar from "./ChatTextBar.jsx";
import ChatSendedMessage from "./ChatSendedMessage.jsx";
import ChatTextBarIcons from "./ChatTextBarIcons.jsx";
import io from "socket.io-client";

const ChatView = () => {
  const [receivedMessages, setReceivedMessages] = useState([]); // Estado para almacenar los mensajes recibidos
  const [sentMessages, setSentMessages] = useState([]); // Estado para almacenar los mensajes enviados
  const [socket, setSocket] = useState(null); // Estado para almacenar el socket

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); 
    newSocket.on('message', (message) => {
      // Manejar los mensajes recibidos
      console.log('Received message:', message);
    });
    setSocket(newSocket); // Actualizar el estado del socket

    return () => {
      newSocket.close(); // Cerrar el socket cuando el componente se desmonte
    };
  }, []);

  const author = "Me " + new Date().toLocaleTimeString();
  // Función para enviar un mensaje
  const sendMessage = (messageContent) => {
    if (messageContent.trim() !== "") {
      const message = {
        author: author,
        date: new Date().toLocaleTimeString(),
        content: messageContent.trim()
      };

      // Enviar el mensaje al backend
      fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          // Actualizar el estado de los mensajes enviados
          setSentMessages(prevMessages => [...prevMessages, message]);
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
    }
  };


  return (
    <div className="col-md-8">
      <div className="shadow rounded-4 p-3 mb-2 chat-container d-flex flex-column position-relative">
        <div className="chat-title p-4">
          <h2>Necesito ayuda</h2>
        </div>

        <div className="chat-container-messages overflow-auto">
          {/* Renderizar los mensajes enviados */}
          {sentMessages.map((message, index) => (
            <ChatSendedMessage
              key={index}
              author={message.author}
              date={message.date}
              content={message.content}
            />
          ))}

          {/* Renderizar los mensajes recibidos */}
          {receivedMessages.map((message, index) => (
            <div key={index}>
              {/* Renderizar los mensajes recibidos aquí */}
              {/* Por ejemplo: */}
              {/* <div>{message.author}: {message.content}</div> */}
            </div>
          ))}

          {/* Componentes para la barra de texto y los iconos */}
          <ChatTextBarIcons />
          <ChatTextBar sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
