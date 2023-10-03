import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";

import {
	Home,
	MovieDetail,
	TvDetail,
	Movies,
	TvShow,
	Search,
	Auth,
	Profile,
} from "./pages";
import { useCookies } from "react-cookie";

function App() {
	const [cookies] = useCookies(["access_token"]);
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="movie/:id" element={<MovieDetail />}></Route>
					<Route path="tv/:id" element={<TvDetail />}></Route>
					<Route
						path="profile/"
						element={cookies.access_token ? <Profile/> : <Auth />}
					></Route>
					<Route path="movies/" element={<Movies />}></Route>
					<Route path="tvshows/" element={<TvShow />}></Route>
					<Route path="search/:type" element={<Search />}></Route>
					<Route path="*" element={<h1>{"{ Error Page }"}</h1>}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
