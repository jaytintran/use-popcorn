import Movie from "./Movie";

const MovieList = ({ movies, selectedId, setSelectedId }) => {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
				/>
			))}
		</ul>
	);
};

export default MovieList;
