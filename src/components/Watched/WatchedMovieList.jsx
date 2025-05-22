import WatchMovieItem from "./WatchedMovieItem";

const WatchedMovieList = ({ watched, onRemoveWatchedMovie }) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchMovieItem
					movie={movie}
					key={movie.imdbID}
					onRemoveWatchedMovie={onRemoveWatchedMovie}
					watched={watched}
				/>
			))}
		</ul>
	);
};

export default WatchedMovieList;
