/* eslint-disable react/prop-types */
import React from "react";

import "./saved.css";
import { useNavigate } from "react-router-dom";


function Saved({
	thumbnail,
	backdrop,
	title,
	genre,
	description,
	date,
	id,
	media_type,
	time,
}) {
    const nav = useNavigate();
    function viewData() {
        nav(`/${media_type}/${id}`);
    }
	return (
		<div
			className="saved_container"
			style={{
				backgroundImage: `
                    linear-gradient(to right, rgba(15, 15, 15, 1) 45%, rgba(0, 0, 0, 0)),
                    url(https://image.tmdb.org/t/p${backdrop})
                    `,
				backgroundSize: "90%",
				backgroundPosition: "right",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="saved_header">
				<img
					src={`https://image.tmdb.org/t/p/original${thumbnail}`}
					alt=""
					className="saved_poster"
				/>
				<h1 className="saved_name">{title}</h1>
				<h4 className="saved_year">{date}</h4>
				<span className="minutes">{time} min</span>
				<p className="type">{genre}</p>
				<p className="saved_desc">{description}</p>
				<div className="saved_btn_grp">
					<button className="saved_btn" onClick={viewData}>
						View
					</button>
					<button className="saved_btn">Remove</button>
				</div>
			</div>
		</div>
	);
}

export default Saved;
