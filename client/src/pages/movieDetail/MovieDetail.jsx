import { useEffect, useState } from "react";
import "./moviedetail.css";
import { useParams } from "react-router-dom";

function MovieDetail() {
	const API = import.meta.env.VITE_TMDB_API_KEY;
	const [currentMovieDetail, setMovie] = useState();
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
			`https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => setMovie(data));
	};

	return (
		<div className="movie">
			<div className="movie__intro">
				<img
					className="movie__backdrop"
					src={`https://image.tmdb.org/t/p/original${
						currentMovieDetail ? currentMovieDetail.backdrop_path : ""
					}`}
				/>
			</div>
			<div className="movie__detail">
				<div className="movie__detailLeft">
					<div className="movie__posterBox">
						<img
							className="movie__poster"
							src={`https://image.tmdb.org/t/p/original${
								currentMovieDetail ? currentMovieDetail.poster_path : ""
							}`}
						/>
					</div>
				</div>
				<div className="movie__detailRight">
					<div className="movie__detailRightTop">
						<div className="movie__name">
							{currentMovieDetail ? currentMovieDetail.original_title : ""}
						</div>
						<div className="movie__tagline">
							{currentMovieDetail ? currentMovieDetail.tagline : ""}
						</div>
						<div className="movie__rating">
							{currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
							&#10027;
							<span className="movie__voteCount">
								{currentMovieDetail
									? "(" + currentMovieDetail.vote_count + ") votes"
									: ""}
							</span>
						</div>
						<div className="movie__runtime">
							{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
						</div>
						<div className="movie__releaseDate">
							{currentMovieDetail
								? "Release date: " + formatDate(currentMovieDetail.release_date)
								: ""}
						</div>
						<div className="movie__genres">
							{currentMovieDetail && currentMovieDetail.genres
								? currentMovieDetail.genres.map((genre) => (
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
						<div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
						<div className="buttons">
							{currentMovieDetail && currentMovieDetail.homepage && (
								<a
									href={currentMovieDetail.homepage}
									target=""
									style={{ textDecoration: "none" }}
								>
									<p>
										<span className="homeButton movie__Button">
											Homepage
										</span>
									</p>
								</a>
							)}
							{currentMovieDetail && currentMovieDetail.imdb_id && (
								<a
									href={
										"https://www.imdb.com/title/" + currentMovieDetail.imdb_id
									}
									target=""
									style={{ textDecoration: "none" }}
								>
									<p>
										<span className="imdbButton movie__Button">
											IMDb
										</span>
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

export default MovieDetail;
