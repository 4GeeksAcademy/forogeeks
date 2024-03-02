import React from "react";
import PropTypes from "prop-types";

// Importa los iconos individualmente
import LOGOUT from "./logout.jsx";
import ARROWRIGHT from "./arrow-right.jsx";
import ARROWLEFT from "./arrow-left.jsx";

// Objeto que mapea nombres de iconos a componentes de iconos
const ICONS = {
	LOGOUT,
	ARROWRIGHT,
};

const Icon = ({ name, size, color }) => {
	// Obtiene el componente de icono correspondiente al nombre
	const IconComponent = ICONS[name];

	// Renderiza el componente de icono
	return <IconComponent size={size} color={color} />;
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Icon;
