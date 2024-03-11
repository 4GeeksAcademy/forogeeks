import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import Icon from "../icons/icon.jsx"

export const Categories = ({ title, icon, id }) => {
    const { sotre, actions } = useContext(Context);

    useEffect(() => {
        // actions.getAllCategories();
    }, []);

    // Convertir el nombre del icono en componente de icono utilizando createElement
    // const IconComponent = icon && createElement(icon);

    return (
        <div className="row">
            <div className="col-md-12">
                <Link
                    to={`/threads/${title.toLowerCase()}`} // Corregí el enlace para usar el título como parte de la ruta
                    style={{
                        textDecoration: "none",
                        color: "currentColor",
                    }}>
                    <div className="d-flex flex-row align-items-center gap-2 p-0">
                        <Icon name={icon} size="24" stroke="1" color="currentColor" />
                        <p className="p-0 m-0">{title}</p>
                    </div>
                </Link>
                <hr className="hr"></hr>
            </div>
        </div>
    );
};