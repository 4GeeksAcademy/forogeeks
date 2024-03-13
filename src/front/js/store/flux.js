const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

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
			trending: [],
			reportedThreads: [],
			user_name: "",
			user_profile_image: "",
			user: null,
			favoriteThreads: [],
			likedThreads: [],
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
				if (token && token !== "") {
					const updatedStore = { token: token };
					setStore(updatedStore);
					// console.log("[flux.syncTokenFromSessionStore]Token en store\n\n" + store.token + "\n");
					getActions().getUserInfo();
				} else {
					setStore({ isUserLogged: false });
				}
			},

			// Función para registrar un usuario
			signup: async (username, email, password, confirm_password, profilePicture) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password, confirm_password, profile_picture: profilePicture }),
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
					setStore({ token: data.token, logError: null, user: data.user });
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
						setStore({ userInfo: data, profilePicture: data.profile_picture })
						setStore({ isUserLogged: true })
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
						body: JSON.stringify({ user_id, title, content, category }),
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
			getThreadsByCategory: async (category, user_name) => {
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
			// En el archivo getState.js
			getTrendingThreads: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/trending", {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getAllThreads] data", data);
						setStore({ trending: data });
					} else {
						throw new Error("[flux.getAllThreads] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getAllThreads] Error fetching threads:", error);
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
					const response = await fetch(process.env.BACKEND_URL + `/api/comments/${id}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getCommentsByThread] threadComments", data);
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
			reportThread: async (thread_id, user_id, reason) => {
				const store = getStore();
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/report-thread", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ thread_id, user_id, reason }),
					});
					if (response.ok) {
						console.log("[flux.reportThread] Thread reported successfully\n", response);
					} else {
						throw new Error("[flux.reportThread] Failed to report thread");
					}
				} catch (error) {
					console.error("[flux.reportThread] Error reporting thread:", error);
				}
			},
			createCategory: async (title, icon) => {
				const store = getStore();
				const token = localStorage.getItem("token");

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/create-category`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ title, icon }),

					});

					if (response.ok) {
						const newCategory = await response.json();

						console.log('[flux.createCategory] Category created successfully:', newCategory);
					} else {
						const errorData = await response.json(); // Parse error message
						throw new Error(`[flux.createCategory] Failed to create category: ${errorData.message}`);
					}
				} catch (error) {
					console.error('[flux.createCategory] Error creating category:', error);

				}
			},
			getReportedThreads: async () => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/admin-reports", {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getReportedThreads] data", data);
						setStore({ reportedThreads: data });
					} else {
						throw new Error("[flux.getReportedThreads] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getReportedThreads] Error fetching threads:", error);
				}
			},
			getThreadById: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/threads/${id}`, {
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

			sendForgotPasswordEmail: async (email, setAlertMessage, setAlertType) => {
				try {
					const options = {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: email })
					};

					const response = await fetch(process.env.BACKEND_URL + '/api/sendemail', options);
					const data = await response.json();

					console.log("Respuesta del servidor:", data);

					if (response.status === 200 && data.msg === "success") {
						setAlertMessage("Comprueba tu email para restablecer la contraseña.");
						setAlertType("success");
					} else if (response.status === 404) {
						setAlertMessage("No existen cuentas con el email enviado. Prueba de nuevo");
						setAlertType("warning");
					} else {
						setAlertMessage("Error inesperado. Por favor, inténtalo de nuevo.");
						setAlertType("warning");
					}
				} catch (error) {
					console.error("Error en la solicitud:", error);
					setAlertMessage("ERROR: Something went wrong");
					setAlertType("danger");
				}
			},
			resetPassword: async (token, newPassword) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/resetpassword`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ password: newPassword }),
					});
					const data = await response.json();

					if (response.ok) {
						return { success: true };
					} else {
						return { success: false, error: data.msg || "Error al restablecer la contraseña." };
					}
				} catch (error) {
					console.error("Error al restablecer la contraseña:", error);
					return { success: false, error: "Error al restablecer la contraseña. Por favor, inténtalo de nuevo." };
				}
			},

			changePassword: async (token, newPassword) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/changepassword`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`, // Asegúrate de incluir el token en el encabezado
						},
						body: JSON.stringify({ password: newPassword }),
					});
					const data = await response.json();

					// Log de la respuesta JSON para depuración
					console.log('Response data:', data);

					if (response.ok) {
						return { success: true };
					} else {
						return { success: false, error: data.msg || "Error al cambiar la contraseña." };
					}
				} catch (error) {
					console.error("Error al cambiar la contraseña:", error);
					return { success: false, error: "Error al cambiar la contraseña. Por favor, inténtalo de nuevo." };
				}
			},
			changeEmail: async (token, newEmail) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/changeemail`, { // Corrige la URL de la solicitud fetch
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ email: newEmail }), // Asegúrate de enviar el nuevo correo electrónico en el cuerpo de la solicitud
					});
					const data = await response.json();

					// Log de la respuesta JSON para depuración
					console.log('Response data:', data);

					if (response.ok) {
						return { success: true };
					} else {
						return { success: false, error: data.msg || "Error al cambiar el email." };
					}
				} catch (error) {
					console.error("Error al cambiar el email:", error);
					return { success: false, error: "Error al cambiar el email. Por favor, inténtalo de nuevo." };
				}
			},
			getThreadsByTitle: async (query) => {
				try {
					console.log('Searching for:', query); // Verifica que se esté llamando correctamente
					const response = await fetch(`${process.env.BACKEND_URL}/api/threads/search/${query}`);
					if (response.ok) {
						const data = await response.json();
						console.log('Search results:', data); // Verifica los resultados de la búsqueda
						setStore({ threads: data });
					} else {
						throw new Error('Failed to fetch search results');
					}
				} catch (error) {
					console.error("[flux.changePassword] Error durante la solicitud para cambiar contraseña:", error);
					return { success: false, error: error.message || "Failed to change password" };
				}
			},
			getThreadsByTitle: async (query) => {
				try {
					console.log('Searching for:', query); // Verifica que se esté llamando correctamente
					const response = await fetch(`${process.env.BACKEND_URL}/api/threads/search/${query}`);
					if (response.ok) {
						const data = await response.json();
						console.log('Search results:', data); // Verifica los resultados de la búsqueda
						setStore({ threads: data });
					} else {
						throw new Error('Failed to fetch search results');
					}
				} catch (error) {
					console.error('Error searching threads:', error);
				}
			},
			getUserNameById: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/user/${id}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getUserNameById] data", data);
						setStore({ ...store, user_name: String(data["username"]) });
					} else {
						throw new Error("[flux.getUserById] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getUserById] Error fetching threads:", error);
				}
			},
			getUserProfileImageById: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/user/profile-picture/${id}`, {
						method: "GET",
					});
					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getUserProfileImageById] data", data);
						setStore({ ...store, user_profile_image: String(data["profile_picture"]) });
					} else {
						throw new Error("[flux.getUserById] Failed to fetch threads");
					}
				} catch (error) {
					console.error("[flux.getUserById] Error fetching threads:", error);
				}
			},
			favoriteThread: async ({ user_id, thread_id }) => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorite-thread`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id, thread_id }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.favoriteThread] Thread added to favorites successfully:", data);
						return { success: true, message: "Thread added to favorites successfully" };
					} else {
						const errorMessage = await response.text(); // Get error message from response body
						throw new Error(errorMessage || "Failed to add thread to favorites");
					}
				} catch (error) {
					console.error("[flux.favoriteThread] Error adding thread to favorites:", error);
					return { success: false, error: "Error adding thread to favorites. Please try again." };
				}
			},
			// En el archivo getState.js
			unfavoriteThread: async ({ user_id, thread_id }) => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/unfavorite-thread`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id, thread_id }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.unfavoriteThread] Thread removed from favorites successfully:", data);
						return { success: true };
					} else {
						throw new Error("Failed to remove thread from favorites");
					}
				} catch (error) {
					console.error("[flux.unfavoriteThread] Error removing thread from favorites:", error);
					return { success: false, error: "Error removing thread from favorites. Please try again." };
				}
			},
			getUserFavoriteThreads: async () => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/userfavoritethreads`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getUserFavoriteThreads] Favorite threads fetched successfully:", data);
						setStore({ favoriteThreads: data });
						return { success: true };
					} else {
						const errorMessage = await response.text();
						throw new Error(errorMessage || "Failed to fetch favorite threads");
					}
				} catch (error) {
					console.error("[flux.getUserFavoriteThreads] Error fetching favorite threads:", error);
					return { success: false, error: "Error fetching favorite threads. Please try again." };
				}
			},
			likedThread: async ({ user_id, thread_id }) => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/liked-thread`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id, thread_id }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.likedThread] Thread added to favorites successfully:", data);
						return { success: true, message: "Hilo añadido a gustados" };
					} else {
						const errorMessage = await response.text(); // Get error message from response body
						throw new Error(errorMessage || "Error al añadir a gustados");
					}
				} catch (error) {
					console.error("[flux.likedThread] Error añadiendo el hilo a gustados:", error);
					return { success: false, error: "Error añadiendo el hilo a gustados. Prueba de nuevo." };
				}
			},
			// En el archivo getState.js
			unlikedThread: async ({ user_id, thread_id }) => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/unliked-thread`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ user_id, thread_id }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.unlikedThread] Este hilo ya no te gusta:", data);
						return { success: true };
					} else {
						throw new Error("Error al quitar el hilo de gustados");
					}
				} catch (error) {
					console.error("[flux.unlikedThread] Error al eliminar el hilo de gustados:", error);
					return { success: false, error: "Error al eliminar el hilo de gustados. Prueba de nuevo." };
				}
			},
			getUserLikedThreads: async () => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}/api/userlikedthreads`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						console.log("[flux.getUserLikedThreads] Liked threads fetched successfully:", data);
						setStore({ likedThreads: data });
						return { success: true };
					} else {
						const errorMessage = await response.text();
						throw new Error(errorMessage || "Failed to fetch liked threads");
					}
				} catch (error) {
					console.error("[flux.getUserLikedThreads] Error fetching liked threads:", error);
					return { success: false, error: "Error fetching liked threads. Please try again." };
				}
			},

		},
	};
};

export default getState;
