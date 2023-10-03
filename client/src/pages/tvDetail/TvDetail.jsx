import { useEffect, useState } from "react";
import "./tvdetail.css";
import { useParams } from "react-router-dom";

function TvDetail() {
	const API = import.meta.env.VITE_TMDB_API_KEY;
	const [currentTvDetail, setTv] = useState();
	const { id } = useParams();

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, []);

	function formatDate(dateString) {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = new Date(dateString).toLocaleDateString(
			undefined,
			options
		);
		return formattedDate;
	}

	const getData = () => {
		fetch(
			`https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => setTv(data));
	};

	return (
		<div className="movie">
			<div className="movie__intro">
				<img
					className="movie__backdrop"
					src={`https://image.tmdb.org/t/p/original${
						currentTvDetail ? currentTvDetail.backdrop_path : ""
					}`}
				/>
			</div>
			<div className="movie__detail">
				<div className="movie__detailLeft">
					<div className="movie__posterBox">
						<img
							className="movie__poster"
							src={`https://image.tmdb.org/t/p/original${
								currentTvDetail ? currentTvDetail.poster_path : ""
							}`}
						/>
					</div>
				</div>
				<div className="movie__detailRight">
					<div className="movie__detailRightTop">
						<div className="movie__name">
							{currentTvDetail ? currentTvDetail.original_title : ""}
						</div>
						<div className="movie__tagline">
							{currentTvDetail ? currentTvDetail.tagline : ""}
						</div>
						<div className="movie__rating">
							{currentTvDetail ? currentTvDetail.vote_average : ""} &#10027;
							<span className="movie__voteCount">
								{currentTvDetail
									? "(" + currentTvDetail.vote_count + ") votes"
									: ""}
							</span>
						</div>
						<div className="movie__runtime">
							{currentTvDetail
								? currentTvDetail.number_of_episodes + " episodes"
								: ""}
						</div>
						<div className="movie__releaseDate">
							{currentTvDetail
								? "Next episode : " +
								formatDate(currentTvDetail.next_episode_to_air.air_date)
								: ""}
						</div>
						<div className="movie__genres">
							{currentTvDetail && currentTvDetail.genres
								? currentTvDetail.genres.map((genre) => (
										<>
											<span className="movie__genre" id={genre.id}>
												{genre.name}
											</span>
										</>
								))
								: ""}
						</div>
					</div>
					<div className="movie__detailRightBottom">
						<div className="synopsisText">Synopsis</div>
						<div>{currentTvDetail ? currentTvDetail.overview : ""}</div>
						<div className="buttons">
							{currentTvDetail && currentTvDetail.homepage && (
								<a
									href={currentTvDetail.homepage}
									target=""
									style={{ textDecoration: "none" }}
								>
									<p>
										<span className="homeButton movie__Button">Homepage</span>
									</p>
								</a>
							)}
							{currentTvDetail && currentTvDetail.imdb_id && (
								<a
									href={"https://www.imdb.com/title/" + currentTvDetail.imdb_id}
									target=""
									style={{ textDecoration: "none" }}
								>
									<p>
										<span className="imdbButton movie__Button">IMDb</span>
									</p>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TvDetail;
