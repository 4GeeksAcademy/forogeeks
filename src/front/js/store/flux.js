const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendUrl:
				"https://automatic-bassoon-v469wrv5xxvf6w7q-3001.app.github.dev",
			categories: [
				{
					name: "General",
					icon: "IconMessages",
				},
				{
					name: "Tecnología",
					icon: "IconDeviceLaptop",
				},
				{
					name: "Snippets de código",
					icon: "IconCode",
				},
				{
					name: "Empleo y prácticas",
					icon: "IconNotes",
				},
				{
					name: "Videojuegos",
					icon: "IconDeviceGamepad2",
				},
				{
					name: "Info / Ayuda",
					icon: "IconHelp",
				},
			],
			logError: null,
			token: "",
			modalRegistersuccess: false,
		},
		actions: {
			//Acción para mostrar modal succesfull
			setModalRegistersuccess: (value) => {
				setStore({ modalRegistersuccess: value });
			},
			// Función para obtener un mensaje desde el backend
			getMessage: () => {
				// Hacer una solicitud para obtener un mensaje desde el backend
				fetch(process.env.BACKEND_URL + "/hello")
					.then((resp) => {
						if (!resp.ok) {
							throw new Error(
								"Error loading message from backend"
							);
						}
						return resp.json();
					})
					.then((data) => setStore({ message: data.message }))
					.catch((error) => console.log(error));
			},
			// Dentro del objeto actions en getState.js
			verifyIdentity: () => {
				const token = localStorage.getItem("token");
				if (token) {
					// Realizar la verificación utilizando el token
					fetch(process.env.BACKEND_URL + "/api/verify_token", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
					})
						.then((resp) => resp.json())
						.then((data) => {
							if (data && data.user) {
								setStore({ user: data.user, token: token });
							}
						})
						.catch((e) => {
							console.error(e);
						});
				}
			},
			// Dentro del objeto actions en getState.js
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "") {
					setStore({ token: token });
				}
			},

			// Función para registrar un usuario
			signup: (username, email, password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, email, password }),
				})
					.then((resp) => {
						if (!resp.ok) {
							throw new Error("register-error");
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
				} catch (error) {
					throw new Error(error.message);
				}
			},

			// Función para cerrar sesión
			logout: () => setStore({ token: null }),
		},
		getUserInfo: async () => {
			try {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/login",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`, // Reemplazar 'token' con el token JWT del usuario
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setUserInfo(data); // Almacenar la información del usuario en el estado
					console.log(data);
					setIsUserLogged(true);
				} else {
					throw new Error("Failed to fetch user info");
				}
			} catch (error) {
				console.error("Error fetching user info:", error);
				console.log(token);
			}
		},
	};
};

export default getState;
