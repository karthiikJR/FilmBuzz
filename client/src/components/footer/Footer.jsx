import "./footer.css";

function Footer() {
	// const footerStyle = {
	// 	color: "#0c1713",
	// 	cursor: "pointer",
	// };

	return (
		<footer>
			<div className="footer">
				<div className="line"></div>
				<div className="row">
					<a href="">
						<i className="fa fa-facebook"></i>
					</a>
					<a href="">
						<i className="fa fa-instagram"></i>
					</a>
					<a href="">
						<i className="fa fa-youtube"></i>
					</a>
					<a href="">
						<i className="fa fa-twitter"></i>
					</a>
				</div>

				<div className="row">
					<ul>
						<li>
							<a href="">Contact us</a>
						</li>
						<li>
							<a href="">Our Services</a>
						</li>
						<li>
							<a href="">Privacy Policy</a>
						</li>
						<li>
							<a href="">Terms & Conditions</a>
						</li>
						<li>
							<a href="">Career</a>
						</li>
					</ul>
				</div>

				<div className="row">
					FilmBuzz Copyright © 2021 FilmBuzz - All rights reserved
				</div>
			</div>
		</footer>
	);
}

export default Footer;
