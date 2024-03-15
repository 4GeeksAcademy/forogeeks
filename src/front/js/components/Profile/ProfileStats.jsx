import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../store/appContext';


const ProfileStats = ({ userId }) => {
    //UseEffect para obtener todos los hilos de cada usuario
    const { store, actions } = useContext(Context);
    const numberThreadByUser = store.threads.filter(thread => thread.user_id === userId).length;
    useEffect(() => {
        actions.getNumberOfThreadsByUser(userId);
    }
        , []);
    return (

        <div className="d-flex justify-content-start flex-column align-items-start mb-3 gap-2 w-100">
            <ul className="list-group rounded w-100">
                <li className="list-group-item bg-primary rounded-5 fw-bold text-white">Estadísticas</li>
                <li className="list-group-item border-0 p-1 px-2 ps-2 d-flex justify-content-between align-items-center">Total de hilos: <span className="text-primary fw-bold">{numberThreadByUser}</span></li>
                <li className="list-group-item border-0 p-1 px-2 ps-2 d-flex justify-content-between align-items-center">Total de comentarios: <span className="text-primary fw-bold">15</span></li>
                <li className="list-group-item border-0 p-1 px-2 ps-2 d-flex justify-content-between align-items-center">Total de likes: <span className="text-primary fw-bold">5</span></li>
            </ul>
        </div>
    );
}

export default ProfileStats;
