import React from "react";
import { Link } from "react-router-dom";

//ICONS
import { IconMessage } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessages } from "@tabler/icons-react";

// Falta poner el Link para que redireccione a la página del thread

const IndividualThreadExternalView = ({ title, likes, coments, autor }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<Link to="/threads/:category/:id" style={{ textDecoration: "none", color: "currentColor" }}>
						{/* TITULO */}
						<div className="shadow-sm rounded-3 mb-4 py-1 px-3">
							<div className="row align-items-center">
								<div className="col-sm-6 d-flex align-items-center">
									{/* Icono */}
									<IconMessage size={20} stroke={1.5} color="#007bff" />
									{/* Separador */}
									<hr className="vr mx-3"></hr>
									<div className="d-flex flex-column">
										{/* TITULO DEL HILO */}
										<p className="m-0 p-0">{title}</p>
										{/* NOMBRE DE USUARIO Y FECHA */}
										<div>
											<span className="text-muted small p-0 m-0">@user08</span>
											<span className="text-muted small p-0 m-0"> - 2h</span>
										</div>
									</div>
								</div>
								{/* NUMERO DE LIKES Y COMENTS */}
								<div className="col-sm-6 d-flex justify-content-end gap-3 text-muted small">
									<hr className="vr mx-3"></hr>

									<div className="d-flex align-items-center">
										<IconHeartFilled size={20} stroke={1} />
										<span className="ms-2">{likes}</span>
									</div>
									<div className="d-flex align-items-center">
										<IconMessages size={20} stroke={1} />
										<span className="ms-2">13{coments}</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default IndividualThreadExternalView;
