import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { ThreadMessage } from "../components/Thread/threadMessage.jsx";
import { ThreadParentMessage } from "../components/Thread/threadParentMessage.jsx";
import { TextEditor } from "../components/TextEditor/text-editor.jsx";

// ICONS
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { IconFlag } from '@tabler/icons-react';

export const InsideThread = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const thread = store.threads
    const comments = store.threadComments
    const content = store.textEditorContent;
    const userInfo = store.userInfo;

    const reason = "Hilo reportado";


    const handleCreateComment = (e) => {
        e.preventDefault();
        actions.createNewComment(content, thread.id, userInfo.id);
    }

    const handleReportThread = (e) => {
        e.preventDefault();
        actions.reportThread(thread.id, userInfo.id, reason);
        console.log("handleReportThread" + thread.id, userInfo.id, reason)
    }

    useEffect(() => {
        actions.getUserInfo()
        actions.getThreadById(id);
        console.log("id del hilo: ", id);
        actions.getCommentsByThread(id);
    }, []);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 mb-4 py-1 px-3 bg-white">
                        {/* ADD COMENTARIO */}
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end p-3 text-muted">
                                {store.isUserLogged ? (
                                    <div className="d-flex gap-2">
                                        <a onClick={handleReportThread} className="d-flex align-items-center text-muted" href="#comentar" style={{ textDecoration: "none", color: "currentColor" }} >
                                            <IconFlag size={20} stroke={1.5} style={{ transition: "color 0.3s" }} />
                                            <span>Reportar</span>
                                        </a>
                                        <a className="d-flex align-items-center text-muted" href="#comentar" style={{ textDecoration: "none", color: "currentColor" }}>
                                            <IconSquareRoundedPlus size={20} stroke={1.5} />
                                            <span>Comentar</span>
                                        </a>
                                    </div>
                                ) : (
                                    <span>Tienes que iniciar sesión para poder comentar</span>
                                )}
                            </div>
                        </div>
                        {/* HILO */}
                        <ThreadParentMessage autor={thread?.user?.user_name} title={thread.title} content={thread.content} date={thread.date} profile_picture={thread.profile_picture} description={thread.description} />

                        <ThreadMessage id={id} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar" />
                        <ThreadMessage autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar" />
                        <ThreadMessage autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar" />

                        {store.isUserLogged &&
                            <div className="col-md-12">
                                <form id="comentar">
                                    <TextEditor />
                                    <button onClick={handleCreateComment} type="submit" className="btn btn-primary">Comment</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


