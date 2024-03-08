import React from "react";
import { IconFilePlus } from "@tabler/icons-react";
const ChatTextBarMobile = () => {

    return (
        <div className="chat-textbar-container-mobile">
            <IconFilePlus className="chat-icon-mobile" />
          <textarea
            className="chat-textbar-mobile form-control"
            rows="1"
          ></textarea>
        </div>
    );
};

export default ChatTextBarMobile;
