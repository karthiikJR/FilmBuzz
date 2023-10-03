import { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";

import Footer from "../../components/footer/Footer";

import Requests from "../../requests/requests";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const Home = () => {
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [popularShows, setPopularShows] = useState([]);

	useEffect(() => {
		async function renderMovies() {
			try {
				const popularMov = await Requests("movie", "popular");
				setPopularMovies(popularMov);
				const upcomingMov = await Requests("movie", "upcoming");
				setUpcomingMovies(upcomingMov);
				const topRatedMov = await Requests("tv", "popular");
				setPopularShows(topRatedMov);
			} catch (error) {
				console.error("Error fetching popular movies:", error);
			}
		}
		renderMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function formatDate(dateString) {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = new Date(dateString).toLocaleDateString(
			undefined,
			options
		);
		return formattedDate;
	}

	return (
		<>
			<div className="poster">
				<Carousel
					showThumbs={false}
					autoPlay={true}
					transitionTime={700}
					infiniteLoop={true}
					showStatus={true}
				>
					{upcomingMovies.map((movie) => (
						<Link
							style={{ textDecoration: "none", color: "white" }}
							to={`/movie/${movie.id}`}
							key={movie.id}
						>
							<div className="posterImage">
								<img
									src={`https://image.tmdb.org/t/p/original${
										movie && movie.backdrop_path
									}`}
								/>
							</div>
							<div className="posterImage__overlay">
								<div className="posterImage__title">
									{movie ? movie.original_title : ""}
								</div>
								<div className="posterImage__runtime">
									{movie ? formatDate(movie.release_date) : ""}
									<span className="posterImage__rating">
										{movie ? movie.vote_average : ""}
									</span>
								</div>
								<div className="posterImage__description">
									{movie ? movie.overview : ""}
								</div>
							</div>
						</Link>
					))}
				</Carousel>
			</div>
			<h1
				style={{
					color: "red",
					textAlign: "left",
					display: "inline-block",
				}}
			>
				POPULAR MOVIES
			</h1>

			<Swiper
				slidesPerView={4}
				spaceBetween={300}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				{popularMovies.map((movie) => (
					<SwiperSlide key={movie.id}>
						<Card
							key={movie.id}
							url={movie.poster_path}
							title={movie.original_title}
							genre={movie.genre_ids}
							description={movie.overview}
							rating={movie.vote_average}
							id={movie.id}
							media_type={"movie"}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<h1
				style={{
					color: "red",
					textAlign: "left",
					display: "inline-block",
				}}
			>
				POPULAR TV SHOWS
			</h1>

			<Swiper
				slidesPerView={4}
				spaceBetween={300}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				{popularShows.map((movie) => (
					<SwiperSlide key={movie.id}>
						<Card
							key={movie.id}
							url={movie.poster_path}
							title={movie.name}
							genre={movie.genre_ids}
							description={movie.overview}
							rating={movie.vote_average}
							id={movie.id}
							media_type={"tv"}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Footer />
		</>
	);
};

export default Home;
