import React from "react";
import { IconFlame } from "@tabler/icons-react";

const AsideTrending = () => {
	return (
		<div className="shadow-sm rounded-3 p-3 mb-2 bg-white">
			<div className="d-flex flex-row">
				<IconFlame size={27} stroke={1} />
				<h4 className="d-flex">Trending</h4>
			</div>
		</div>
	);
};

export default AsideTrending;
