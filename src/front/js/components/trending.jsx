import React, { useContext, useEffect, useState } from "react";
import { IconFlame } from "@tabler/icons-react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import TrendingThreads from "./Trending/TrendingThread.jsx";

const AsideTrending = () => {
	const { store, actions } = useContext(Context);

	// const [threads, setThreads] = useState({arr: [], loading: true});
	const trending = store.trending;
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		actions.getTrendingThreads()
			setLoading(false);
			// setThreads({arr: store.trendingThreads, loading: false})
	

	}, []);

	return (
		<div className="shadow-sm rounded-3 mb-2 bg-white">
			<div className="d-flex ps-3 pt-3 pb-0">
				<IconFlame size={26} stroke={1.5} />
				<h4 className="">Trending</h4>
			</div>
			<div>
				<div className="d-flex flex-column align-items-center">
					{trending &&
						// Mapear TrendingThreads por cada thread
						trending.slice(0, 5).map((thread, index) => (
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
