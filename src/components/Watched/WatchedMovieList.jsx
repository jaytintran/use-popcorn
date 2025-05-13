import WatchMovieItem from "./WatchedMovieItem";

const WatchedMovieList = ({ watched }) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchMovieItem movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
};

export default WatchedMovieList;
