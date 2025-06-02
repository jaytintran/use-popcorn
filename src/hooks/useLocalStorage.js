import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		return JSON.parse(storedValue) || initialState;
	});

	// Save watched movies to local storage whenever watched changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
