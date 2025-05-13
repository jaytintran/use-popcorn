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

export default function App() {
	const KEY = process.env.REACT_APP_OMDB_API_KEY;
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	const [selectedId, setSelectedId] = useState(null);

	// useEffect(() => {
	// 	console.log("After initial render");
	// }, []);

	// useEffect(() => {
	// 	console.log("After every render");
	// });

	// console.log("During render. Always get logged first");

	// Debounce the search
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 1000);

		return () => clearTimeout(timer); // ✅ cleanup on next effect call or unmount
	}, [query]);

	useEffect(() => {
		// console.log("After query change");
		async function fetchMovies() {
			try {
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`
				);

				if (!res.ok) {
					throw new Error("Something went wrong.");
				}

				const data = await res.json();

				if (data.Response === "False") {
					throw new Error(data.Error);
				}

				setMovies(data.Search);
			} catch (err) {
				setError(`Movie fetch error: ${err.message}`);
				setMovies([]);
			} finally {
				setIsLoading(false);
			}
		}
		if (!debouncedQuery || debouncedQuery.length < 3) {
			setMovies([]);
			setError("");
			setIsLoading(false);
			return;
		}

		fetchMovies();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery]);

	useEffect(() => {}, [selectedId]);

	// Wrong Way to Fetch
	// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		setMovies(data.Search);
	// 		console.log(movies);
	// 	});

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
							onCloseMovie={() => setSelectedId(null)}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
