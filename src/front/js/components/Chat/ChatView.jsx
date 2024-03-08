import React from "react";
import { IconFilePlus, IconCode, IconLetterA, IconLink, IconSend } from "@tabler/icons-react";
import ChatReceivedMessage from "./ChatReceivedMessage.jsx";
import ChatSendedMessage from "./ChatSendedMessage.jsx";
import ChatTextBarIcons from "./ChatTextBarIcons.jsx";
import ChatTextBar from "./ChatTextBar.jsx";

const receivedMessage = [{ author: "@manuel22", date: "12:53:16 PM", content: "Hola, ¿cómo estás? ¿Puedo ayudarte con algo?" }];
const sendedMessage = [{ author: "@javier_lol", date: "4:31:16 AM", content: "Hola, necesito ayuda con mi cuenta" }];

const ChatView = () => {

  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 chat-container d-flex flex-column position-relative">
        <div className="chat-title p-4">
          <h2>Necesito ayuda</h2>
        </div>

        <div className="chat-container-messages overflow-auto"> {/* Agregar clase overflow-auto */}
          {sendedMessage.map((message, index) => {
            return (
              <ChatSendedMessage
                key={index}
                author={message.author}
                date={message.date}
                content={message.content}
              />
            );
          })}
          {receivedMessage.map((message, index) => {
            return (
              <ChatReceivedMessage
                key={index}
                author={message.author}
                date={message.date}
                content={message.content}
              />
            );
          })}
          {sendedMessage.map((message, index) => {
            return (
              <ChatSendedMessage
                key={index}
                author={message.author}
                date={message.date}
                content={message.content}
              />
            );
          })}
          {sendedMessage.map((message, index) => {
            return (
              <ChatSendedMessage
                key={index}
                author={message.author}
                date={message.date}
                content={message.content}
              />
            );
          })}
          {receivedMessage.map((message, index) => {
            return (
              <ChatReceivedMessage
                key={index}
                author={message.author}
                date={message.date}
                content={message.content}
              />
            );
          })}
        </div>

        <ChatTextBarIcons />
        <ChatTextBar />
      </div>
    </div>
  );
};

export default ChatView;
