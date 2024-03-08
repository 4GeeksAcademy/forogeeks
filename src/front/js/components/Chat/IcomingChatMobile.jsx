import React, { useState } from "react";
import ChatCardMobile from "./ChatCardMobile.jsx";
import ChatViewMobile from "./ChatViewMobile.jsx";
import { Link } from "react-router-dom";
const cardMobile = [{ profileImg: "https://www.w3schools.com/howto/img_avatar.png", title: "Necesito ayuda", user: "@manuel22", messages: "12" }];
const IncomingChatMobile = () => {


  return (
    <div className="chat-mobile-container shadow rounded-4 p-3 mb-2 profile-container d-flex flex-column">
      <h1 className="p-3">Mensajes</h1>
      <div className="chat-container-card-mobile overflow-auto">
        {cardMobile.map((card, index) => {
          return (
            <Link to="/chat-view-mobile" key={index}>
            <ChatCardMobile
              key={index}
              profileImg={card.profileImg}
              title={card.title}
              user={card.user}
              messages={card.messages}
            /></Link>
          );
        })}
      </div>
    </div>
  );
};

export default IncomingChatMobile;
