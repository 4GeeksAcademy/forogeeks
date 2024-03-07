import React from "react";
import { IconFilePlus, IconCode, IconLetterA, IconLink, IconSend } from "@tabler/icons-react";

const ChatView = ({ showEmail, showPassword }) => {
  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString();
  };

  return (
    <div className="col-md-8">
      {/* Contenedor de configuración del perfil en versión de escritorio */}
      <div className="shadow rounded-4 p-3 mb-2 chat-container d-flex flex-column position-relative">
        <div className="chat-title p-4">
          <h2>Necesito ayuda</h2>
        </div>
        <div className="chat-message-sended">
          <div className="d-flex justify-content-end">
            <div className="message-sended p-3 rounded-4">
            <div className="d-flex justify-content-between">
                <h5 className="chat-username-text">@javier_lol</h5>
                <p className="chat-small-date">{getCurrentDateTime()}</p>
              </div>
              <p>
                Hola, necesito ayuda con el registro de mi cuenta. No puedo
                ingresar.
              </p>
            </div>
          </div>
        </div>
        <div className="chat-message-received">
          <div className="d-flex justify-content-start">
            <div className="message-received p-3 rounded-4">
              <div className="d-flex justify-content-between">
                <h5 className="chat-username-text">@manuel22</h5>
                <p className="chat-small-date">{getCurrentDateTime()}</p>
              </div>

              <p>
                Hola, ¿cómo estás? ¿Puedo ayudarte con algo?
              </p>
            </div>
          </div>
        </div>
        <div className="chat-textbar-icons mb-2 d-flex justify-content-between">
          <div className="d-flex">
            <IconFilePlus className="chat-icon" />
            <IconCode className="chat-icon ms-2" />
            <IconLetterA className="chat-icon ms-2" />
            <IconLink className="chat-icon ms-2" />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-auto">
          <IconSend className="chat-icon-send ms-2" />
        </div>
        <div className="chat-textbar-container">
          <textarea
            className="chat-textbar form-control"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
