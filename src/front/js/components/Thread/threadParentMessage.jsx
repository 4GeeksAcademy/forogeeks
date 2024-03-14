import React, { useEffect, useState, useContext, useRef  } from "react";
import { Context } from "../../store/appContext";
import moment from "moment";
import { IconHeart, IconBookmark, IconArrowForward, IconHeartFilled, IconBookmarkFilled } from '@tabler/icons-react';

export const ThreadParentMessage = ({ autor, content, date, user_profile_picture, description, title, thread_id, thread_likes }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const contentRef = useRef(null);

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

        // Llama a la acción para comprobar si el hilo está marcado como favorito
        actions.checkFavoriteThread(thread_id, setIsFavorite)
            .then(response => {
                setIsFavorite(response.isFavorite);
            })
            .catch(error => {
                console.error('Error checking favorite thread:', error);
            });

        // Llama a la acción para comprobar si el hilo está marcado como gustado
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
                        console.log(response.message);
                        setIsFavorite(false); // Actualizar el estado directamente
                    })
                    .catch(error => {
                        console.error('Error unfavoriting thread:', error);
                    });
            } else {
                actions.favoriteThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        console.log(response.message);
                        setIsFavorite(true); // Actualizar el estado directamente
                    })
                    .catch(error => {
                        console.error('Error favoriting thread:', error);
                    });
            }
        } else {
            // Mostrar la alerta si el usuario no está autenticado
            setShowAlert(true);
        }
    };

    const handleLikeThread = (thread_id) => {
        if (store.isUserLogged) {
            if (isLiked) {
                actions.unlikedThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsLiked(false);
                    })
                    .catch(error => {
                        console.error('Error unliking thread:', error);
                    });
            } else {
                actions.likedThread({ user_id: store.userInfo.id, thread_id })
                    .then(response => {
                        setIsLiked(true);
                    })
                    .catch(error => {
                        console.error('Error liking thread:', error);
                    });
            }
        } else {
            // Mostrar la alerta si el usuario no está autenticado
            setShowAlert(true);
        }
    };

    const handleArrowClick = () => {
        const scrollStep = window.scrollY / 5;
        const scrollInterval = setInterval(() => {
            if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 0);
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="shadow-sm rounded-3 px-3 border-start border-primary border-5 bg-white">
                    <div className="row align-items-center py-3 ">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="">
                                <div className="d-flex flex-row gap-3 ">
                                    <img src={user_profile_picture} alt="profile" className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                    <div className="d-flex flex-column">
                                        <span className="m-0 p-0 d-flex align-items-center fw-bold text-primary">{"@" + autor}</span>
                                        <span className="text-muted small p-0 m-0">{description ? description : "Estoy usando ForoGeeks"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-muted small">
                                <div className="d-flex align-items-center">
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
                        {/* Alerta Bootstrap para mostrar cuando el usuario no está autenticado */}
                        {showAlert && (
                            <div className="alert alert-warning" role="alert">
                                Por favor, inicia sesión para marcar este hilo como favorito o darle like.
                            </div>
                        )}
                        {store.isUserLogged && (
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-1">
                                <span className="text-muted small">{thread_likes}</span>
                                    {isLiked ? <IconHeartFilled className="text-danger" size={20} stroke={1} onClick={() => handleLikeThread(thread_id)} /> : <IconHeart size={20} stroke={1} onClick={() => handleLikeThread(thread_id)} />}
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    {isFavorite ? <IconBookmarkFilled size={20} stroke={1} onClick={() => handleFavoriteThread(thread_id)} /> : <IconBookmark size={20} stroke={1} onClick={() => handleFavoriteThread(thread_id)} />}
                                    <IconArrowForward size={20} stroke={1} onClick={handleArrowClick} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
