import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ children }) => {
	return (
		<button className="btn btn-primary align-items-center">
			{children}
		</button>
	);
};
