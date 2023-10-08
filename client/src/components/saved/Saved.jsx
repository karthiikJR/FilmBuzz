/* eslint-disable react/prop-types */
import React from "react";

import "./saved.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";

function Saved({ thumbnail, backdrop, title, description, id, media_type }) {
	const nav = useNavigate();

	const [cookies] = useCookies(["access_token"]);
	const userId = window.localStorage.getItem("userID");

	const removeContent = async () => {
		if (cookies.access_token) {
			try {
				const response = await axios.post("http://localhost:3001/remove", {
					userId,
					content_type: media_type,
					id,
				});

				if (response.status === 200) {
					nav("/profile");
				} else {
					console.error("API request failed");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			Swal.fire({
				title: "Error!",
				text: "You have to be logged in to remove this!",
				icon: "error",
				confirmButtonText: "Okay",
				color: "#fff",
				background: "#242424",
			});
		}
	};

	function viewData() {
		nav(`/${media_type}/${id}`);
	}
	return (
		<div
			className="saved_container"
			style={{
				backgroundImage: `
                    linear-gradient(to right, rgba(15, 15, 15, 1) 45%, rgba(0, 0, 0, 0)),
                    url(https://image.tmdb.org/t/p/original${backdrop})
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
				<p className="saved_desc">{description}</p>
				<div className="saved_btn_grp">
					<button className="saved_btn" onClick={viewData}>
						View
					</button>
					<button className="saved_btn" onClick={removeContent}>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}

export default Saved;
