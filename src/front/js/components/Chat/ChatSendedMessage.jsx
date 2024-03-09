import React from "react";

const ChatSendedMessage = ({ author, date, content }) => {

    return (
        <div className="chat-message-sended">
            <div className="d-flex justify-content-end">
                <div className=" p-3 rounded-4">
                    <div className="d-flex justify-content-end">
                        <span className="text-muted small">{date}</span>
                        <span className="text-muted small mx-4">{author}</span>
                    </div>
                    <p className="message-sended">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatSendedMessage;
