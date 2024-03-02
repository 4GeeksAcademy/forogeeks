import React from "react";

/*Nota  
Cambiar nombres
stroke-width > strokeWidth 
stroke-linecap > strokeLinecap  
stroke-linejoin > strokeLinejoin

Eliminar propiedades
xmlns y class
*/

export default function LOGOUT({ size = 24, color = "currentColor" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-logout"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={color}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
			<path d="M9 12h12l-3 -3" />
			<path d="M18 15l3 -3" />
		</svg>
	);
}
