import React from "react";
import { IconFilePlus, IconCode, IconLetterA, IconLink, IconSend } from "@tabler/icons-react";

const ChatTextBarIcons = () => {
  return (
    <div className="chat-icons d-flex justify-content-between align-items-center">
      <div>
        <IconFilePlus className="chat-icon" />
        <IconCode className="chat-icon ms-2" />
        <IconLetterA className="chat-icon ms-2" />
        <IconLink className="chat-icon ms-2" />
      </div>
      <div>
        <IconSend className="chat-icon ms-2" />
      </div>
    </div>
  );
};

export default ChatTextBarIcons;
