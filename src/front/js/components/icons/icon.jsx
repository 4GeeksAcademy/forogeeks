import React from "react";
import PropTypes from "prop-types";

// Importa los iconos individualmente
import LOGOUT from "./logout.jsx";
import ARROWRIGHT from "./arrow-right.jsx";
import LOGO from "./logo.jsx";
import FLAME from "./flame.jsx";
import { IconMessages } from "@tabler/icons-react";
import { IconDeviceLaptop } from "@tabler/icons-react";
import { IconHelp } from "@tabler/icons-react";
import { IconCode } from "@tabler/icons-react";
import { IconNotes } from "@tabler/icons-react";
import { IconDeviceGamepad2 } from "@tabler/icons-react";
import { IconUfo } from '@tabler/icons-react';
import { IconCoinBitcoin } from '@tabler/icons-react';

// Objeto que mapea nombres de iconos a componentes de iconos
const ICONS = {
	LOGOUT,
	ARROWRIGHT,
	LOGO,
	IconMessages,
	IconDeviceLaptop,
	IconHelp,
	IconCode,
	IconNotes,
	IconDeviceGamepad2,
	FLAME,
	IconUfo,
	IconCoinBitcoin,
};

const Icon = ({ name, size, color, stroke }) => {
	// Obtiene el componente de icono correspondiente al nombre
	const IconComponent = ICONS[name];

	// Renderiza el componente de icono
	return <IconComponent size={size} color={color} stroke={stroke} />;
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Icon;
