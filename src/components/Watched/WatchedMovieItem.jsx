const WatchMovieItem = ({ movie, onRemoveWatchedMovie, watched }) => {
	function handleRemoveWatchedMovie() {
		const newWatchedArray = watched.filter(
			(watched) => watched.imdbID !== movie.imdbID
		);
		onRemoveWatchedMovie(newWatchedArray);
	}

	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} mins</span>
				</p>
			</div>
			<button onClick={handleRemoveWatchedMovie} className="btn-delete">
				Remove
			</button>
		</li>
	);
};

export default WatchMovieItem;
