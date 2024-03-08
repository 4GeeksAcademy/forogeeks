import React from "react";

// ICONS
import { IconHeart } from '@tabler/icons-react';
import { IconBookmark } from '@tabler/icons-react';
import { IconArrowForward } from '@tabler/icons-react';

export const ThreadParentMessage = ({ title, content, autor, description, date, likes, profileImg }) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 mb-4 py-1 px-3">
                        <div className="row align-items-center p-2">
                            {/* IMAGEN, AUTOR, DESCRIPCION, DATE */}
                            <div className="col-md-6">
                                <div className="d-flex flex-row gap-3">

                                    <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                    <div className="d-flex flex-column mb-2">
                                        <span className="m-0 p-0">{autor}</span>
                                        <span className="text-muted small p-0 m-0">{description}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center">
                                    <span className="text-muted small p-0 m-0">{date}</span>
                                </div>
                            </div>
                            <hr className="hr"></hr>
                            {/* TITULO Y CONTENIDO */}
                            <div className="col-md-12">
                                <div className="">
                                    <h4>{title}</h4>
                                    <p>{content}</p>
                                </div>
                            </div>

                            {/* LIKES, GUARDADO, RENVIAR */}
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-2 border p-1 border-1 rounded-3">
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



/*  <
div className="col-sm-6 d-flex align-items-center">
                                <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                <div className="d-flex flex-column">
                                   
                                    <h4 className="m-0 p-0">{title}</h4>
                                    <p className="m-0 p-0">{content}</p>
                                   
                                    <div>
                                        <span className="text-muted small p-0 m-0">{autor}</span>
                                        <span className="text-muted small p-0 m-0"> - {date}</span>
                                    </div>
                                </div>
                            </>
                          
                            <div className="col-sm-6 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center">
                                    <IconHeart size={20} stroke={1} />
                                    <span className="ms-2">{likes}</span>
                                </div>
                            </div> 
                            */