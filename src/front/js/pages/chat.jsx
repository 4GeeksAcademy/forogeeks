import React, { useState, useEffect } from "react";

// IMPORTAR SCSS
import "../../scss/chat.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORTAR COMPONENTES
import IncomingChatMobile from "../components/Chat/IcomingChatMobile.jsx";
import IncomingChatPc from "../components/Chat/IncomingChat.jsx";
import ChatView from "../components/Chat/ChatView.jsx";

export const Chat = () => {
  // Determinar el contenido a mostrar según la resolución
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Estado para el tamaño de la pantalla
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="container mt-3">
      <div className="row">
        {isMobile ? (
          <IncomingChatMobile />
        ) : (
          <>
            <IncomingChatPc
              
            />
            <ChatView
              
            />
          </>
        )}
      </div>
    </div>
  );
};
