import React from "react";
import { IconMail, IconMessageCircle2 } from "@tabler/icons-react";

const ChatCardPc = ({ user, title, profileImg }) => {
    return (
        <div className="chat p-3 border rounded d-flex justify-content-between">
            <div>
                <div className="d-flex">
                    <img className="chat-img" src={profileImg} alt="" />
                    <h5 className="ms-1 mt-3">{title}</h5>
                </div>

                <p className="fw-bold">{user}</p>
            </div>
            <div>
                <div className="d-flex">
                    <IconMessageCircle2 className="mt-3"/>
                </div>
            </div>
        </div>
    );
};

export default ChatCardPc;
