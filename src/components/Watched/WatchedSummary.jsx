const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
	// These 3 are derived state derived from the watched array state.
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span style={{ display: "flex", gap: ".5rem" }}>
						<span>{watched.length}</span>
						<span>movies</span>
					</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span style={{ display: "flex", gap: ".5rem" }}>
						<span>{avgRuntime}</span>
						<span>mins</span>
					</span>
				</p>
			</div>
		</div>
	);
};

export default WatchedSummary;
