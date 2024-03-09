const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
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
            token: null
        },
        actions: {
            // Función para obtener un mensaje desde el backend
            getMessage: () => {
                // Hacer una solicitud para obtener un mensaje desde el backend
                fetch(process.env.BACKEND_URL + "/hello")
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error("Error loading message from backend");
                        }
                        return resp.json();
                    })
                    .then(data => setStore({ message: data.message }))
                    .catch(error => console.log(error));
            },

            // Función para registrar un usuario
signup: (username, email, password) => {
    fetch(process.env.BACKEND_URL + "/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error("register-error");
        }
        return resp.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Si la operación es exitosa, procede con el inicio de sesión
        getActions().login(username, email, password);
    })
    .catch(error => {
        // Si hay un error, manejarlo y establecer el estado adecuado
        setStore({ logError: error.message, token: null });
    });
},


			// Función para iniciar sesión de usuario
login: (email, password) => {
    fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error("authentication-error");
        }
        return resp.json();
    })
    .then(data => {
        // Si la operación de inicio de sesión es exitosa, almacenar el token en el estado
        setStore({ token: data.token, logError: null });
    })
    .catch(error => {
        // Si hay un error, manejarlo y establecer el estado adecuado
        setStore({ token: null, logError: error.message });
    });
},

			// Función para cerrar sesión
			logout: () => setStore({ token: null })
        }
    };
};

export default getState;
