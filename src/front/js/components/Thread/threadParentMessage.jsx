import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../../store/appContext";
import moment from "moment";
import { IconHeart, IconBookmark, IconHeartFilled, IconBookmarkFilled } from '@tabler/icons-react';

import { ModalConfirmarDeleteThread } from "../Modal/modalConfirmarDeleteThread.jsx";

export const ThreadParentMessage = ({ autor, content, date, user_profile_picture, description, thread_id }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current = document.getElementById("contenido");
    }, []);

    const handleShowModal = () => {
        setShowModal(true); // Función para abrir el modal
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteThread = () => {
        deleteThreadIfUserIsOwner();
        handleCloseModal();
    };

    const deleteThreadIfUserIsOwner = () => {
        if (store.isUserLogged) {
            if (store.userInfo.id === store.threads.user_id) {
                actions.deleteThreadIfUserIsOwner(thread_id)
                    .then(response => {
                        console.log('Thread deleted:', response);
                    })
                    .catch(error => {
                        console.error('Error deleting thread:', error);
                    });
            }
        }
    }

    useEffect(() => {
        contentRef.current = document.getElementById("contenido");
    }, []);

    useEffect(() => {
        const favoriteThreads = store.favoriteThreads;
        if (favoriteThreads && thread_id) {
            const isThreadFavorite = favoriteThreads.some(favThread => favThread.id === thread_id);
            setIsFavorite(isThreadFavorite);
        }
    }, [store.favoriteThreads, thread_id]);

    useEffect(() => {
        const likedThreads = store.likedThreads;
        if (likedThreads && thread_id) {
            const isThreadLiked = likedThreads.some(likedThread => likedThread.id === thread_id);
            setIsLiked(isThreadLiked);
        }
    }, [store.likedThreads, thread_id]);

    useEffect(() => {
        const favoriteThreads = store.favoriteThreads;
        if (favoriteThreads && thread_id) {
            const isThreadFavorite = favoriteThreads.some(favThread => favThread.id === thread_id);
            setIsFavorite(isThreadFavorite);
        }

        actions.checkFavoriteThread(thread_id, setIsFavorite)
            .then(response => {
                setIsFavorite(response.isFavorite);
            })
            .catch(error => {
                console.error('Error checking favorite thread:', error);
            });

        actions.checkLikedThread(thread_id, setIsLiked)
            .then(response => {
                setIsLiked(response.isLiked);
            })
            .catch(error => {
                console.error('Error checking liked thread:', error);
            });
    }, [store.favoriteThreads, store.likedThreads, thread_id]);

    const handleFavoriteThread = (thread_id) => {
        if (store.isUserLogged) {
            if (isFavorite) {
                actions.unfavoriteThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsFavorite(false);
                    })
                    .catch(error => {
                        console.error('Error unfavoriting thread:', error);
                    });
            } else {
                actions.favoriteThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsFavorite(true);
                    })
                    .catch(error => {
                        console.error('Error favoriting thread:', error);
                    });
            }
        } else {
            setShowAlert(true);
        }
    };

    const handleLikeThread = (thread_id) => {
        if (store.isUserLogged) {
            if (isLiked) {
                actions.unlikedThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsLiked(false);
                        actions.getLikesByThread(thread_id); // Actualizar los likes
                    })
                    .catch(error => {
                        console.error('Error unliking thread:', error);
                    });
            } else {
                actions.likedThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsLiked(true);
                        actions.getLikesByThread(thread_id); // Actualizar los likes
                    })
                    .catch(error => {
                        console.error('Error liking thread:', error);
                    });
            }
        } else {
            setShowAlert(true);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="shadow-sm rounded-3 px-3 border-start border-primary border-5 bg-white">
                    <div className="row align-items-center py-3 ">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="">
                                <div className="d-flex flex-row gap-3 ">
                                    <img src={user_profile_picture} alt="profile" className="rounded-circle" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                                    <div className="d-flex flex-column">
                                        <span className="m-0 p-0 d-flex align-items-center fw-bold text-primary">{"@" + autor}</span>
                                        <span className="text-muted small p-0 m-0">{description ? description : "Estoy usando ForoGeeks"}</span>
                                    </div>
                                </div>
                            </div>
                            {/* HORA Y DELETE THREAD */}
                            <div className="text-muted small">
                                <div className="d-flex align-items-center gap-2">

                                    {store.isUserLogged && store.userInfo.id === store.threads.user_id && (
                                        <span onClick={handleShowModal} className="text-muted small p-0 m-0">Eliminar</span>

                                        // <span onClick={deleteThreadIfUserIsOwner} className="text-muted small p-0 m-0">Eliminar</span>
                                    )
                                    }

                                    <span className="text-muted small p-0 m-0">{moment(date).fromNow()}</span>
                                </div>
                            </div>

                        </div>
                        <hr className="hr" style={{ opacity: "10%" }}></hr>
                        <div className="col-md-12" id="contenido">
                            <div className="">
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                        {showAlert && (
                            <div className="alert alert-warning" role="alert">
                                Por favor, inicia sesión para marcar este hilo como favorito o darle like.
                            </div>
                        )}
                        {store.isUserLogged && (
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-1">

                                    {store.likedThreads.length !== 0 && (
                                        <span className="text-muted small">{store.likedThreads.length}</span>
                                    )}

                                    {isLiked ? <IconHeartFilled style={{ cursor: "pointer" }} className="text-danger" size={25} stroke={1} onClick={() => handleLikeThread(thread_id)} /> : <IconHeart style={{ cursor: "pointer" }} size={25} stroke={1} onClick={() => handleLikeThread(thread_id)} />}
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    {isFavorite ? <IconBookmarkFilled style={{ cursor: "pointer" }} size={25} stroke={1} onClick={() => handleFavoriteThread(thread_id)} /> : <IconBookmark style={{ cursor: "pointer" }} size={25} stroke={1} onClick={() => handleFavoriteThread(thread_id)} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalConfirmarDeleteThread isOpen={showModal} onClose={handleCloseModal} onDelete={handleDeleteThread} />

        </div>
    );
};
