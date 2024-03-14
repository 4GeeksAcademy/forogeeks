import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import AsideTrending from "../components/trending.jsx";
import AsideFourGeeks from "../components/4geeks.jsx";
import SuccessModal from "../components/Modal/ModalRegisterSuccessFull.jsx";
import { Categories } from "../components/Thread/categories.jsx";
import { Link } from "react-router-dom";
import { ModalRegister } from "../components/Modal/modalRegister.jsx";

// IMPORT ICONS
import { LoaderCategory } from "../components/Loaders/loaderCategory.jsx";

// ICON CATEGORIES

export const Home = () => {
	const { store, actions } = useContext(Context);
	const showSuccessModal = store.modalRegistersuccess;
	const category = store.categories;
	const [showRegister, setShowRegister] = useState(false);
	const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
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
				<div className="col-md-8 mb-3 mb-md- ps-0">
					{/* CATEGORIAS */}
					<div className="shadow-sm rounded-3 p-3 bg-white">
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
				<div className="col-md-4 p-lg-0">
					{/* TRENDING */}
					<AsideTrending />
					{/* 4GEEKS */}
					<AsideFourGeeks />
				</div>

				{/* SECTION */}
				{/* <section className="shadow-sm rounded-3 p-3 bg-white mb-2 ">
					<div className="row mb-3">
						<div className="col-md-12 p-0 ps-2">
							<div className="">
								<img src="./download-background.jpg"></img>
							</div>
						</div>
					</div>
				</section> */}

				{/* BIENVENIDO A FOROGEEKS */}
				<section className="shadow-sm bg-white rounded-3 mb-2 p-0">
					<div className="row p-0 m-auto">
						<div className="col-lg-6 pe-0 ps-lg-5 py-md-5 ">
							<div className="text-container d-flex flex-column justify-content-center h-100">
								<h4 className="fw-bold display-6 pt-3" style={{ fontSize: "1.7rem" }}>¡Bienvenido a ForoGeeks!</h4>
								<p>¡Hola, forer@! Estás a punto de sumergirte en un mundo donde la pasión por la programación y la tecnología se fusionan en una comunidad vibrante y llena de conocimientos.</p>
								<ul className="list-group list-group-flush lh-lg">
									<li className="list-group-item">
										<i className="fas fa-square text-primary"></i>
										<strong>Explora nuevas ideas:</strong> Descubre debates sobre las últimas tendencias en programación.
									</li>
									<li className="list-group-item">
										<i className="fas fa-square text-primary"></i>
										<strong>Construye conexiones:</strong> Únete a una comunidad de desarrolladores apasionados.
									</li>
									<li className="list-group-item">
										<i className="fas fa-square text-primary"></i>
										<strong>Desarrolla tus habilidades:</strong> Encuentra recursos para mejorar tus habilidades de programación.
									</li>
								</ul>

								<button className="btn btn-primary align-self-start rounded-5 text-white mt-4" onClick={handleShowRegister}>¡Únete a la comunidad!</button>

							</div>
						</div>
						{/* IMAGEN */}
						<div className="col-lg-6">
							<div className="image-container p-5">
								<img src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="img-fluid rounded-4" />
							</div>
						</div>
					</div>
				</section>


				{/* TESTIMONIOS */}
				<section className="testimonials mb-8 py-3 shadow-sm rounded-3 bg-white">
					<div className="p-3">

						<h4 className="fw-bold display-6 ps-lg-2" style={{ fontSize: "1.7rem" }}>¡Conoce a los creadores!</h4>
					</div>
					<div className="row m-auto w-100 p-3">
						{/* RAUL */}
						<div className="col-md-4 text-center p-2">
							<img className="rounded-circle mb-3" src="https://www.raulcano.dev/me.webp" style={{ width: "130px", height: "130px" }} alt="" />
							<p className="text-align-center fst-italic p-2">

								"It's incredible the dopamine that comes from solving bugs and errors, it's what I've liked the most during the development of this project, and how more is learned without a doubt."

							</p>
							<p className="fw-bold">Raúl Marco - Lisbon</p>
						</div>
						{/* DIEGO */}
						<div className="col-md-4 text-center p-2">
							<img className="rounded-circle mb-3" src="https://avatars.githubusercontent.com/u/93382813?v=4" style={{ width: "130px", height: "130px" }} alt="" />
							<p className="text-align-center fst-italic p-2">"Tengo la suerte de formar parte de ForoGeeks, cada uno de nosotros está demostrando cariño y dedicación. Me siento orgulloso de mí trabajo y del de mis compañeros."
							</p>
							<p className="fw-bold">Diego Gomez - Madrid</p>
						</div>
						{/* NAIN */}
						<div className="col-md-4 text-center p-2">
							<img className="rounded-circle mb-3" src="https://avatars.githubusercontent.com/u/141765188?v=4" style={{ width: "130px", height: "130px" }} alt="" />
							<p className="text-align-center fst-italic p-2">"This ebook completely transformed my blogging journey. The
								practical strategies and valuable insights helped me take my blog
								to new heights. I highly recommend it!"
							</p>
							<p className="fw-bold">Nain Linse - Madrid</p>
						</div>
					</div>
				</section>
			</div>
			<SuccessModal show={showSuccessModal} onClose={handleClose} />
            < ModalRegister showRegister={showRegister} handleCloseRegister={handleCloseRegister} />

		</div>
	);
};

