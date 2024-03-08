import React from "react";

const ChatSendedMessageMobile = ({ author, date, content }) => {

    return (
        <div className="chat-message-sended-mobile">
            <div className="d-flex justify-content-end">
                <div className=" p-3 rounded-4 ">
                    <div className="d-flex">
                        <span className="text-muted small">{date}</span>
                        <span className="text-muted small mx-4">{author}</span>
                    </div>
                    <p className="message-sended-mobile">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatSendedMessageMobile;
