import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import "./search.css";

// eslint-disable-next-line react/prop-types
function Search() {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked); // Toggle the checkbox state
	};

	const handleInputChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleButtonClick = () => {
		const route = `/search/${isChecked ? "movie" : "tv"}_${searchText}`;

		navigate(route);
	};
	return (
		<div className="parent-div">
			<div className="container-input">
				<div>
					<input
						type="text"
						placeholder="Search"
						name="text"
						className="input"
						value={searchText}
						onChange={handleInputChange}
					/>
				</div>
				<button onClick={handleButtonClick}></button>
			</div>
			<div className="checkbox-wrapper-8">
				<input
					type="checkbox"
					id="cb3-8"
					className="tgl tgl-skewed"
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<label
					htmlFor="cb3-8"
					data-tg-on="Movie"
					data-tg-off="TV"
					className="tgl-btn"
				></label>
			</div>
		</div>
	);
}

export default Search;
