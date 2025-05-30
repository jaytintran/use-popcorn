import { useEffect, useRef } from "react";

const SearchBar = ({ query, setQuery }) => {
	const inputRef = useRef(null);
	// useEffect(
	// 	function () {
	// 		const el = document.querySelector(".search");
	// 		console.log(el);
	// 		el.focus();
	// 	},
	// 	[setQuery, query]
	// );

	useEffect(() => {
		function callback(e) {
			if (document.activeElement === inputRef.current) return;

			if (e.code === "Enter") {
				inputRef.current.focus();
				setQuery("");
			}
		}
		document.addEventListener("keydown", callback);

		return () => document.addEventListener("keydown", callback);
	}, [setQuery]);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputRef}
		/>
	);
};

export default SearchBar;
