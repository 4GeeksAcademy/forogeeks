import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import AsideTrending from "../components/trending.jsx";
import AsideFourGeeks from "../components/4geeks.jsx";
import SuccessModal from "../components/Modal/ModalRegisterSuccessFull.jsx";
import { Categories } from "../components/Thread/categories.jsx";
import { Link } from "react-router-dom";

// IMPORT ICONS
import { LoaderCategory } from "../components/Loaders/loaderCategory.jsx";

// ICON CATEGORIES

export const Home = () => {
	const { store, actions } = useContext(Context);
	const showSuccessModal = store.modalRegistersuccess;
	const category = store.categories;
	const [loading, setLoading] = useState(true);


	// useEffect para manejar el cierre del modal cuando modalRegistersuccess cambia
	useEffect(() => {
		actions.clearThreads();
		actions.getAllCategories().then(() => {
			setLoading(false); // Establecer loading como false una vez que getAllCategories se complete
		});

		const handleCloseSuccessModal = () => {
			actions.setModalRegistersuccess(true);
		};

		// Si modalRegistersuccess cambia a true, mostrar el modal de éxito
		if (showSuccessModal) {
			handleCloseSuccessModal();
		}
	}, [showSuccessModal]); // Ejecutar el efecto cada vez que showSuccessModal cambie

	// Función para cerrar el modal de éxito
	const handleClose = () => {
		actions.setModalRegistersuccess(false);
	};


	return (
		<div className="container">
			<div className="row">
				{/* <div className="mb-8">
					<TextEditor />
				</div> */}
				<div className="col-md-8 mb-3 mb-md-0">
					{/* CATEGORIAS */}
					<div className="shadow-sm rounded-3 mb-4 p-3 bg-white">
						<div className="">
							<h4 className="mb-4">Categorías</h4>
						</div>
						{loading ? (
							<LoaderCategory />
						) : category.length === 0 ? (
							<p>No hay categorías disponibles</p>
						) : (
							category.map((categoryItem, index) => (
								<Categories key={index} title={categoryItem.title} icon={categoryItem.icon} id={categoryItem.id} />
							))
						)}

					</div>
				</div>
				<div className="col-md-4">
					{/* TRENDING */}
					<AsideTrending />
					{/* 4GEEKS */}
					<AsideFourGeeks />
				</div>
			</div>

			<SuccessModal show={showSuccessModal} onClose={handleClose} />
		</div>
	);
};

