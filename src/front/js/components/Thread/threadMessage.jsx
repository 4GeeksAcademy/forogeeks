import React from 'react';
import { IconHeart } from '@tabler/icons-react';
import { IconArrowForward } from '@tabler/icons-react';


export const ThreadMessage = ({ content, autor, date, likes, profileImg }) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 p-0">
                    {/* CONTENEDOR DEL HILO */}
                    <div className="shadow-sm rounded-3 mb-4 py-1 px-3">
                        <div className="row align-items-center p-2">

                            <div className='d-flex justify-content-between mb-3'>
                                {/* USERNAME */}
                                <div className="col-md-6">
                                    <div className="d-flex flex-row gap-3">
                                        <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                        <div className="d-flex flex-column mb-2">
                                            <span className="m-0 p-0">{autor}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* DATE */}
                                <div className='col-md-6'>
                                    <div className='d-flex justify-content-end'>
                                        <span className="text-muted small p-0 m-0">{date}</span>
                                    </div>
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="col-md-12">
                                <div className="">
                                    <p>{content}</p>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-end gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-2 border p-1 border-1 rounded-3">
                                    <span className="text-muted small">{likes}</span>
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