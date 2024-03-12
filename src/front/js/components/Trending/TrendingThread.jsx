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

const TrendingThreads = ({ title, number_of_comments, date, category, id, possition }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {

    }, []);

    return (
        <div className="container">
            <Link to={`/threads/${category}/${id}`} style={{ textDecoration: "none", color: "currentColor" }}>
                {/* CONTAINER */}
                <div className="row d-flex align-items-center py-1">

                    {/* POSITION */}
                    <div className="col-2 ">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <span className="text-primary fw-bold fs-4">{possition + 1}</span>
                        </div>
                    </div>
                    {/* TITLE, COMMENTS, USER OR DATE */}
                    <div className="col-10">
                        <div className="row">
                            {/* TITULO */}
                            <div className="col-md-12">
                                <p className="m-0 p-0">{title}</p>
                            </div>

                            {/* NUMERO DE COMENTS Y USERNAME */}
                            <div className="col-md-12 d-flex justify-content-between">
                                {/* NUMERO DE COMENTS */}
                                <div className="d-flex align-items-center">
                                    <IconMessages size={15} stroke={1} />
                                    <span className="ms-2 text-muted small">{number_of_comments}</span>
                                </div>
                                {/* USERNAME */}
                                <div>
                                    <span className="text-muted small">{moment(date).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="hr m-0 p-0" style={{ opacity: "10%" }}></hr>

            </Link>
        </div>
    );
};

export default TrendingThreads;


/* <div className="d-flex align-items-center justify-content-between py-2">

<div className="d-flex align-items-center gap-2">
    <div>

    </div>

    <div className="d-flex align-items center">

        <h5 className="text-secondary fw-bold">{possition + 1}</h5>
        <p className="m-0 p-0">{title}</p>

    </div>
</div>

<div className="d-flex align-items-center">
    <IconMessages size={20} stroke={1} />
    <span className="ms-2">{number_of_comments}</span>
</div>
</div>
<hr className="hr m-0 p-0" style={{ opacity: "10%" }}></hr> */