import React from "react";

/*Nota  
Cambiar nombres
stroke-width > strokeWidth 
stroke-linecap > strokeLinecap  
stroke-linejoin > strokeLinejoin

Eliminar propiedades
xmlns y class
*/
export default function ARROWLEFT({ size = 24, color = "currentColor" }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke={color}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l14 0" />
			<path d="M5 12l4 4" />
			<path d="M5 12l4 -4" />
		</svg>
	);
}
