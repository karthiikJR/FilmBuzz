/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./profile.css";
import Saved from "../../components/saved/Saved";
import axios from "axios";
import { circle_user } from "../../assets";
import { useCookies } from "react-cookie";

function Profile() {
	const API = import.meta.env.VITE_TMDB_API_KEY;
	const [userDetails, setUserDetails] = useState({});
	const [mediaData, setMediaData] = useState([]);
	
	const userId = window.localStorage.getItem("userID");

	async function fetchData(type, id) {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}?api_key=${API}&language=en-US`
			);

			if (!response.ok) {
				throw new Error(`Error fetching data for ID ${id}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching ${type}:`, error);
			throw error;
		}
	}

	useEffect(() => {
		const fetchDataForUser = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/getUserDetails?userId=${userId}`
				);
				setUserDetails(response.data);

				const tvShows = response.data?.tvShows || [];
				const movies = response.data?.movies || [];

				const tvShowPromises = tvShows.map(async (tvshow) => {
					const tvShowData = await fetchData("tv", tvshow);
					return tvShowData;
				});

				const moviePromises = movies.map(async (movie) => {
					const movieData = await fetchData("movie", movie);
					return movieData;
				});

				const resolvedTVShows = await Promise.all(tvShowPromises);
				const resolvedMovies = await Promise.all(moviePromises);

				setMediaData([...resolvedTVShows, ...resolvedMovies]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDataForUser();
	}, [userDetails, mediaData]);
	

	return (
		<div className="profileContainer">
			<div className="profile_user">
				<h1 className="profile_header">Hello User!</h1>
				<img src={circle_user} alt="USER" className="profile_icon" />
				<button className="profilelogoutbtn">
					<span >LOGOUT</span>
				</button>
			</div>
			<h2 className="profile_subheading">
				Discover Your Saved Movies and TV Shows Collection Here
			</h2>

			{mediaData.map((media) => {
				const mediaType = media.original_title ? "movie" : "tv";
				return (
					<Saved
						key={media.id}
						title={media.original_title || media.original_name}
						id={media.id}
						thumbnail={media.poster_path}
						media_type={mediaType}
						description={media.overview}
						backdrop={media.backdrop_path}
					/>
				);
			})}
		</div>
	);
}



export default Profile;
