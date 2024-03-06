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
		},
	};
};

export default getState;
