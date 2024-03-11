import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import moment from "moment";

//ICONS
import { IconMessage } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessages } from "@tabler/icons-react";

const TrendingThreads = ({ title,  number_of_comments, date, category, id }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Link to={`/threads/${category}/${id}`} style={{ textDecoration: "none", color: "currentColor" }}>
                        {/* TITULO */}
                        <div className="shadow-sm rounded-3 mb-4 py-1 px-3 h-75">
                            <div className="d-flex align-items-center justify-content-between">
                                {/* Icono */}
                                <div className="d-flex align-items-center">
                                    <IconMessage size={18} stroke={1.5} color="#007bff" />
                                    <hr className="vr mx-3"></hr>
                                    <div>
                                        {/* TITULO DEL HILO */}
                                        <p className="m-0 p-0" style={{ fontSize: '13px' }}>{title}</p>
                                        {/* NOMBRE DE USUARIO Y FECHA */}
                                        <div className="d-flex gap-2">
                                            <span className="text-muted small p-0 m-0" style={{ fontSize: '12px' }}>{moment(date).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Número de comentarios */}
                                <div className="d-flex align-items-center">
                                    <IconMessages size={20} stroke={1} />
                                    <span className="ms-2">{number_of_comments}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrendingThreads;
