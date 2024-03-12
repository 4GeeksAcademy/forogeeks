import React, { useState } from "react";

const ChatTextBar = () => {


  return (
    <div className="chat-textbar-container">
      <textarea
        className="chat-textbar form-control"
        rows="3"
        placeholder="Type a message..."
        style={{ appearance: "none" }} // Ocultar las flechas de incremento y decremento
      ></textarea>
    </div>
  );
};

export default ChatTextBar;
