import "./Header.css";
import { Link } from "react-router-dom";
import { circle_user, LOGO } from "../../assets";

import Search from "../Search/search";

function Header() {
	return (
		<div className="header">
			<div className="headerLeft">
				<Link to="/">
					<img className="header__icon" src={LOGO} />
				</Link>
				<Link to="/" style={{ textDecoration: "none" }}>
					<span>Home</span>
				</Link>
				<Link to="/movies" style={{ textDecoration: "none" }}>
					<span>Movies</span>
				</Link>
				<Link to="/tvshows" style={{ textDecoration: "none" }}>
					<span>TV Shows</span>
				</Link>
			</div>
			<Search />
			<div className="headerRight">
				<Link to="/profile">
					<img src={circle_user} alt="user" />
				</Link>
			</div>
		</div>
	);
}

export default Header;
