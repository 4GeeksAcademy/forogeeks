import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button } from "../components/Button/button.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="text-primary">Ya funciona</h1>
			<Button>Hola</Button>
		</div>
	);
};
