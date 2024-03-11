import React, { useState } from "react";
import { IconFilePlus } from "@tabler/icons-react";

const ChatTextBarMobile = () => {

  return (
    <div className="chat-textbar-container-mobile">
      <IconFilePlus className="chat-icon-mobile" />
      <textarea
        className="chat-textbar-mobile form-control h-50"
        placeholder="Type a message..."
      ></textarea>
    </div>
  );
};

export default ChatTextBarMobile;
