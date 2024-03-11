import React, { useContext, useEffect, useState } from "react";
import { IconFlame } from "@tabler/icons-react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import TrendingThreads from "./Trending/TrendingThread.jsx";

const AsideTrending = () => {
	const { store, actions } = useContext(Context);
	const threads = store.threads;
	const { category } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		actions.getTrendingThreads(category).then(() => {
			setLoading(false);
		});
		console.log("[threads] useParams: ", category)

	}, []);

	return (
		<div className="shadow-sm rounded-3 p-3 mb-2 bg-white">
			<div className="d-flex">
				<IconFlame size={24} stroke={1.5} />
				<h4 className="mb-4 ms-2">Trending Threads</h4>
			</div>
			<div>
				<div className="d-flex flex-column align-items-center">
					{
						// Mapear TrendingThreads por cada thread
						threads.map((thread, index) => (
							<TrendingThreads
								key={index}
								title={thread.title}
								likes={thread.likes}
								number_of_comments={thread?.thread_comments?.length}
								autor={thread.autor}
								date={thread.date}
								category={thread.category}
								id={thread.id}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default AsideTrending;
