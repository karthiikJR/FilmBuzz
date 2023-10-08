import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";

import "./search.css";

function Search() {
	const [searchContent, setSearchContent] = useState([]);
	const { type } = useParams();
	const data = type.split("_");
	const media_type = data[0];
	const query = data[1];
	const API = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {
		try {
			fetch(
				`https://api.themoviedb.org/3/search/${media_type}?api_key=${API}&language=en-US&query=${query}&page=1&include_adult=false`
			)
				.then((response) => response.json())
				.then((data) => {
					setSearchContent(data.results);
				});
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	}, []);

	return (
		<>
			<h1 className="heading">Search results</h1>
			<div className="container_search">
				{searchContent.map((movie) => (
					<Card
						key={movie.id}
						url={movie.poster_path}
						title={movie.name}
						genre={movie.genre_ids}
						description={movie.overview}
						rating={movie.vote_average}
						id={movie.id}
						media_type={media_type}
					/>
				))}
			</div>
		</>
	);
}

export default Search;
