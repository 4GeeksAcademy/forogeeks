import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalLogin } from "./modalLogin.jsx";
import { ModalRegister } from "./modalRegister.jsx";



import { useState } from 'react';



// ICONS
import { IconBrandCodesandbox } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { IconSun } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
import { IconSettings2 } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import { IconBookmark } from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconBell } from "@tabler/icons-react";
import { IconCircleDotted } from "@tabler/icons-react";
import { IconMessageCircle2Filled } from "@tabler/icons-react";
import Icon from "./icons/icon.jsx";

export const Navbar = () => {
	let [isMovileSize, setIsMobileSize] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileSize(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<nav
			className="navbar navbar-expand-sm rounded-0 navbar-primary-light bg-primary mt-0 p-1 w-100 navbar-dark"
			style={{ lineHeight: "1" }}>
			<div className="container-fluid w-100 m-0 d-flex justify-content-between">
				<Link to="/" style={{ textDecoration: "none" }}>
					<a className="navbar-brand p-0 d-flex align-items-center">
						<Icon name="LOGO" size="40" />
						<span className=" align-items-center">ForoGeeks</span>
					</a>
				</Link>

				<button
					className="navbar-toggler d-lg-none d-flex flex-column justify-content-around border-0"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapsibleNavId"
					aria-controls="collapsibleNavId"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				{/* SEARCHBAR */}
				<div
					className="collapse navbar-collapse "
					id="collapsibleNavId">
					<ul
						className={
							isMovileSize
								? "navbar-nav w-100 m-auto mt-3 mb-2"
								: "navbar-nav w-50 m-auto"
						}>
						<div className="input-group">
							<li
								className="nav-item w-100 "
								style={{ width: "65vw" }}>
								<input
									className="form-control rounded-5 border-0 w-100"
									type="text"
									placeholder="Search"
									style={{ width: "100%", lineHeight: "1.2" }}
								/>
							</li>
						</div>
					</ul>
					{/* NOTIFICACIONES */}
					<ul className="navbar-nav ">
						<li className="nav-item dropdown text-white ">
							<a
								className="nav-link d-flex align-items-center"
								href="#"
								data-bs-toggle="dropdown">
								<IconBell size={30} stroke={1} />

								{isMovileSize && (
									<span className="ms-2">Notificaciones</span>
								)}
							</a>

							<div
								className="dropdown-menu dropdown-menu-start rounded-3 shadow-sm border-0 rounded-4 mb-3"
								style={{ left: "-50px" }}>
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-3 align-items-center">
										<IconMessageCircle2Filled
											size={20}
											stroke={1}
										/>
										<div className="d-flex flex-column">
											<span>Nuevo mensaje privado</span>
											<span className="mt-1 text-muted">
												@pere69
											</span>
										</div>
									</div>
								</a>
								<hr
									className="hr m-auto my-2 p-0"
									style={{ width: "80%" }}></hr>
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-3 align-items-center">
										<IconMessageCircle2Filled
											size={20}
											stroke={1}
										/>
										<div className="d-flex flex-column">
											<span>Nuevo mensaje privado</span>
											<span className="mt-1 text-muted">
												@diego
											</span>
										</div>
									</div>
								</a>
							</div>
						</li>

						{/* USER PROFILE */}
						<li className="nav-item dropdown">
							<a
								className="nav-link d-flex align-items-center"
								href="#"
								id="dropdownId"
								data-bs-toggle="dropdown">
								<IconUserCircle
									width={30}
									height={30}
									stroke={1}
								/>
								<span className="ms-2">Hey! @usuario</span>
							</a>

							<div
								className="dropdown-menu dropdown-menu-end rounded-3 shadow-sm border-0 rounded-4 mb-3"
								aria-labelledby="dropdownId">
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-2 align-items-center mt-1">
										<IconSettings2 stroke={1} />
										Configuración
									</div>
								</a>
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-2 align-items-center mt-1">
										<IconMail stroke={1} />
										Mensajes privados
									</div>
								</a>
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-2 align-items-center mt-1">
										<IconBookmark stroke={1} />
										Guardados
									</div>
								</a>
								<a className="dropdown-item">
									<div className="d-flex gap-2 align-items-center">
										<IconSun stroke={1} />
										Modo oscuro
										<div
											className="form-check form-switch"
											style={{ marginTop: "3px" }}>
											<input
												className="form-check-input"
												type="checkbox"
												role="switch"
												id="flexSwitchCheckDefault"
											/>
										</div>
									</div>
								</a>
								<hr
									className="hr m-auto mt-2 mb-2"
									style={{ width: "87%" }}></hr>
								<a className="dropdown-item" href="#">
									<div className="d-flex gap-2 align-items-center">
										<IconLogout stroke={1} />
										Salir
									</div>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
