/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./auth.css";

const UserContext = createContext();

const toastNotif = (text, id) => {
	id === 1
		? toast.error(text, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
		  })
		: toast.success(text, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
		  });
};

function Auth() {
	let [stateRegister, setStateRegister] = useState(true);
	return (
		<UserContext.Provider value={{ stateRegister, setStateRegister }}>
			<div>
				<ToastContainer />
				{stateRegister ? <Register /> : <Login />}
			</div>
		</UserContext.Provider>
	);
}

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/auth/register", {
				email,
				password,
			});

			console.log(response.data.message);
			if (response.data.message === "200") {
				toastNotif("Successfully Registered!", 0);
				setEmail("");
				setPassword("");
			} else {
				toastNotif("User already exits", 1);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Authform
			password={password}
			email={email}
			setEmail={setEmail}
			setPassword={setPassword}
			title="Register"
			data="Already have an account?"
			onSubmit={onSubmit}
		/>
	);
};

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/auth/login", {
				email,
				password,
			});
			console.log(response.data.message);
			if (response.data.message === "404") {
				toastNotif("User Doesn't exist!", 1);
			} else if (response.data.message === "403") {
				toastNotif("Incorrect password", 1);
			} else {
				toastNotif("Login Successful !", 0);
				setCookies("access_token", response.data.token);
				window.localStorage.setItem("userID", response.data.userID);
				navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Authform
			password={password}
			email={email}
			setEmail={setEmail}
			setPassword={setPassword}
			title="Sign In"
			data="Don't have an account?"
			onSubmit={onSubmit}
		/>
	);
};

const Authform = ({
	password,
	email,
	setEmail,
	setPassword,
	title,
	data,
	onSubmit,
}) => {
	const { stateRegister, setStateRegister } = useContext(UserContext);
	return (
		<div className="container">
			<form className="form" onSubmit={onSubmit}>
				<div className="flex-column">
					<label>Email </label>
				</div>
				<div className="inputForm">
					<input
						placeholder="Enter your Email"
						className="inputAuth"
						type="text"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div className="flex-column">
					<label>Password </label>
				</div>
				<div className="inputForm">
					<input
						placeholder="Enter your Password"
						className="inputAuth"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button className="button-submit">{title}</button>
				<p className="p">
					{data}{" "}
					<span
						className="span"
						onClick={() => {
							stateRegister === false
								? setStateRegister(true)
								: setStateRegister(false);
						}}
					>
						{title === "Sign In" ? "Register" : "Sign In"}
					</span>
				</p>
			</form>
		</div>
	);
};

export default Auth;
