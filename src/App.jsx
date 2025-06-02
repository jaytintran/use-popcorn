import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/Navbar/Searchbar";
import Main from "./components/Main";
import MovieList from "./components/MovieList/MovieList";
import NumResults from "./components/Navbar/NumResults";
import WatchedSummary from "./components/Watched/WatchedSummary";
import Box from "./components/Box";
import WatchedMovieList from "./components/Watched/WatchedMovieList";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorage";
import useKey from "./hooks/useKey";

export default function App() {
	const [query, setQuery] = useState("");
	// const [selectedId, setSelectedId] = useState(null);

	// Get watched movies from local storage or initialize with empty array
	const [watched, setWatched] = useLocalStorageState([], "watched");

	// Fetch movies by using useMovies custom hook
	const { movies, isLoading, error } = useMovies(query);

	// Listen for escape keypress
	const { selectedId, setSelectedId } = useKey();

	// Helper functions
	function handleAddWatchedMovie(movie) {
		setWatched((watched) => [...watched, movie]);
	}
	function handleRemoveWatchedMovie(newWatched) {
		setWatched(newWatched);
	}

	return (
		<>
			<Navbar movies={movies}>
				<SearchBar setQuery={setQuery} query={query} />
				<NumResults movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{movies.length === 0 && !error && (
						<p style={{ color: "white", fontSize: "2rem", margin: "2rem" }}>
							Please enter a search term.
						</p>
					)}
					{isLoading && !error && (
						<p style={{ color: "white", fontSize: "2rem", margin: "2rem" }}>
							Loading...
						</p>
					)}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							setSelectedId={setSelectedId}
							selectedId={selectedId}
						/>
					)}
					{error && (
						<p style={{ color: "white", fontSize: "2rem", margin: "2rem" }}>
							{error}
						</p>
					)}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={() => {
								setSelectedId(null);
							}}
							onAddWatchedMovie={handleAddWatchedMovie}
							onRemoveWatchedMovie={handleRemoveWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onRemoveWatchedMovie={handleRemoveWatchedMovie}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
