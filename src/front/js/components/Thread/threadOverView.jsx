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

// Falta poner el Link para que redireccione a la página del thread

const IndividualThreadExternalView = ({ title, likes, number_of_comments, autor, date, category, id }) => {
	const { store, actions } = useContext(Context);

	useEffect(() => {

	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 p-0">
					<Link to={`/threads/${category}/${id}`} style={{ textDecoration: "none", color: "currentColor" }}>
						{/* CONTAINER */}
						<div className="row d-flex align-items-center py-2 px-2">

							{/* POSITION */}
							<div className="col-1 ">
								<div className="d-flex align-items-center justify-content-center h-100">
									<span className="text-primary fw-bold fs-4"><IconMessage stroke={1.3}/></span>
								</div>
							</div>
							{/* TITLE, COMMENTS, USER OR DATE */}
							<div className="col-11">
								<div className="row">
									{/* TITULO */}
									<div className="col-md-12">
										<p className="m-0 p-0 fw-bold">{title}</p>
									</div>

									{/* NUMERO DE COMENTS Y USERNAME */}
									<div className="col-md-12 d-flex justify-content-between">
										{/* NUMERO DE COMENTS */}
										
											<span className="text-muted small">{"@"+autor}</span>
										{/* USERNAME */}
										<div className="d-flex gap-4">

										<div className="d-flex align-items-center">
											<IconMessages size={15} stroke={1} />
											<span className="ms-2 text-muted small">{number_of_comments}</span>
										</div>
											<span className="text-muted small">{moment(date).fromNow()}</span>
										</div>
									</div>
								</div>
							</div>

						</div>
						<hr className="hr m-0 p-0" style={{ opacity: "10%" }}></hr>

					</Link>

				</div>
			</div>
		</div>
	);
};

export default IndividualThreadExternalView;
