const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// categories: [
			// 	{
			// 		name: "General",
			// 		icon: "IconMessages",
			// 	},
			// 	{
			// 		name: "Tecnología",
			// 		icon: "IconDeviceLaptop",
			// 	},
			// 	{
			// 		name: "Snippets de código",
			// 		icon: "IconCode",
			// 	},
			// 	{
			// 		name: "Empleo y prácticas",
			// 		icon: "IconNotes",
			// 	},
			// 	{
			// 		name: "Videojuegos",
			// 		icon: "IconDeviceGamepad2",
			// 	},
			// 	{
			// 		name: "Info / Ayuda",
			// 		icon: "IconHelp",
			// 	},
			// ],
			logError: null,
			token: "",
			modalRegistersuccess: false,
            isUserLogged: false,
            userInfo: "",
			threads: [],
			categories: [],
			textEditorContent: "",
			user_name: "",
		},
		actions: {
			//Acción para mostrar modal succesfull
			setModalRegistersuccess: (value) => {
				setStore({ modalRegistersuccess: value });
			},
			// Dentro del objeto actions en getState.js
			syncTokenFromSessionStore: () => {
				const store = getStore();
				const token = localStorage.getItem("token");
				console.log("[flux.syncTokenFromSessionStore]Token en LocalStorage\n\n" + token + "\n");
				if (token && token !== "") {
					const updatedStore = { token: token };
					setStore(updatedStore);
					console.log("[flux.syncTokenFromSessionStore]Token en store\n\n" + store.token + "\n");
					getActions().getUserInfo();
				} else {
					setStore({ isUserLogged: false });
				}
			},

			// Función para registrar un usuario
			signup: async (username, email, password, confirm_password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password, confirm_password }),
					});
			
					if (!response.ok) {
						const error = await response.json();
						throw new Error(error.error); // Devuelve el error del servidor
					}
			
					const data = await response.json();
					localStorage.setItem("token", data.token);
					setStore({ token: data.token, logError: null });
					return { error: null }; // No hay error
				} catch (error) {
					return { error: error.message }; // Devuelve el error del servidor
				}
			},
			

			// Función para iniciar sesión de usuario
			login: async (email, password) => {
				try {
					const response = await fetch(
						process.env.BACKEND_URL + "/api/login",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email, password }),
						}
					);

					if (!response.ok) {
						throw new Error("authentication-error");
					}

					const data = await response.json();
					localStorage.setItem("token", data.token); // Almacenar el token en localStorage
					setStore({ token: data.token, logError: null });
					getActions().getUserInfo();
				} catch (error) {
					console.error("[flux.login] login-error:", error);
				}
			},
			// Función para cerrar sesión
			logout: () => {
				localStorage.removeItem("token"); // Eliminar el token del localStorage
				setStore({ token: "", isUserLogged: false, userInfo: null });
				console.log("[flux.logout] Logout, token removed");
			},

			checkUserExists: async (username, email) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/check-user-exists", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, email }),
                    });
                    if (!response.ok) {
                        throw new Error("Error al verificar si el usuario existe");
                    }
                    const data = await response.json();
                    return data.exists;
                } catch (error) {
                    console.error("[flux.checkUserExists] Error verificando si el usuario existe:\n\n", error);
                    return true; // Si hay un error, asumir que el usuario existe para evitar registros duplicados
                }
            },
            getUserInfo: async () => {
                const store = getStore()
                const token = localStorage.getItem("token")
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/userinfo",
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`, // Reemplazar 'token' con el token JWT del usuario
                            },
                        }
                    );
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log("getUserInfo")
                        console.log("[flux.getUserInfo] respuesta de routes.py userinfo]\n", data);
                        setStore({userInfo:data})
                        setStore({isUserLogged:true})
                        // setIsUserLogged(true);
                    } else {
                        throw new Error("Failed to fetch user info");
                    }
                } catch (error) {
                    console.error("[flux.getUserInfo] Error fetching user info:", error);
                }
			
			},
			createNewThread: async (title, content, category) => {
				const store = getStore();
				const token = localStorage.getItem("token");
				const user_id = store.userInfo.id;
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/create-thread", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id ,title, content, category }),
					});
					if (response.ok) {
						// Si la operación es exitosa, redirigir a la página principal
						// history.push("/");
						console.log("[flux.createNewThread] Thread created successfully\n", response);
					} else {
						throw new Error("[flux.createNewThread] Failed to create new thread");
					}
				} catch (error) {
					console.error("[flux.createNewThread] Error creating new thread:", error);
				}
			},
			getAllThreads: async () => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/threads", {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getAllThreads] data", data);
						setStore({ threads: data });
					} else {
						throw new Error("[flux.getAllThreads] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getAllThreads] Error fetching threads:", error);
				}
			},
			getThreadsByCategory: async (category) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/threads/${category}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getThreadByCategory] Datos de cada thread: ", data);
						setStore({ threads: data });
						console.log("[flux.getThreadByCategory] user_name", user_name);
					} else {
						throw new Error("[flux.getThreadByCategory] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getThreadByCategory] Error fetching threads:", error);
				}
			},
			clearThreads: () => {
				setStore({ threads: [] });
			},
			getAllCategories: async () => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/categories", {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getAllCategories] data", data);
						setStore({ categories: data });
					} else {
						throw new Error("[flux.getAllCategories] Failed to fetch categories");
					}
				} catch (error) {
					console.error("[flux.getAllCategories] Error fetching categories:", error);
				}
			},
			setTextEditorStore: (content) => {
				setStore({ textEditorContent: content });
			},
			



		
		},
	};
};

export default getState;
