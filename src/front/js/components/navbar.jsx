import React from "react";
import { Link } from "react-router-dom";

// ICONS
import { IconBrandCodesandbox } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-primary bg-primary w-50 m-auto rounded-5 mt-3">
			<div className="container d-flex align-item-center">
				<Link path="/">
					<a className="navbar-brand d-flex align-content-center">
						<IconBrandCodesandbox
							color="white"
							stroke="1"
							size="30"
						/>
					</a>
				</Link>
				ForoCode
				<div className="d-flex bg-secondary rounded-5 gap-2 align-content-center"></div>
				<IconUserCircle color="white" stroke="1" size="30" />
			</div>
		</nav>
	);
};

<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
	<a class="navbar-brand" href="#">
		Navbar
	</a>
	<button
		class="navbar-toggler d-lg-none"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#collapsibleNavId"
		aria-controls="collapsibleNavId"
		aria-expanded="false"
		aria-label="Toggle navigation"></button>
	<div class="collapse navbar-collapse" id="collapsibleNavId">
		<ul class="navbar-nav me-auto mt-2 mt-lg-0">
			<li class="nav-item">
				<a class="nav-link active" href="#" aria-current="page">
					Home <span class="visually-hidden">(current)</span>
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
				<div class="dropdown-menu" aria-labelledby="dropdownId">
					<a class="dropdown-item" href="#">
						Action 1
					</a>
					<a class="dropdown-item" href="#">
						Action 2
					</a>
				</div>
			</li>
		</ul>
		<form class="d-flex my-2 my-lg-0">
			<input
				class="form-control me-sm-2"
				type="text"
				placeholder="Search"
			/>
			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">
				Search
			</button>
		</form>
	</div>
</nav>;
