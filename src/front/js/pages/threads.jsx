import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

import IndividualThreadExternalView from "../components/Thread/threadOverView.jsx";

// ICONS
import { LoaderCategory } from "../components/Loaders/loaderCategory.jsx";

// Falta hacer el aside con el trending y los 4geeks

export const Threads = ({ match }) => {
	const { store, actions } = useContext(Context);
	const threads = store.threads;
	const { category } = useParams();
	const [loading, setLoading] = useState(true);

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const formattedCategory = capitalizeFirstLetter(category);


	useEffect(() => {
		actions.getThreadsByCategory(formattedCategory).then(() => {
            setLoading(false); // Establecer el estado de carga como falso una vez que se complete la acción
        });
		console.log("[threads] useParams: ", category)
		console.log("[threads] formated: ", formattedCategory)

		// actions.getUserNameById(threads[0].user_id);

	}, []);

	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-12 ">
					<div className="shadow-sm rounded-3 mb-4 p-3 bg-white">
						<h3>{formattedCategory} </h3>
						<hr className="hr"></hr>
						{threads.length === 0 && !loading ? <p>No hay hilos en esta categoría</p> : (
							loading ? <LoaderCategory /> : (
								threads.map((thread, index) => (
									<IndividualThreadExternalView
										key={index}
										autor={thread.autor}
										title={thread.title}
										content={thread.content}
										date={thread.date}
									/>
								))
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
