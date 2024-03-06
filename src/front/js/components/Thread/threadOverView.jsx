import React from "react";

//ICONS
import { IconMessage } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessages } from "@tabler/icons-react";

// Falta poner el Link para que redireccione a la página del thread

const IndividualThreadExternalView = ({ title, likes, coments }) => {
	return (
		<div className="container">
			<div className="w-100">
				<div className="d-flex justify-content-between align-items-center shadow-sm rounded-3 mb-4 p-3">
					<div className="d-flex align-items-center gap-2">
						<IconMessage size={20} stroke={1} />
						<p className="m-0 p-0">{title}</p>
					</div>

					<div className="d-flex justify-content-end gap-3 me-2">
						<div className="d-flex align-items-center">
							<IconHeartFilled size={20} stroke={1} />
							<span className="ms-2">{likes}</span>
						</div>
						<div className="d-flex align-items-center">
							<IconMessages size={20} stroke={1} />
							<span className="ms-2">13{coments}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndividualThreadExternalView;
