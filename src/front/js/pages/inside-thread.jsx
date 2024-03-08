import React from "react";
import { Link } from "react-router-dom";

import { ThreadMessage } from "../components/Thread/threadMessage.jsx";
import { ThreadParentMessage } from "../components/Thread/threadParentMessage.jsx";
import { TextEditor } from "../components/TextEditor/text-editor.jsx";


// ICONOS
import { IconSquareRoundedPlus } from '@tabler/icons-react';


export const InsideThread = () => {
    const contentTest = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    const contentTest2 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 mb-4 py-1 px-3">
                        {/* ADD COMENTARIO */}
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end p-3 text-muted">
                                <span>Comentar</span>
                                <IconSquareRoundedPlus size={28} stroke={1.5} />
                            </div>
                        </div>
                        <ThreadParentMessage title="Alguien sabe como Lorem Ipsum... ?" content={contentTest} autor="Autor del hilo" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" description="Soy fan de React!" />

                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />
                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />
                        <ThreadMessage content={contentTest2} autor="@username09" date="Fecha del hilo" likes="5" profileImg="https://www.w3schools.com/howto/img_avatar.png" />

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="shadow-sm rounded-3 mb-4 py-1 px-3 bg-white pb-6">
                                <TextEditor />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


