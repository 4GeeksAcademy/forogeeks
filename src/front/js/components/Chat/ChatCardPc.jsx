import React from "react";
import { IconMail, IconMessageCircle2 } from "@tabler/icons-react";

const ChatCardPc = ({ user, title, profileImg, messages }) => {
    return (
        <div className="chat-card-pc p-3 border rounded d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img className="chat-img-pc" src={profileImg} alt="" />
          <div className="ms-2 mt-3">
            <h6>{title}</h6>
            <p className="text-muted small">{user}</p>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <IconMessageCircle2 size={20} className="mt-3" />
            <p>{messages}</p>
          </div>
        </div>
      </div>
    );
};

export default ChatCardPc;
