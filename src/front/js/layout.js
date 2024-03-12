import React, { useEffect, useContext } from "react";
import { Context } from "./store/appContext.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// IMPORT PAGES
import { Home } from "./pages/home.jsx";
import { Threads } from "./pages/threads.jsx";
import { Profile } from "./pages/profile.jsx";
import ChatViewMobile from "./components/Chat/ChatViewMobile.jsx";
import injectContext from "./store/appContext";
import { Chat } from "./pages/chat.jsx";
import Background from "./components/Background/background.jsx";
import { InsideThread } from "./pages/inside-thread.jsx";
import { CreateNewThread } from "./pages/createNewThread.jsx";
import { SendEmail } from "./pages/sendEmail.jsx";

// IMPORT COMPONENTS
import { Navbar } from "./components/navbar.jsx";
import { Footer } from "./components/footer.jsx";
import AdminReport from "./pages/adminReport.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
  // 	return <BackendURL />;

  const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.syncTokenFromSessionStore();
    }, []);

	return (
		<BrowserRouter basename={basename}>
			<Navbar />
			<div className="main-container" style={{ marginTop: "4rem"}}>
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<AdminReport/>} path="/admin-report" />
					
				
					
					<Route element={<Profile />} path="/profile" />
					<Route element={<CreateNewThread />} path="/nuevo-hilo" />
					<Route element={<Chat />} path="/chat" />
					<Route
						element={<ChatViewMobile />}
						path="/chat-view-mobile"
					/>
					<Route element={<Threads />} path="/threads/:category" />
					<Route
						element={<InsideThread />}
						path="/threads/:category/:id"
					/>
					<Route
						element={<SendEmail />}
						path="/send-email"
					/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
