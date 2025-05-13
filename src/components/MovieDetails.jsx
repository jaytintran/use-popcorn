import React, { useEffect, useState } from "react";
import StarsRating from "./StarsRating";

const MovieDetails = ({ selectedId, onCloseMovie }) => {
	const KEY = process.env.REACT_APP_OMDB_API_KEY;
	const [movieDetails, setMovieDetails] = useState({});

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

				console.log(data);
				setMovieDetails(data);
			} catch (err) {
				console.log(`Movie details fetch error: ${err.message}`);
			}
		}
		fetchMovieDetails();
	}, [KEY, selectedId]);

	const {
		Title,
		Year,
		Plot,
		Poster,
		Runtime,
		Genre,
		Director,
		Actors,
		imdbRating,
		imdbVotes,
		imdbID,
	} = movieDetails;
	return (
		<div className="details">
			<header>
				<button className="btn-back" onClick={() => onCloseMovie()}>
					Go Back
				</button>
				<img
					src={Poster}
					alt={`${Title} poster`}
					style={{ borderRadius: "1rem", margin: "0 auto" }}
				/>
			</header>

			<div className="details-overview" style={{ marginTop: "5rem" }}>
				<h2>{Title}</h2>
				<div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
					<p>{Runtime}</p>
					<p>{Genre}</p>
					<p>{Year}</p>
					<p>{imdbRating}⭐</p>
				</div>

				<section style={{ paddingLeft: "0", paddingTop: "1rem" }}>
					<p>
						<em>{Plot}</em>
					</p>
					<p>Starring: {Actors}</p>
					<p>Directed by: {Director}</p>
				</section>
				<span>Rate this movie: </span>
				<StarsRating maxRating={10} size={20} />
			</div>
		</div>
	);
};

export default MovieDetails;
