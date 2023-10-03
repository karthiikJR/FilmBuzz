/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./profile.css";
import Saved from "../../components/saved/Saved";
import requests from "../../requests/requests";
import axios from "axios";

function Profile() {
	const userId = window.localStorage.getItem("userID");
	const [userDetails, setUserDetails] = useState({
		movies: [],
		tvShows: [],
	});
	function getGenreString(genres) {
		return genres.map((genre) => genre.name).join(", ");
	}

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3001/getUserDetails",
					{
						userId,
					}
				);
				const { movies, tvShows } = response.data;
				setUserDetails({ movies, tvShows });
				console.log(userId);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
			console.log(userDetails);
		};

		fetchUserDetails();
	}, []);

	return (
		<div className="profileContainer">
			{userDetails.tvShows.map((tvShow) => (
				<Saved
					key={tvShow.id}
					title={tvShow.original_title}
					id={tvShow.id}
					thumbnail={tvShow.poster_path}
					media_type="tv"
					date={tvShow.air_date}
					description={tvShow.overview}
					genre={getGenreString(tvShow.genres)}
					time={tvShow.last_episode_to_air.episode_number}
					backdrop={tvShow.backdrop_path}
				/>
			))}
		</div>
	);
}

export default Profile;
