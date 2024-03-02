import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button } from "../components/Button/button.jsx";

// IMPORT ICONS
import Icon from "../components/icons/icon.jsx";
import { IconArrowLeft } from "@tabler/icons-react";
import { IconFlame } from "@tabler/icons-react";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-8 mb-3 mb-md-0">
					<div className="shadow rounded-4 mb-4 p-3">
						<h3>Categorías</h3>
						<h3>Categorías</h3>
						<h3>Categorías</h3>
						<h3>Categorías</h3>
						<h3>Categorías</h3>
						<h3>Categorías</h3>
					</div>
				</div>
				<div className="col-md-4">
					{/* TRENDING */}
					<div className="shadow rounded-4 p-3 mb-2">
						<h4 className="d-flex ">
							<IconFlame /> Trending
						</h4>
					</div>
					{/* 4GEEKS */}
					<div className="shadow rounded-4 p-3 mb-2">
						<h4 className="d-flex">4Geeks</h4>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-8 border border-2">Hoa</div>
				<div className="col-4 border border-2">aef</div>
			</div>
		</div>
	);
};
