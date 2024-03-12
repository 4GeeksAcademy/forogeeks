import React from 'react';
import { useEffect, useState, useContext } from "react";
import {Context} from "../../store/appContext";
import moment from "moment"

// ICONS
import { IconHeart } from '@tabler/icons-react';
import { IconArrowForward } from '@tabler/icons-react';


export const ThreadMessage = ({ content, autor_id, date }) => {
    const {store, actions} = useContext(Context);
    const user_name = store.user_name;
    const user_profile_image = store.user_profile_image;

    useEffect(() => {
        // autor es el id del usuario que escribio el mensaje
        actions.getUserNameById(autor_id).then((res)=>{
            console.log("Nombre de usuario: ", res);

        })
        actions.getUserProfileImageById(autor_id).then((res) => {
            // console.log("IMAGEN DE USUARIO: ", user_profile_image);
        })
        console.log("Id de usuario: ", autor_id)
        console.log("Username: ", user_name)
        console.log("IMAGEN DE USUARIO: ", user_profile_image)
    }, []);
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 p-0">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 py-1 px-3 bg-white">
                        <div className="row align-items-center py-2">

                            <div className='d-flex justify-content-between mb-3'>
                                {/* USERNAME */}
                                <div className="">
                                    <div className="d-flex flex-row gap-3 align-items-center">
                                        <img src={user_profile_image} alt="profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                        <div className="d-flex flex-column">
                                            <span className="m-0 p-0 d-flex align-items-center fw-bold text-primary">{"@" + user_name}</span>
                                            <span className="text-muted small p-0 m-0" >Estoy usando ForoGeeks</span>
                                        </div>
                                    </div>
                                </div>
                                {/* DATE */}
                                <div className="">
                                    <div className='d-flex justify-content-end'>
                                        <span className="text-muted small p-0 m-0" style={{fontSize:"12.25px"}}>{moment(date).fromNow()}</span>
                                    </div>
                                </div>

                            </div>

                            {/* DIVIDIER */}
                            <hr className="hr" style={{opacity:"10%"}}></hr>

                            {/* CONTENT */}
                            <div className="col-md-12">
                                <div className="">
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-1">
                                    <span className="text-muted small">12</span>
                                    <IconHeart size={20} stroke={1} />
                                </div>
                                <div className="d-flex align-items-center gap-3">
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