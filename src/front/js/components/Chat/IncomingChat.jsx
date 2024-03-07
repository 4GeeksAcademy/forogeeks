import React from "react";
import ChatCardPc from "./ChatCardPc.jsx";

const IncomingChatPc = () => {
    const incomingChats = [{ title: "Necesito ayuda", user: "@manuel22", profileImg: "https://www.w3schools.com/howto/img_avatar.png" }];

    return (
        <div className="col-md-4 mb-3 mb-md-0 d-flex">
            <div className="shadow rounded-4 mb-4 p-3 w-100 chat-container-card">
                {incomingChats.map((chat, index) => {
                    return (
                        <ChatCardPc key={index} title={chat.title} user={chat.user} profileImg={chat.profileImg} />
                    )
                })}
            </div>
        </div>
    );
};

export default IncomingChatPc;
