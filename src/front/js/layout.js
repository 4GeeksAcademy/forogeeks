import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// IMPORT PAGES
import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";

// IMPORT COMPONENTS
import { Navbar } from "./components/navbar.jsx";
import { Footer } from "./components/footer.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	// if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
	// 	return <BackendURL />;

	return (
		<div className="main-container">
			<BrowserRouter basename={basename}>
				<Navbar />
				<Routes>
					<Route element={<Home />} path="/" />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
