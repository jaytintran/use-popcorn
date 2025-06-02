import { useState, useEffect } from "react";

const useKey = () => {
	const [selectedId, setSelectedId] = useState(null);
	useEffect(() => {
		function handleEscapeKey(e) {
			if (e.code === "Escape") {
				setSelectedId(null);
			}
		}
		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [selectedId]);

	return { selectedId, setSelectedId };
};

export default useKey;
