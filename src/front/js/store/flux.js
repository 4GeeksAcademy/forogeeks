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
			threadComments: [],
		},
		actions: {
			//Acción para mostrar modal succesfull
			setModalRegistersuccess: (value) => {
				setStore({ modalRegistersuccess: value });
			},
			// Dentro del objeto actions en getState.js
			syncTokenFromSessionStore: () => {
                const store = getStore()
                const token = localStorage.getItem("token");
                console.log("[flux.syncTokenFromSessionStore]Token en LocalStorage\n\n"+ token + "\n")
                if (token && token !== "") {
                    const updatedStore = { token: token };
                    setStore(updatedStore);
                    console.log("[flux.syncTokenFromSessionStore]Token en store\n\n"+ store.token + "\n")
                }
            },

			// Función para registrar un usuario
			signup: (username, email, password, confirm_password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, email, password, confirm_password }),
				})
					.then((resp) => {
						if (!resp.ok) {
							throw new Error("[flux.signup] register-error");
						}
						return resp.json(); // Parsea la respuesta JSON
					})
					.then((data) => {
						// Si la operación es exitosa, procede con el inicio de sesión
						localStorage.setItem("token", data.token);
						setStore({ token: data.token, logError: null });
					})
					.catch((error) => {
						// Si hay un error, manejarlo y establecer el estado adecuado
						setStore({ logError: error.message, token: null });
					});
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
					throw new Error(error.message);
				}
			},
			// Función para cerrar sesión
			logout: () => {
				localStorage.removeItem("token"); // Eliminar el token del localStorage
				setStore({ token: "", isUserLogged: false, userInfo: null });
				console.log("[flux.logout] Logout, token removed");
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
			getThreadById: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/thread/${id}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getThreadById] data", data);
						setStore({ threads: data });
					} else {
						throw new Error("[flux.getThreadById] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getThreadById] Error fetching threads:", error);
				}
			},
			getCommentsByThread: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/thread-comments/${id}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getCommentsByThread] data", data);
						setStore({ threadComments: data });
					} else {
						throw new Error("[flux.getCommentsByThread] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getCommentsByThread] Error fetching threads:", error);
				}
			},
			createNewComment: async (content, thread_id, user_id) => {
				const store = getStore();
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/create-comment", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id, thread_id, content }),
					});
					if (response.ok) {
						console.log("[flux.createNewComment] Comment created successfully\n", response);
					} else {
						throw new Error("[flux.createNewComment] Failed to create new comment");
					}
				} catch (error) {
					console.error("[flux.createNewComment] Error creating new comment:", error);
				}
			},
			createNewCategory: async (name, icon) => {
				const store = getStore();
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/create-category", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ name, icon }),
					});
					if (response.ok) {
						console.log("[flux.createNewCategory] Category created successfully\n", response);
					} else {
						throw new Error("[flux.createNewCategory] Failed to create new category");
					}
				} catch (error) {
					console.error("[flux.createNewCategory] Error creating new category:", error);
				}
			}



		},
	};
};

export default getState;
