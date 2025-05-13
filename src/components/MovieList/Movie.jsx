import StarsRating from "../StarsRating";

const Movie = ({ movie, selectedId, setSelectedId }) => {
	const divStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2.4rem",
	};

	const handleMovieClick = () => {
		setSelectedId(selectedId === movie.imdbID ? null : movie.imdbID);
	};

	return (
		<li onClick={handleMovieClick} style={{ cursor: "pointer" }}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div style={divStyles}>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
				<StarsRating maxRating={5} size={20} />
			</div>
		</li>
	);
};

export default Movie;
