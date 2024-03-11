import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

import { ThreadMessage } from "../components/Thread/threadMessage.jsx";
import { ThreadParentMessage } from "../components/Thread/threadParentMessage.jsx";
import { TextEditor } from "../components/TextEditor/text-editor.jsx";

// ICONS
import { IconSquareRoundedPlus } from '@tabler/icons-react';

export const InsideThread = () => {
    const { store, actions } = useContext(Context);
    const contentTest = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    const contentTest2 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("comentario enviado", store.textEditorStore);
    }



    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 mb-4 py-1 px-3 bg-white">
                        {/* ADD COMENTARIO */}
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end p-3 text-muted">
                                <a className="d-flex align-items-center text-muted" href="#comentar" style={{ textDecoration: "none", color: "currentColor" }}>
                                    <IconSquareRoundedPlus size={20} stroke={1.5} />
                                    <span href="comentar">Comentar</span>
                                </a>
                            </div>
                        </div>
                        <ThreadParentMessage title="Alguien sabe como Lorem Ipsum... ?" content={contentTest} autor="Autor del hilo" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" description="Soy fan de React!" />

                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />
                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />
                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />

                        <div className="col-md-12">
                            <form onSubmit={handleSubmit} id="comentar">
                                <TextEditor />
                                <button type="submit" className="btn btn-primary">Comment</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}


