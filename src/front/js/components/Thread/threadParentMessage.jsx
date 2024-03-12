import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import moment from "moment";

// ICONS
import { IconHeart } from '@tabler/icons-react';
import { IconBookmark } from '@tabler/icons-react';
import { IconArrowForward } from '@tabler/icons-react';

export const ThreadParentMessage = ({ autor, content, date, user_profile_picture, description, title }) => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    // }, []);

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 px-3 border-start border-primary border-5 bg-white">
                        <div className="row align-items-center py-3 ">
                            <div className="d-flex justify-content-between mb-3">


                                {/* IMAGEN, AUTOR, DESCRIPCION, DATE */}
                                <div className="">
                                    <div className="d-flex flex-row gap-3 ">

                                        <img src={user_profile_picture} alt="profile" className="rounded-circle" style={{ width: "50px", height: "50px" }} />

                                        <div className="d-flex flex-column">
                                            <span className="m-0 p-0 d-flex align-items-center fw-bold text-primary">{"@" + autor}</span>
                                            <span className="text-muted small p-0 m-0">{description ? description : "Estoy usando ForoGeeks"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* DATE */}
                                <div className="text-muted small">
                                    <div className="d-flex align-items-center">
                                        <span className="text-muted small p-0 m-0">{moment(date).fromNow()}</span>
                                    </div>
                                </div>

                            </div>

                            {/* DIVIDIER */}
                            <hr className="hr" style={{opacity:"10%"}}></hr>

                            {/* TITULO Y CONTENIDO */}
                            <div className="col-md-12">
                                <div className="">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </div>

                            {/* LIKES, GUARDADO, RENVIAR */}
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-1">
                                    <span className="text-muted small">13</span>
                                    <IconHeart size={20} stroke={1} />
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <IconBookmark size={20} stroke={1} />
                                    <IconArrowForward size={20} stroke={1} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
