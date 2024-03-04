import React from "react";
import { Link } from "react-router-dom";

// ICONS
import { IconBrandCodesandbox } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { IconSun } from "@tabler/icons-react";

export const Navbar = () => {
	return (
		<nav class=" navbar navbar-expand-sm rounded-5 navbar-light bg-light mt-2">
			<div class="container">
				<a class="navbar-brand">
					{/* <Link to="/"> */}
					<IconBrandCodesandbox
						width={30}
						height={30}
						stroke={1}
					/>{" "}
					ForoCode
					{/* </Link> */}
				</a>
				<button
					class="navbar-toggler d-lg-none"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapsibleNavId"
					aria-controls="collapsibleNavId"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="collapsibleNavId">
					<ul class="navbar-nav me-auto mt-2 mt-lg-0">
						<li class="nav-item">
							<a
								class="nav-link active"
								href="#"
								aria-current="page">
								Home
								<span class="visually-hidden">(current)</span>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Link
							</a>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="dropdownId"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Dropdown
							</a>
							<div
								class="dropdown-menu"
								aria-labelledby="dropdownId">
								<a class="dropdown-item" href="#">
									Action 1
								</a>
								<a class="dropdown-item" href="#">
									Action 2
								</a>
							</div>
						</li>
					</ul>
					<div>
						<ul class="navbar-nav">
							<li class="nav-item">
								<IconUserCircle
									width={30}
									height={30}
									stroke={1}
								/>
							</li>
							<li class="nav-item">
								<IconSun width={30} height={30} stroke={1} />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
