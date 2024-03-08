import React from "react";

const ChatReceivedMessage = ({ author, date, content }) => {

    return (
        <div className="chat-message-received">
            <div className="d-flex justify-content-start">
                <div className="p-3 rounded-4">
                    <div className="d-flex justify-content-start">
                        <span className="text-muted small ms-2">{author}</span>
                        <span className="text-muted small ms-4">{date}</span>
                    </div>

                    <p className="message-received">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatReceivedMessage;
