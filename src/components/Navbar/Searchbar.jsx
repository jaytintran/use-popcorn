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
		if (inputRef.current) {
			console.log(inputRef.current);
			inputRef.current.focus();
		}
	}, []);

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
