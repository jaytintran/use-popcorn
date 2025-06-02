import { useState, useEffect } from "react";

export default function useMovies(query, callback) {
	const KEY = process.env.REACT_APP_OMDB_API_KEY;
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// Callback function to handle the selected movie
	callback && callback();

	// Debounce the search
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 1000);

		return () => clearTimeout(timer); // ✅ cleanup on next effect call or unmount
	}, [query]);

	useEffect(() => {
		const controller = new AbortController();

		async function fetchMovies() {
			try {
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`,
					{ signal: controller.signal }
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
				console.log(err.message);
				if (err.name !== "AbortError") {
					setError(`Movie fetch error: ${err.message}`);
					setMovies([]);
				}
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

		return () => {
			controller.abort();
		};
	}, [KEY, debouncedQuery]);

	return { movies, isLoading, error };
}
