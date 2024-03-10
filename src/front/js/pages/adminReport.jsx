import React from "react";
import { Link } from "react-router-dom";
import ThreadReport from "../components/admin/threadReport.jsx";

import IndividualThreadExternalView from "../components/Thread/threadOverView.jsx";

const example = [
	{
		title: "¿Qué es el Lorem Ipsum?",
		likes: 20,
		coments: 10,
	},
	{
		title: "¿Por qué usamos Lorem Ipsum?",
		likes: 10,
		coments: 5,
	},
	{
		title: "¿De donde viene el Lorem Ipsum?",
		likes: 5,
		coments: 2,
	},
	{
		title: "¿Por qué lo usamos?",
		likes: 15,
		coments: 7,
	},
	{
		title: "¿Dónde puedo conseguirlo?",
		likes: 12,
		coments: 3,
	},
];

// Falta hacer el aside con el trending y los 4geeks

export const AdminReport = ({ math }) => {
	// const { category } = math.params;

	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-12 ">
					<div className="shadow-sm rounded-3 mb-4 p-3">
						<h3>Threads: {}</h3>
						{example.map((example, index) => {
							return (
								<ThreadReport
									key={index}
									title={example.title}
									likes={example.likes}
									coments={example.coments}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
