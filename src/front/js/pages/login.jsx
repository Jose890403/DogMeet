import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png"

export const Login = () => {
	const { store, actions } = useContext(Context);
	/* ------------------------------------------- */

	/* Estas lineas creamos los useState de los inputs */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")

	const navigate = useNavigate();
	/* ------------------------------------------------- */

	const handleSubmit = e => {
		e.preventDefault();
		actions.login(email, password);
		setEmail(" ");
		setPassword();
	}
	useEffect(() => {
		if (store.isLoggedIn === true) {
			navigate('/inicio')
		}
	}, [store.isLoggedIn])

	return (
		<div>
			<div className="background">
				<img src="https://images.pexels.com/photos/247522/pexels-photo-247522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  alt="background-form" />
			</div>

			
			<form onSubmit={handleSubmit} className="form-log">

				<h1 className="mt-3 mb-3 logtext">LOGIN</h1>
				<div className="form-floating mb-3">
					<input type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<label for="floatingInput">Email address</label>
				</div>


				<div className="form-floating mb-3">
					<input type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<label for="floatingPassword">Password</label>
				</div>

				<button className="btn btn-outline-success login " type="submit">LOGIN</button>

				<div>
					<p className="info-signup mb-2">Don`t have an account ?</p>
					<Link to="/signup">
						<button className="redirect" >Register for Free</button>
					</Link>
				</div>

			</form>
		</div>


	);
};
