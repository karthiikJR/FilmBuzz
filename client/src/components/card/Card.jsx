/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./card.css";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

const genreData = [
	{ name: "Action", id: 28 },
	{ name: "Adventure", id: 12 },
	{ name: "Animation", id: 16 },
	{ name: "Comedy", id: 35 },
	{ name: "Crime", id: 80 },
	{ name: "Documentary", id: 99 },
	{ name: "Drama", id: 18 },
	{ name: "Family", id: 10751 },
	{ name: "Fantasy", id: 14 },
	{ name: "History", id: 36 },
	{ name: "Horror", id: 27 },
	{ name: "Music", id: 10402 },
	{ name: "Mystery", id: 9648 },
	{ name: "Romance", id: 10749 },
	{ name: "Science Fiction", id: 878 },
	{ name: "TV Movie", id: 10770 },
	{ name: "Thriller", id: 53 },
	{ name: "War", id: 10752 },
	{ name: "Western", id: 37 },
	{ name: "Action & Adventure", id: 10759 },
	{ name: "Animation", id: 16 },
	{ name: "Comedy", id: 35 },
	{ name: "Crime", id: 80 },
	{ name: "Documentary", id: 99 },
	{ name: "Drama", id: 18 },
	{ name: "Family", id: 10751 },
	{ name: "Kids", id: 10762 },
	{ name: "Mystery", id: 9648 },
	{ name: "News", id: 10763 },
	{ name: "Reality", id: 10764 },
	{ name: "Sci-Fi & Fantasy", id: 10765 },
	{ name: "Soap", id: 10766 },
	{ name: "Talk", id: 10767 },
	{ name: "War & Politics", id: 10768 },
	{ name: "Western", id: 37 },
];
// eslint-disable-next-line react/prop-types
function Card({ url, title, genre, description, rating, id, media_type }) {
	const [cookies] = useCookies(["access_token"]);
	const userId = window.localStorage.getItem("userID");
	const med = media_type === "movie" ? "movie" : "tv";
	const [_, setUserDetails] = useState({
		movies: [],
		tvShows: [],
	});
	let flag = false;

	function limitText(text, limit) {
		if (text.length > limit) {
			return text.slice(0, limit) + "...";
		}
		return text;
	}

	function getGenreString(genreIds) {
		// Create a mapping of genre IDs to their names
		const genreMap = {};
		genreData.forEach((ids) => {
			genreMap[ids.id] = ids.name;
		});

		// Map genre IDs to their names
		const genreNames = genreIds
			.slice(0, Math.min(2, genreIds.length)) // Limit to 2 genres or the array length, whichever is smaller
			.map((id) => genreMap[id]);

		// Return a comma-separated string of genre names
		return genreNames.join(", ");
	}

	function generateHeartIcons(numberAsString) {
		// Convert the input string to a number
		const number = parseFloat(numberAsString);

		// Check if the number is valid
		if (!isNaN(number)) {
			// Calculate half of the number and round it to the nearest integer
			const halfNumber = Math.round(number / 2);

			// Create an array to store the generated heart icons
			const heartIcons = [];

			// Generate the heart icons based on half of the number
			for (let i = 0; i < halfNumber; i++) {
				heartIcons.push(<ion-icon key={i} name="heart"></ion-icon>);
			}

			// Return the array of heart icons
			return heartIcons;
		}

		// Return null if the input is not a valid number
		return null;
	}

	function generateDivStyle(imageUrl) {
		return {
			backgroundImage: `url('https://image.tmdb.org/t/p/original${imageUrl}')`,
			backgroundSize: "cover",
			backgroundPosition: "center",
		};
	}

	const addContent = async (content_type, id) => {
		if (cookies.access_token) {
			try {
				const response = await axios.post("http://localhost:3001/save", {
					userId,
					content_type,
					id,
				});

				if (response.status === 200) {
					const updatedUser = response.data;
					setUserDetails(updatedUser.user);
				} else {
					console.error("API request failed");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			Swal.fire({
				title: "Error!",
				text: "You have to be logged in to save this!",
				icon: "error",
				confirmButtonText: "Okay",
				color: "#fff",
				background: "#242424",
			});
		}
	};

	const divStyle = generateDivStyle(url);
	const heartIcons = generateHeartIcons(rating);
	const limitedText = limitText(description, 200);

	return (
		<>
			<article className="card" style={divStyle}>
				<div className="card__image"></div>
				<div className="card__player">
					<div className="playerCard"></div>
				</div>
				<div className="card__info">
					<h2 className="title">{title}</h2>
					<p className="genre">{getGenreString(genre)}</p>

					<div className="desc">
						<div className="rating">
							<p className="meta limitText">{getGenreString(genre)}</p>
							<div className="stars">{heartIcons}</div>
						</div>
						<p>{limitedText}</p>
					</div>
					<div className="btn">
						<Link className="button" to={`/${med}/${id}`}>
							Preview
						</Link>
						<a className="button" href="#" onClick={() => addContent(med, id)}>
							Save
						</a>
					</div>
				</div>
			</article>
		</>
	);
}

export default Card;
