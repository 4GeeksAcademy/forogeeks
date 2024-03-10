import React, { useContext, createElement, useEffect } from "react";
import { Context } from "../store/appContext";

import AsideTrending from "../components/trending.jsx";
import AsideFourGeeks from "../components/4geeks.jsx";
import { TextEditor } from "../components/TextEditor/text-editor.jsx";
import SuccessModal from "../components/Modal/ModalRegisterSuccessFull.jsx";
// IMPORT ICONS
import Icon from "../components/icons/icon.jsx";

import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

// ICON CATEGORIES

export const Home = () => {
	const { store, actions } = useContext(Context);
	//Modal para cuando el registro es correcto
	//const [showSuccessModal, setShowSuccessModal] = useState(false);
	const categories = store.categories;
	const showSuccessModal = store.modalRegistersuccess;

     // useEffect para manejar el cierre del modal cuando modalRegistersuccess cambia
	 useEffect(() => {
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
					<div className="shadow-sm rounded-3 mb-4 p-3">
						<div className="">
							<h4 className="mb-4">Categorías</h4>
						</div>
						<Categories />
					</div>
				</div>
				<div className="col-md-4">
					{/* TRENDING */}
					<AsideTrending />
					{/* 4GEEKS */}
					<AsideFourGeeks />
				</div>
				{/* TEST SECTION */}
				<section className="blue-section-bg">

    <div className="container">
        <div className="row">
            <div className="col-lg-5">
                <div className="image-container mt-n6 mb-5">
                    {/* <img src="images/download-ebook.png" alt="" className="img-fluid"> */}
                </div>
            </div>
            <div className="col-lg-7">
                <div className="text-container text-white d-flex flex-column justify-content-center h-100 mb-5">
                    <h2 className="fw-bold">Get Your Free Ebook Now</h2>
                    <p>Unlock the power of knowledge and take your blogging journey to the next level. Our ebook, "Blog Mastery: The Ultimate Guide to Blogging Success," is your key to success.</p>
                    
                    <form action="">
                        <div className="input-group mb-3">
                            <input type="email" placeholder="Email Address" className="form-control"/>
                            <button className="btn btn-primary text-white rounded-end">Download</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
			</div>
			
			<SuccessModal show={showSuccessModal} onClose={handleClose} />
		</div>
	);
};

const Categories = () => {
	const { store, actions } = useContext(Context);

	const categories = store.categories;

	return (
		<div className="row">
			{categories.map((category, index) => {
				return (
					<div key={index} className="col-md-12">
						<Link
							to={`/threads/${category.name.toLowerCase()}`}
							style={{
								textDecoration: "none",
								color: "currentColor",
							}}>
							<div className="d-flex flex-row align-items-center gap-2 p-0">
								<Icon
									name={category.icon}
									size="25"
									stroke="1"
								/>
								<p className="p-0 m-0">{category.name}</p>
							</div>
						</Link>
						<hr className="hr"></hr>
					</div>
				);
			})}
		</div>
	);
};
