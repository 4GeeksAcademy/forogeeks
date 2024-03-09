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
			textEditorStore: {},
		},
		actions: {
			// Use getActions to call a function within a fuction
			setTextEditorStore: (newContent) => {
				const store = getStore();
				setStore({ textEditorStore: newContent });
			},
		},
	};
};

export default getState;
