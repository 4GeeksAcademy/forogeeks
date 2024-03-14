import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import TrendingThreads from "./Trending/TrendingThread.jsx";

// ICONS
import Icon from "./icons/icon.jsx";

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
			<div className="d-flex flex-column ps-3 pt-3 pb-0">
				<div className="d-flex flex-row pt-2 ps-1">
					<Icon name="FLAME" size={25} color="currentColor" />
					<h4 className="p-0 m-0">Trending</h4>
				</div>
				<div>
					<span className="text-muted small ps-2">Los hilos del momento</span>
				</div>
			</div>

			<div>
				<div className="pb-3">
			<hr className="hr mb-0 mx-2" style={{ opacity: "10%" }}></hr>
					{trending &&
						// Mapear TrendingThreads por cada thread
						trending.slice(0, 5).map((thread, index) => (
							<TrendingThreads
								key={index}
								possition={index}
								title={thread.title}
								likes={thread.likes}
								number_of_comments={thread?.thread_comments?.length}
								author={thread.user.user_name}
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
