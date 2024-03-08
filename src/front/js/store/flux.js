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
		},
		actions: {
			// Use getActions to call a function within a fuction
			postComentThread: (data) => {
				const store = getStore();
				const actions = getActions();
				const token = localStorage.getItem("token");
				const myHeaders = new Headers();
				myHeaders.append;

				fetch("https://localhost:5000/api/post-thread-coment", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},
		},
	};
};

export default getState;
