import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import moment from "moment";
import { IconHeart, IconArrowForward, IconHeartFilled } from '@tabler/icons-react';


export const ThreadMessage = ({ content, date, id, authorId, profileImg}) => {
    const { store, actions } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const user_name = store.user_name;
    const user_profile_image = store.user_profile_image;
    const token = localStorage.getItem("token");
    const userInfo = store.userInfo;
    const [showOptions, setShowoptions] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [authorName, setAuthorName] = useState("");
    const [authorProfileImage, setAuthorProfileImage] = useState("");
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userName = await actions.getUserNameById(authorId);
                const profileImage = await actions.getUserProfileImageById(authorId);
                setAuthorName(userName);
                setAuthorProfileImage(profileImage);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [authorId]);

    useEffect(() => {
        actions.getUserLikedComments()
        console.log(store.likedComments)
    }, []);

    useEffect(() => {
        const likedComments = store.likedComments;
        if (likedComments && id) {
            const isLiked = likedComments.some(likedComment => likedComment.id === id);
            setIsLiked(isLiked);
        }
    }, [store.likedComments, id]);

    useEffect(() => {
        const likedComments = store.likedComments;
        if (likedComments && id) {
            const isLiked = likedComments.some(likedComment => likedComment.id === id);
            setIsLiked(isLiked);
        }

        actions.checkLikedComment(id, setIsLiked)
            .then(response => {
                setIsLiked(response.isLiked);
            })
            .catch(error => {
                console.error('Error checking liked comment:', error);
            });

    }, [store.likedComments, id]);

    const handleLikeComment = (id) => {
        if (store.isUserLogged) {
            if (isLiked) {
                actions.unlikedComment({ user_id: store.userInfo.id, comment_id: id })
                    .then(response => {
                        console.log(response.message);
                        setIsLiked(false);
                    })
                    .catch(error => {
                        console.error('Error unliking thread:', error);
                    });
            } else {
                actions.likedComment({ user_id: store.userInfo.id, comment_id: id })
                    .then(response => {
                        console.log(response.message);
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
                                    <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                        <div className="d-flex flex-column">
                                        <span className="m-0 p-0 d-flex align-items-center fw-bold text-primary">{"@" + authorName}</span>
                                            <span className="text-muted small p-0 m-0" >Estoy usando ForoGeeks</span>
                                        </div>
                                    </div>
                                </div>
                                {/* DATE */}
                                <div className="">
                                    <div className='d-flex justify-content-end'>
                                        <span className="text-muted small p-0 m-0" style={{ fontSize: "12.25px" }}>{moment(date).fromNow()}</span>
                                    </div>
                                </div>

                            </div>

                            {/* DIVIDIER */}
                            <hr className="hr" style={{ opacity: "10%" }}></hr>

                            {/* CONTENT */}
                            <div className="col-md-12">
                                <div className="">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                                {showAlert && (
                                    <div className="alert alert-warning" role="alert">
                                        Por favor, inicia sesión para marcar este comentario como favorito.
                                    </div>
                                )}
                            </div>
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                            {store.isUserLogged && (
                                    <div className="d-flex align-items-center gap-1">
                                        <span className="text-muted small">12</span>
                                        {isLiked ? <IconHeartFilled size={20} stroke={1} className="text-danger" onClick={() => handleLikeComment(id)} /> : <IconHeart size={20} stroke={1} onClick={() => handleLikeComment(id)} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
