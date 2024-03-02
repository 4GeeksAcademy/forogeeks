import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button } from "../components/Button/button.jsx";

// IMPORT ICONS
import Icon from "../components/icons/icon.jsx";
import { IconArrowLeft } from "@tabler/icons-react";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="text-primary">Ya funciona</h1>
			<Button>
				<Icon name="LOGOUT" color="white" />
			</Button>
			<div className="d-flex justify-content-center align-content-center m-auto">
				<button className="btn btn-secondary mt-3 d-flex justify-content-center align-content-center">
					<Icon name="LOGOUT" />
				</button>
				<Icon name="LOGOUT" size="40" />
				<IconArrowLeft color="green" size={48} />
			</div>
		</div>
	);
};
