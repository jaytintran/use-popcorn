import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
	display: "flex",
	gap: "0.5rem",
	fontSize: "1.2rem",
	alignItems: "center",
	backgroundColor: "var(--color-background-100)",
	borderRadius: "10rem",
	position: "relative",
};

const starContainerStyle = {
	display: "flex",
	gap: ".25rem",
};

const tooltipStyle = {
	position: "absolute",
	backgroundColor: "var(--color-background-900)",
	color: "var(--color-text)",
	padding: "0.5rem 1rem",
	borderRadius: "0.5rem",
	fontSize: "1.2rem",
	top: "-40px",
	left: "50%",
	transform: "translateX(-50%)",
	boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
	zIndex: 10,
	opacity: 0,
	visibility: "hidden",
	transition: "opacity 0.2s, visibility 0.2s",
};

const Star = ({ isFull, onRate, onHover, onLeave, color, size, className }) => {
	const starStyle = {
		lineHeight: 0,
		margin: 0,
		height: `${size}px`,
		width: `${size}px`,
		cursor: "pointer",
	};
	return (
		<span
			onClick={onRate}
			onMouseEnter={onHover}
			onMouseLeave={onLeave}
			role="button"
			style={starStyle}
		>
			{isFull ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill={color}
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke={color}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="{2}"
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
			)}
		</span>
	);
};

const StarsRating = ({
	maxRating = 5,
	color = "#ffd166",
	size = 30,
	className = "",
	messages = ["Excellent", "Good", "Average", "Bad", "Terrible"],
	defaulRating = 0,
	onSetRating,
}) => {
	const [rating, setRating] = useState(defaulRating);
	const [hoverRating, setHoverRating] = useState(0);
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const handleRating = (rating) => {
		setRating(rating);
	};

	const handleHoverRating = (rating) => {
		setHoverRating(rating);
		setIsTooltipVisible(true);
	};

	const handleMouseLeave = () => {
		setHoverRating(0);
		setIsTooltipVisible(false);
	};

	useEffect(() => {
		onSetRating && onSetRating(rating);
	}, [rating, onSetRating]);

	const activeTooltipStyle = {
		...tooltipStyle,
		opacity: isTooltipVisible ? 1 : 0,
		visibility: isTooltipVisible ? "visible" : "hidden",
	};

	const message =
		messages.length === maxRating
			? messages.reverse()[hoverRating ? hoverRating - 1 : rating - 1]
			: hoverRating || (rating > 0 && rating) || "Rate this film!";

	return (
		<div
			style={containerStyle}
			className={className}
			onMouseLeave={handleMouseLeave}
		>
			{(hoverRating || rating > 0) && (
				<div style={activeTooltipStyle}>{message}</div>
			)}
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }).map((_, index) => {
					return (
						<Star
							key={index}
							size={size}
							color={color}
							isFull={
								hoverRating ? hoverRating >= index + 1 : rating >= index + 1
							}
							onRate={() => handleRating(index + 1)}
							onHover={() => handleHoverRating(index + 1)}
							onLeave={() => {}}
						/>
					);
				})}
			</div>
		</div>
	);
};

StarsRating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	messages: PropTypes.array,
	defaulRating: PropTypes.number,
	onSetRating: PropTypes.func,
};

export default StarsRating;
