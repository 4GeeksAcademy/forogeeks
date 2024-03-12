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
    const thread = store.threads; // Detalles del hilo padre
    const comments = store.threadComments; // Comentarios del hilo
    const content = store.textEditorContent; // Contenido del comentario que se esta escribiendo
    const userInfo = store.userInfo; // Informacion del usuario loggeado para comentar

    const reason = "Hilo reportado";

    const handleCreateComment = (e) => {
        e.preventDefault();
        actions.createNewComment(content, thread.id, userInfo.id).then(() => {
            actions.getCommentsByThread(id);

        })
    }


    const handleReportThread = (e) => {
        e.preventDefault();
        actions.reportThread(thread.id, userInfo.id, reason);
        console.log("handleReportThread" + thread.id, userInfo.id, reason)
    }

    useEffect(() => {
        if (store.isUserLogged) {
            actions.getUserInfo(); // Sirve para dar luego info al crear un comentario
        }
        actions.getThreadById(id); // Se agrega a store.thread el hilo con el id que se pasa por parametro
        actions.getCommentsByThread(id);
        // console.log("id del hilo: ", id);
    }, []);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className=" rounded-3 mb-4 py-1 px-2">
                        {/* ADD COMENTARIO */}
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end text-muted pt-2">
                                {store.isUserLogged ? (
                                    <div className="d-flex gap-3">
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
                                    <span className="text-muted small">Inicia sesión para poder comentar</span>
                                )}
                            </div>
                        </div>
                        {/* TITULO DEL HILO */}
                        <div className="d-flex align-items-center py-3">
                            <h3 className="d-flex align-items-center text-align-center">{thread.title}</h3>
                        </div>

                        {/* HILO */}

                        <div className="d-flex flex-column gap-1">
                            <ThreadParentMessage autor={thread?.user?.user_name} content={thread.content} date={thread.date} description={thread.description} user_profile_picture={thread?.user?.profile_picture} />

                            {/* COMENTARIOS */}
                            {comments.map((comment, index) => {
                                return (
                                    // Falta agregar likes en DB
                                    <ThreadMessage key={index} id={comment.id} autor_id={comment.user_id} content={comment.content} date={comment.date} profileImg={comment.profile_picture} />
                                )
                            }
                            )}
                        </div>


                        {store.isUserLogged &&
                            <div className="col-md-12">
                                <div className="bg-white">

                                    <form id="comentar" className="">
                                        <TextEditor />
                                        <div className="d-flex justify-content-end">
                                            <button onClick={handleCreateComment} type="submit" className="btn btn-primary text-white rounded-5">Comentar</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


