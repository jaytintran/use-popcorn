import React, { useEffect, useRef, useState } from "react";
import StarsRating from "./StarsRating";

const Loading = () => {
	return (
		<p style={{ color: "white", fontSize: "2rem", margin: "2rem" }}>
			Loading...
		</p>
	);
};

const MovieDetails = ({
	selectedId,
	onCloseMovie,
	onAddWatchedMovie,
	onRemoveWatchedMovie,
	watched = [],
}) => {
	const countRef = useRef(0);

	const KEY = process.env.REACT_APP_OMDB_API_KEY;
	const [movieDetails, setMovieDetails] = useState({});
	const [userRating, setUserRating] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// update the count ref when use rates the movie
		if (userRating) countRef.current = countRef.current + 1;
	}, [userRating]);

	useEffect(() => {
		async function fetchMovieDetails() {
			try {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);

				if (!res.ok) {
					throw new Error("Something went wrong.");
				}

				const data = await res.json();

				if (data.Response === "False") {
					throw new Error(data.Error);
				}

				// console.log(data);
				setMovieDetails(data);
				setIsLoading(false);
			} catch (err) {
				console.log(`Movie details fetch error: ${err.message}`);
			}
		}
		fetchMovieDetails();
	}, [KEY, selectedId]);

	const {
		Title: title,
		Year: year,
		Plot: plot,
		Poster: poster,
		Runtime: runtime,
		Genre: genre,
		Director: director,
		Actors: actors,
		imdbRating,
		imdbVotes,
	} = movieDetails;

	useEffect(() => {
		if (!title) return;
		title && (document.title = `Movie: ${title}`);
		// Clean up
		return () => {
			document.title = `Use Pop Corn`;
		};
	}, [title]);

	const isAdded = watched.find((movie) => movie.imdbID === selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	function handleAddMovie() {
		const newMovie = {
			title,
			year,
			poster,
			runtime: Number(runtime.split(" ")[0]),
			userRating: Number(userRating),
			imdbRating: Number(imdbRating),
			imdbVotes: Number(imdbVotes.replace(/,/g, "")),
			imdbID: selectedId,
			countRatingDecisions: countRef.current,
		};
		console.log(newMovie);

		onAddWatchedMovie(newMovie);
		onCloseMovie();
	}

	function handleRemoveMovie() {
		// Iterate through the 'watched' array, only return the movie if its imdbID does not match the selectedId.
		const newWatchedArray = watched.filter(
			(movie) => movie.imdbID !== selectedId
		);
		onRemoveWatchedMovie(newWatchedArray);
		onCloseMovie();
	}

	return (
		<div className="details">
			{isLoading ? (
				<Loading />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={() => onCloseMovie()}>
							Go Back
						</button>
						<img
							src={poster}
							alt={`${title} poster`}
							style={{ borderRadius: "1rem", margin: "0 auto" }}
						/>
					</header>

					<div className="details-overview" style={{ marginTop: "5rem" }}>
						<h2>{title}</h2>
						<div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
							<p>{runtime}</p>
							<p>{genre}</p>
							<p>{year}</p>
							<p>{imdbRating}⭐</p>
						</div>

						<section style={{ paddingLeft: "0", paddingTop: "1rem" }}>
							<p>
								<em>{plot}</em>
							</p>
							<p>Starring: {actors}</p>
							<p>Directed by: {director}</p>
						</section>

						<section style={{ display: "flex", gap: "1rem", padding: 0 }}>
							{isAdded ? (
								<>
									<span>You've Rated This Movie: {watchedUserRating} ⭐</span>
									<button className="btn-add" onClick={handleRemoveMovie}>
										Remove from Watched
									</button>
								</>
							) : (
								<>
									<span>Rate this movie: </span>
									<StarsRating
										maxRating={10}
										size={20}
										onRate={setUserRating}
									/>
									<button className="btn-add" onClick={handleAddMovie}>
										Add to Watched
									</button>
								</>
							)}
						</section>
					</div>
				</>
			)}
		</div>
	);
};

export default MovieDetails;
